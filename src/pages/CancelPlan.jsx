import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {
  Box,
  Center,
  Divider,
  MenuItem,
  Text,
  Menu,
  ModalContent,
  ModalBody,
  Modal,
  ModalOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useEffect, useState, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const CancelPlan = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [couponDetails, setCouponDetails] = useState(null);
  const [couponAlreadyApplied, setCouponAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPlanCode, setCurrentPlanCode] = useState(null);

  // Translations
  const cancelPlanTexts = useMemo(() => [
    "Plans",
    "Cancel plan:",
    "Are you sure you want to cancel your current subscription plan? You can switch to a lower-tier plan or apply a discount instead.",
    "Switch to Lower-Tier Plan",
    "Apply {percentage}% discount",
    "Cancel Plan",
    "Need Assistance?",
    "Contact support",
    "for help with managing your account.",
    "By canceling your plan, you will lose access to all astrology reports, and all added profiles on your profile list will be deleted permanently.",
    "Would you like to proceed?",
    "Go Back"
  ], []);

  const [plansTitle, cancelPlanLabel, confirmText, switchLowerPlanText, applyDiscountText, cancelPlanButtonText, needAssistanceText, contactSupportText, helpText, cancelWarningText, proceedText, goBackText] = useTranslatedTexts(cancelPlanTexts);

  useEffect(() => {
    const fetchLatestCouponAndCheckApplied = async () => {
      try {
        const couponRes = await fetch(
          `${import.meta.env.VITE_BASE_URL}coupon/latest?profile=false`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const couponData = await couponRes.json();

        if (couponData.success && couponData.coupon) {
          setCouponDetails(couponData.coupon);

          // Check if coupon already applied
          const checkRes = await fetch(
            `${import.meta.env.VITE_BASE_URL}coupon/check-subscription-coupon?profile=false`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const checkData = await checkRes.json();
          setCouponAlreadyApplied(checkData.hasCoupon === true);
        } else {
          setCouponDetails(null);
        }
      } catch (error) {
        console.error("Error during coupon check:", error);
        setCouponDetails(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentPlanCode = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscriptions/v2`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const result = await response.json();
        if (result.success && result.data?.subscriptions?.length > 0) {
          setCurrentPlanCode(result.data.subscriptions[0].code);
        } else {
          setCurrentPlanCode(null);
        }
      } catch (error) {
        setCurrentPlanCode(null);
      }
    };

    fetchLatestCouponAndCheckApplied();
    fetchCurrentPlanCode();
  }, []);

  const handleSwitchToLowerPlan = () => {
    if (currentPlanCode) {
      navigate(`/settings/plans/premiumplanStatus/changeplan?upgrade=false&plan=${currentPlanCode}`);
    } else {
      navigate("/settings/plans/premiumplanStatus/changeplan?upgrade=false");
    }
  };

  const showSwitchToLowerPlan = currentPlanCode && currentPlanCode !== "STARTER";

  return (
    <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
      <div className="p-2">
        <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined
            className="lg:mt-2 mt-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full me-4 lg:me-6">
            <h2>{plansTitle}</h2>
          </div>
        </div>
      </div>

      <div className="relative p-2 mt-5">
        <Text fontSize="sm" mb="2">{cancelPlanLabel} </Text>
        <Center><Divider w="full" mb="5" /></Center>

        <Text fontSize='lg' mb={5}>
          {confirmText}
        </Text>

        <Center><Divider w="full" mb="3" /></Center>

        <Menu>
          {showSwitchToLowerPlan && (
            <MenuItem bg="transparent" onClick={handleSwitchToLowerPlan}>
              <Box className="flex justify-between w-full">
                <div>
                  <Text className="text-[#f8e9e9] text-lg">{switchLowerPlanText}</Text>
                </div>
                <div>
                  <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                </div>
              </Box>
            </MenuItem>
          )}

          {couponDetails && couponDetails.percentage && !couponAlreadyApplied && (
            <MenuItem bg="transparent">
              <Link to={`/secretdiscountedPayment?plan=${currentPlanCode}&discount=${couponDetails.percentage}`} className="w-full mt-2">
                <Box className="flex justify-between w-full">
                  <div>
                    <Text className="text-[#f8e9e9] text-lg">
                      {applyDiscountText.replace("{percentage}", couponDetails.percentage)}
                    </Text>
                  </div>
                  <div>
                    <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
                  </div>
                </Box>
              </Link>
            </MenuItem>
          )}

          <MenuItem bg="transparent" onClick={onOpen}>
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-lg">{cancelPlanButtonText}</Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </MenuItem>
        </Menu>
      </div>

      <Box position="fixed" bottom={0} px={2} textAlign="center" w={{ base: "100%", md: "full" }} mb="3">
        <Divider />
        <Text fontSize="sm" m="3">
          {needAssistanceText}{" "}
          <Link to="/home/support"> 
            <span className="underline cursor-pointer"> {contactSupportText} </span>
          </Link>{" "}
          {helpText}
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
              onClick={() => navigate(`/settings/plans/cancelprofilefeedback?plan=${currentPlanCode}`)}
              bg="#3F51B5"
              color="white"
              borderRadius="full"
              w="full"
              mb={3}
              _hover={{ bg: "#32408f" }}
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

export default CancelPlan;
