import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Center, Divider, MenuItem, Text, Menu, Modal, ModalOverlay, useDisclosure, Flex, Button } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import ChangeProfileModal from "../components/ChangeProfilePlan/ChangeProfileModal";
import { useEffect, useState, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const ProfilePlanStatus = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [userAgent, setUserAgent] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const formatDate = (isoString) => new Date(isoString).toLocaleDateString();

  // Translations
  const profilePlanTexts = useMemo(() => [
    "Profile Plans",
    "Current plan status:",
    "Loading...",
    "Active",
    "Inactive",
    "Subscription type:",
    "Subscription start:",
    "Subscription end:",
    "No subscription data available.",
    "Upgrade Plan",
    "Cancel Plan",
    "No active subscription plan",
    "Need Assistance?",
    "Contact support",
    "for help with managing your account."
  ], []);

  const [profilePlansText, currentPlanStatusText, loadingText, activeText, inactiveText, subscriptionTypeText, subscriptionStartText, subscriptionEndText, noSubscriptionText, upgradePlanText, cancelPlanText, noActiveSubscriptionText, needAssistanceText, contactSupportText, helpManagingAccountText] = useTranslatedTexts(profilePlanTexts);

  // Translate plan name from database
  const translatedPlanName = useTranslatedText(subscription?.planName || "");

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscriptions/profile/v2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important: send cookies with request
        });

        const result = await response.json();

        if (result.success && result.data?.subscriptions?.length > 0) {
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

  return (
    <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
      <div className="p-2">
        <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined
            className="lg:mt-2 mt-2  cursor-pointer "
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full me-4 lg:me-6">
            <h2>{profilePlansText}</h2>
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
            <MenuItem bg="transparent" onClick={onOpen}>
              <Link to="" className="w-full mt-2">
                <Box className="flex justify-between w-full">
                  <div>
                    <Text className="text-[#f8e9e9] text-lg">
                      {upgradePlanText}
                    </Text>
                  </div>
                  <div>
                    <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                  </div>
                </Box>
              </Link>
            </MenuItem>
            <MenuItem bg="transparent">
              <Link to="/settings/plans/profileplans/cancelprofileplans" className="w-full mt-2">
                <Box className="flex justify-between w-full">
                  <div>
                    <Text className="text-[#f8e9e9] text-lg">
                      {cancelPlanText}
                    </Text>
                  </div>
                  <div>
                    <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                  </div>
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
      <div>
        <Box position="fixed" bottom={0} px={2} textAlign="center" w={{ base: "100%", md: "full" }} mb="3">
          <Divider />
          <Text fontSize="sm" m="3">
            {needAssistanceText}{" "}
            <Link to="/home/support">
              <span className="underline cursor-pointer"> {contactSupportText} </span></Link>{" "}
            {helpManagingAccountText}
          </Text>
        </Box>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div>
          <ModalOverlay />
          <ChangeProfileModal isOpen={isOpen} onClose={onClose} />
        </div>
      </Modal>
    </div>
  );
};
export default ProfilePlanStatus;