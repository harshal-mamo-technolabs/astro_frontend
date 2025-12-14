import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardContext } from "../../context/CardContext";
import { useProfile } from "../../context/PlanChangeProfile";
import { PlanChangeProfileProvider } from "../../context/PlanChangeProfile";
import  ImageSlider  from "../ImageSlider/ImageSlider";
import { message } from "antd";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Box, Text, Center, Divider, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, VStack, HStack } from "@chakra-ui/react";
import BackButton from "../BackButton/BackButton";
import Card2 from "../Card/Card2";
import styles from "./ChangePlan.module.scss";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const stripeElementStyles = {
  base: {
    fontSize: "16px",
    color: "#ffffff",
    fontFamily: "Nunito, sans-serif",
    "::placeholder": { color: "#ffffff99" },
  },
  invalid: { color: "#ff6b6b" },
};

// Component to translate cancellation text
const CancellationText = ({ cancel1, cancel2, cancel2text, fontSize = "sm", color = "whiteAlpha.800" }) => {
  const translatedCancel1 = useTranslatedText(cancel1 || "");
  const translatedCancel2 = useTranslatedText(cancel2 || "");
  const translatedCancel2text = useTranslatedText(cancel2text || "");
  
  return (
    <Text fontSize={fontSize} color={color}>
      {`${translatedCancel1} ${translatedCancel2} ${translatedCancel2text}`}
    </Text>
  );
};

const PaymentForm = ({ clientSecret, onSuccess, planName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const confirmPaymentText = useTranslatedText("Confirm Payment");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/home`,
        payment_method_data: {
          billing_details: {
            name: planName || "",
          },
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          disabled={!stripe || !elements}
          bg="#7937a0"
          _hover={{ bg: "#612b81" }}
          color="white"
          w="40%"
        >
          {confirmPaymentText}
        </Button>
      </div>
      {error && (
        <Text color="red.500" textAlign="center" mt={2}>
          {error}
        </Text>
      )}
    </form>
  );
};

const PlanChangeHandlerContent = () => {
  const [searchParams] = useSearchParams();
  const isUpgrade = searchParams.get("upgrade") === "true";
  const currentPlan = searchParams.get("plan");
  const navigate = useNavigate();
  const { selectedCard, setSelectedCard } = useContext(CardContext);
  const { paymentList, setPaymentList, cards } = useProfile();
  const [loading, setLoading] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [calculations, setCalculations] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  // Define plan hierarchy
  const planHierarchy = {
    "STARTER": 1,
    "PREMIUM": 2,
    "GOLD": 3
  };

  useEffect(() => {
    console.log("==== PlanChangeHandler Debug Start ====");
    console.log("cards:", cards);
    console.log("currentPlan:", currentPlan);
    console.log("isUpgrade:", isUpgrade);
    console.log("planHierarchy:", planHierarchy);
    if (!cards || !currentPlan) {
      console.log("Missing data:", { cards, currentPlan });
      return;
    }

    const filteredPlans = cards.filter(plan => {
      // Special case: upgrading from TRIAL should show all three paid plans
      if (isUpgrade && currentPlan === "TRIAL") {
        return ["STARTER", "PREMIUM", "GOLD"].includes(plan.plan);
      }

      const currentPlanLevel = planHierarchy[currentPlan];
      const planLevel = planHierarchy[plan.plan];

      if (isUpgrade) {
        if (currentPlan === "GOLD") return false;
        return planLevel > currentPlanLevel;
      } else {
        // Only show plans with a lower level than the current plan
        return planLevel < currentPlanLevel;
      }
    });

    console.log("Filtered Plans:", filteredPlans);
    setAvailablePlans(filteredPlans);
    if (filteredPlans.length > 0) {
      setSelectedCard(filteredPlans[0]);
    }
    console.log("==== PlanChangeHandler Debug End ====");
  }, [currentPlan, isUpgrade, cards, setSelectedCard]);

  const handleCardSelect = (plan) => {
    setSelectedCard(plan);
  };

  const handleContinue = async () => {
    console.log("handleContinue function called");
    if (!selectedCard) {
      message.error(selectPlanFirstText);
      return;
    }
    onOpen();
  };

  const handleConfirm = async () => {
    if (!selectedCard) {
      message.error(selectPlanFirstText);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}subscriptions/upgrade?plan=${selectedCard.plan}`,
        {},
        { withCredentials: true }
      );

      const { clientSecret, success, msg } = response.data;

      if (success && !clientSecret) {
        message.success(planChangedText);
        const upgradeParam = isUpgrade ? "true" : "false";
        navigate(`/done?upgrade=${upgradeParam}&plan=${selectedCard.plan}`);
        return;
      }

      if (clientSecret) {
        setClientSecret(clientSecret);
        onOpen();
      } else {
        message.error(msg || failedChangePlanText);
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        message.error(error.response.data.msg);
      } else {
        message.error(unexpectedErrorText);
      }
    } finally {
      setLoading(false);
    }
  };

  const changePlanTexts = useMemo(() => [
    "Upgrade",
    "Downgrade",
    "Your Plan",
    "Current Plan:",
    "You are already on the highest tier plan. No upgrades available.",
    "You are on the lowest tier plan. No downgrades available.",
    "Continue",
    "Please select a plan first",
    "Plan changed successfully",
    "Failed to change plan. Please try again.",
    "An unexpected error occurred. Please try again.",
    "You are about to",
    "upgrade",
    "downgrade",
    "to",
    "Cancel",
    "Confirm"
  ], []);

  const [upgradeText, downgradeText, yourPlanText, currentPlanText, highestTierText, lowestTierText, continueText, selectPlanFirstText, planChangedText, failedChangePlanText, unexpectedErrorText, youAreAboutToText, upgradeActionText, downgradeActionText, toText, cancelText, confirmText] = useTranslatedTexts(changePlanTexts);
  
  return (
    <div
      className="min-h-screen font-nunito-light text-white"
      style={{
        backgroundColor: "#141333",
      }}
    >
      <BackButton onClick={() => navigate(-1)} />
      <ImageSlider />
      <div className="p-4">
        <Text align="center" fontSize="2xl" color="#e99ec2" mb={4}>
          {isUpgrade ? upgradeText : downgradeText} {yourPlanText}
        </Text>
        <Text align="center" fontSize="xl" color="#e99ec2" mb={6}>
          {currentPlanText} <strong>{currentPlan}</strong>
        </Text>
        {availablePlans.length === 0 ? (
          <Box textAlign="center" p={4}>
            <Text fontSize="lg">
              {isUpgrade 
                ? highestTierText
                : lowestTierText}
            </Text>
          </Box>
        ) : (
          <>
            <div className={styles["cards-container"]} style={{ justifyContent: 'center' }}>
              {availablePlans.map((plan) => (
                <Card2
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
                bg="#4f46e5"
                _hover={{ bg: "#9333ea" }}
                size="lg"
                color="white"
                isLoading={loading}
                onClick={() => {
                  console.log("Continue button clicked");
                  handleContinue();
                }}
                disabled={!selectedCard}
                borderRadius="10px"
                px={10}
              >
                {continueText}
              </Button>
            </Center>
            <Box mt={8} textAlign="center">
              {selectedCard && (
                <CancellationText 
                  cancel1={selectedCard.cancel1} 
                  cancel2={selectedCard.cancel2} 
                  cancel2text={selectedCard.cancel2text} 
                />
              )}
            </Box>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent 
          textAlign="center"
          bgGradient="linear(to-r, #4f46e5, #9333ea)"
          color="white"
          p={6}
          w="100%"
          maxW="md"
        >
          <ModalBody>
            <Text fontSize="2xl" mb={6}>
              {youAreAboutToText} {isUpgrade ? upgradeActionText : downgradeActionText} {toText} {selectedCard?.plan}
            </Text>
            {selectedCard && !clientSecret && (
              <Box mb={4}>
                <CancellationText 
                  cancel1={selectedCard.cancel1} 
                  cancel2={selectedCard.cancel2} 
                  cancel2text={selectedCard.cancel2text} 
                />
              </Box>
            )}
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" } }}>
                <PaymentForm 
                  clientSecret={clientSecret}
                  planName={selectedCard?.plan}
                  onSuccess={() => {
                    message.success(planChangedText);
                    navigate("/home");
                  }}
                />
              </Elements>
            ) : (
              <>
                {/* <Text mb={4}>
                  The difference amount will be handled by Stripe. If there is a credit, it will be applied to your next billing cycle.
                </Text> */}
                <HStack spacing={4}>
                  <Button
                    flex="1"
                    variant="outline"
                    borderColor="whiteAlpha.600"
                    onClick={onClose}
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    flex="1"
                    bg="#7937a0"
                    _hover={{ bg: "#612b81" }}
                    onClick={handleConfirm}
                    isLoading={loading}
                  >
                    {confirmText}
                  </Button>
                </HStack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

const PlanChangeHandler = () => {
  return (
    <PlanChangeProfileProvider>
      <PlanChangeHandlerContent />
    </PlanChangeProfileProvider>
  );
};

export default PlanChangeHandler; 