import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardContext } from "../../context/CardContext";
import { useProfile } from "../../context/Profile";
import { message } from "antd";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Text, Button, Center, Divider, VStack, HStack } from "@chakra-ui/react";
import BackButton from "../../components/BackButton/BackButton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const ChangePlan = () => {
  const [searchParams] = useSearchParams();
  const isUpgrade = searchParams.get("upgrade") === "true";
  const currentPlan = searchParams.get("plan");
  const navigate = useNavigate();
  const { selectedCard } = useContext(CardContext);
  const { paymentList, setPaymentList } = useProfile();
  const [loading, setLoading] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);

  useEffect(() => {
    // Fetch available plans based on upgrade/downgrade
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}subscriptions/available-plans?currentPlan=${encodeURIComponent(currentPlan)}&upgrade=${isUpgrade}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          }
        );
        const result = await response.json();
        if (result.success) {
          setAvailablePlans(result.plans);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        message.error("Failed to load available plans");
      }
    };

    fetchPlans();
  }, [currentPlan, isUpgrade]);

  const handlePlanChange = async (selectedPlan) => {
    if (!selectedPlan) {
      message.error("Please select a plan first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}subscriptions/${isUpgrade ? 'upgrade' : 'downgrade'}`,
        {
          plan: selectedPlan.type,
          currentPlan: currentPlan
        },
        { withCredentials: true }
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

        <VStack spacing={4} align="stretch">
          {availablePlans.map((plan) => (
            <Box
              key={plan.type}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="whiteAlpha.100"
              cursor="pointer"
              onClick={() => handlePlanChange(plan)}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">
                    {plan.name}
                  </Text>
                  <Text>{plan.description}</Text>
                </VStack>
                <Text fontSize="xl" fontWeight="bold">
                  {plan.price}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>

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