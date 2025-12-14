import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardContext } from "../../context/CardContext";
import { useProfile } from "../../context/Profile";
import { message } from "antd";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Text, Center, Divider, Button } from "@chakra-ui/react";
import BackButton from "../BackButton/BackButton";
import Card from "../Card/Card";
import styles from "./ChangePlan.module.scss";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const ChangePlan = () => {
  const [searchParams] = useSearchParams();
  const isUpgrade = searchParams.get("upgrade") === "true";
  const currentPlan = searchParams.get("plan");
  const navigate = useNavigate();
  const { selectedCard, setSelectedCard } = useContext(CardContext);
  const { paymentList, setPaymentList, cards } = useProfile();
  const [loading, setLoading] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);

  // Define plan hierarchy
  const planHierarchy = {
    "STARTER": 1,
    "PREMIUM": 2,
    "GOLD": 3
  };

  useEffect(() => {
    if (!cards || !currentPlan) {
      console.log("Missing data:", { cards, currentPlan });
      return;
    }

    console.log("Current Plan:", currentPlan);
    console.log("Is Upgrade:", isUpgrade);
    console.log("Available Cards:", cards);

    // Filter plans based on current plan and upgrade/downgrade status
    const filteredPlans = cards.filter(plan => {
      const currentPlanLevel = planHierarchy[currentPlan];
      const planLevel = planHierarchy[plan.plan];
      
      console.log("Checking plan:", {
        planName: plan.plan,
        planLevel,
        currentPlanLevel,
        isUpgrade,
        shouldShow: isUpgrade ? planLevel > currentPlanLevel : plan.plan !== currentPlan
      });

      if (isUpgrade) {
        // For upgrade - show only higher tier plans
        if (currentPlan === "GOLD") {
          return false; // No plans available for upgrade from GOLD
        }
        return planLevel > currentPlanLevel;
      } else {
        // For downgrade - show all plans except current one
        return plan.plan !== currentPlan;
      }
    });

    console.log("Filtered Plans:", filteredPlans);
    setAvailablePlans(filteredPlans);
    
    // Select first card by default
    if (filteredPlans.length > 0) {
      setSelectedCard(filteredPlans[0]);
    }
  }, [currentPlan, isUpgrade, cards, setSelectedCard]);

  const handleCardSelect = (plan) => {
    setSelectedCard(plan);
  };

  const handleContinue = async () => {
    if (!selectedCard) {
      message.error("Please select a plan first");
      return;
    }
      setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}subscriptions/upgrade?plan=${selectedCard.plan}`,
        {}, // empty body since we're using query params
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      const { clientSecret, success, msg } = response.data;

      if (success && !clientSecret) {
        message.success(msg || "Plan changed successfully");
        navigate("/home");
        return;
      }

      if (clientSecret) {
        const stripe = await stripePromise;
        if (!stripe) {
          message.error("Payment system unavailable");
          return;
        }

        const result = await stripe.confirmCardPayment(clientSecret);
        
        if (result.error) {
          message.error(result.error.message);
        } else if (result.paymentIntent?.status === "succeeded") {
          message.success("Plan changed successfully");
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      message.error(error.response?.data?.msg || "Failed to change plan");
    } finally {
          setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
      <BackButton onClick={() => navigate(-1)} />
      <div className="p-4">
        <Text fontSize="xl" mb={4}>
          {isUpgrade ? "Upgrade" : "Downgrade"} Your Plan
        </Text>
        <Text mb={6}>
          Current Plan: <strong>{currentPlan}</strong>
        </Text>
        <Center>
          <Divider w="full" mb={6} />
        </Center>
        {availablePlans.length === 0 ? (
          <Box textAlign="center" p={4}>
            <Text fontSize="lg">
              {isUpgrade 
                ? "You are already on the highest tier plan. No upgrades available."
                : "You are on the lowest tier plan. No downgrades available."}
            </Text>
          </Box>
        ) : (
          <>
            <div className={styles["cards-container"]} style={{ justifyContent: 'center' }}>
              {availablePlans.map((plan) => (
                <Card
                  key={plan.id}
                  data={{
                    id: plan.id,
                    title: plan.offer,
                    name: plan.plan,
                    trial: plan.months,
                    shortOffer: plan.access,
                    offer: plan.features || [],
                    discount: plan.discount,
                    price: plan.charge,
                    billed: plan.then
                  }}
                  onClick={() => handleCardSelect(plan)}
                  subType={{ type: currentPlan }}
                />
              ))}
      </div>
            <Center mt={8}>
        <Button
                colorScheme="purple"
                size="lg"
                isLoading={loading}
                onClick={handleContinue}
                disabled={!selectedCard}
                borderRadius="full"
                px={10}
              >
                Continue
              </Button>
            </Center>
          </>
        )}
        <Box mt={8} textAlign="center">
          <Text fontSize="sm" color="whiteAlpha.800">
            Your current plan will remain active until the end of the billing cycle.
            The new plan will take effect from the next billing cycle.
              </Text>
   </Box>
          </div>
    </div>
  );
};

export default ChangePlan;