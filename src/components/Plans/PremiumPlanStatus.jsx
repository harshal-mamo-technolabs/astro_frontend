import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {
  Box, Center, Divider, MenuItem, Text, Menu,
  ModalContent, ModalBody, Modal, ModalOverlay, useDisclosure, Button, Flex
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useEffect, useState, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const PremiumPlanStatus = () => {
  const { isOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const premiumPlanTexts = useMemo(() => [
    "Plans",
    "Current plan status:",
    "Loading...",
    "Active",
    "Inactive",
    "Subscription type:",
    "Subscription start:",
    "Subscription end:",
    "No subscription data available.",
    "Downgrade Plan",
    "Upgrade Plan",
    "Cancel Plan",
    "No active subscription plan",
    "Need Assistance?",
    "Contact support",
    "for help with managing your account.",
    "By canceling your plan, you will lose access to all astrology reports and all added profiles on your profile list will be deleted permanently",
    "Would you like to proceed?",
    "Cancel Plan",
    "Go Back"
  ], []);

  const [plansText, currentPlanStatusText, loadingText, activeText, inactiveText, subscriptionTypeText, subscriptionStartText, subscriptionEndText, noSubscriptionText, downgradePlanText, upgradePlanText, cancelPlanText, noActiveSubscriptionText, needAssistanceText, contactSupportText, helpManagingAccountText, cancelWarningText, proceedText, cancelPlanButtonText, goBackText] = useTranslatedTexts(premiumPlanTexts);

  // Translate plan name from database - use useMemo to ensure it updates when subscription changes
  const planNameToTranslate = subscription?.planName || "";
  const translatedPlanName = useTranslatedText(planNameToTranslate);

  // Helper to format date string nicely
  const formatDate = (isoString) => new Date(isoString).toLocaleDateString();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscriptions/v2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important: send cookies with request
        });

        const result = await response.json();
        console.log("Subscription data:", result); // Debug log

        if (result.success && result.data?.subscriptions?.length > 0) {
          console.log("Setting subscription:", result.data.subscriptions[0]); // Debug log
          setSubscription(result.data.subscriptions[0]);
        } else {
          console.warn("No subscription data found or not authorized.");
          setSubscription(null);
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleCancelPlan = () => {
    // Add your cancel logic here
    console.log("Plan canceled!");
    onClose();
  };

  return (
    <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
      <div className="p-2">
        <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined
            className="lg:mt-2 mt-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full me-4 lg:me-6">
            <h2>{plansText}</h2>
          </div>
        </div>
      </div>

      <div className="relative p-2 mt-5">
        <Flex justify="space-between" mb="2" fontSize="sm">
          <Text>{currentPlanStatusText}</Text>
          {loading ? (
            <Text as="span" fontWeight="medium">{loadingText}</Text>
          ) : subscription ? (
            <Text as="span" fontWeight="bold" color="white.400">{activeText}</Text>
          ) : (
            <Text as="span" fontWeight="bold" color="white.400">{inactiveText}</Text>
          )}
        </Flex>
        <Center>
          <Divider w="full" mb="5" mt="" />
        </Center>

        {loading ? (
          <Text>{loadingText}</Text>
        ) : subscription ? (
          <>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              {translatedPlanName}
            </Text>

            <Flex justify="space-between" mb={2}>
              <Text>{subscriptionTypeText}</Text>
              {/* Assuming "Premium" from your previous code, or you can add plan details */}
              <Text fontWeight="medium">{translatedPlanName}</Text>
            </Flex>

            <Flex justify="space-between" mb={2}>
              <Text>{subscriptionStartText}</Text>
              <Text fontWeight="medium">{formatDate(subscription.startDate)}</Text>
            </Flex>

            <Flex justify="space-between" mb={2}>
              <Text>{subscriptionEndText}</Text>
              <Text fontWeight="medium">{formatDate(subscription.endDate)}</Text>
            </Flex>
          </>
        ) : (
          <Text>{noSubscriptionText}</Text>
        )}

        <Center>
          <Divider w="full" mb="3" mt="3" />
        </Center>

        {subscription ? (
          <Menu>
            <MenuItem bg="transparent">
              <Link
                to={`/settings/plans/premiumplanStatus/changeplan?upgrade=false&plan=${encodeURIComponent(subscription.code)}`}
                className="w-full mt-2"
              >
                <Box className="flex justify-between w-full">
                  <Text className="text-[#f8e9e9] text-lg">{downgradePlanText}</Text>
                  <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                </Box>
              </Link>
            </MenuItem>
            <MenuItem bg="transparent">
              <Link
                to={`/settings/plans/premiumplanStatus/changeplan?upgrade=true&plan=${encodeURIComponent(subscription.code)}`}
                className="w-full mt-2"
              >
                <Box className="flex justify-between w-full">
                  <Text className="text-[#f8e9e9] text-lg">{upgradePlanText}</Text>
                  <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                </Box>
              </Link>
            </MenuItem>
            <MenuItem bg="transparent">
              <Link to="/settings/plans/cancelplan" className="w-full mt-2">
                <Box className="flex justify-between w-full">
                  <Text className="text-[#f8e9e9] text-lg">{cancelPlanText}</Text>
                  <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                </Box>
              </Link>
            </MenuItem>
          </Menu>
        ) : !loading && (
          <Box textAlign="center" mt={4}>
            <Text fontSize="lg" mb={4}>{noActiveSubscriptionText}</Text>
          </Box>
        )}
      </div>

      <Box position="fixed" bottom={0} px={2} textAlign="center" w={{ base: "100%", md: "full" }} mb="3">
        <Divider />
        <Text fontSize="sm" m="3">
          {needAssistanceText}{" "}
          <Link to="/home/support">
            <span className="underline cursor-pointer"> {contactSupportText} </span>
          </Link> {helpManagingAccountText}
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="rgba(26, 16, 46, 0.8)"
          color="white"
          textAlign="center"
          p={6}
          borderRadius="xl"
          w="90%"
          maxW="md"
        >
          <ModalBody>
            <Text fontSize="md" mb={3}>
              {cancelWarningText}
            </Text>
            <Text fontSize="md" mb={6}>
              {proceedText}
            </Text>

            <Button
              bg="#3F51B5"
              color="white"
              borderRadius="full"
              w="full"
              mb={3}
              _hover={{ bg: "#32408f" }}
              onClick={handleCancelPlan}
            >
              {cancelPlanButtonText}
            </Button>

            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              w="full"
              onClick={onClose}
            >
              {goBackText}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PremiumPlanStatus;
