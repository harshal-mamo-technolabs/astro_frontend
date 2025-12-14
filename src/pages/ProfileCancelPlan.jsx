import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {
  Box, Center, Divider, MenuItem, Text, Menu,
  ModalContent, ModalBody, Modal, ModalOverlay, useDisclosure, Button,
  ModalFooter
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useState, useEffect, useMemo } from "react";
import { message } from "antd";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const ProfileCancelPlan = () => {
  const { isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose } = useDisclosure();
  const { isOpen: isDiscountOpen, onOpen: onDiscountOpen, onClose: onDiscountClose } = useDisclosure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);
  const [couponAlreadyApplied, setCouponAlreadyApplied] = useState(false); // <-- NEW STATE
  const [currentPlan, setCurrentPlan] = useState(null);
  const [planCode, setPlanCode] = useState(null);

  // Translations
  const cancelPlanTexts = useMemo(() => [
    "Profile Plan",
    "Cancel Profile plan:",
    "Are you sure you want to cancel your current subscription plan? You can apply a discount instead.",
    "Apply",
    "% discount",
    "Cancel Plan",
    "Need Assistance?",
    "Contact support",
    "for help with managing your account.",
    "By canceling, all profiles in your list will be permanently deleted.",
    "Would you like to proceed?",
    "Go Back",
    "SECRET DISCOUNT",
    "SAVE",
    "on your",
    "profile plan",
    "Apply Discount",
    "The discount will be applied to your next billing cycle.",
    "Failed to cancel the plan. Please try again.",
    "Something went wrong while canceling the plan.",
    "No discount available at the moment.",
    "Discount applied successfully!",
    "Could not apply discount.",
    "Network error. Please try again.",
    "1 profile plan",
    "3 profile plan",
    "6 profile plan"
  ], []);

  const [profilePlanText, cancelProfilePlanText, cancelConfirmationText, applyText, percentDiscountText, cancelPlanText, needAssistanceText, contactSupportText, helpManagingAccountText, cancelWarningText, proceedText, goBackText, secretDiscountText, saveText, onYourText, profilePlanLabelText, applyDiscountText, discountAppliedNextCycleText, failedToCancelText, somethingWentWrongText, noDiscountText, discountAppliedSuccessText, couldNotApplyDiscountText, networkErrorText, profile1PlanText, profile3PlanText, profile6PlanText] = useTranslatedTexts(cancelPlanTexts);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        console.log("🎟️ Fetching coupon details...");
        const couponResponse = await fetch(`${import.meta.env.VITE_BASE_URL}coupon/latest?profile=true`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
  
        const couponResult = await couponResponse.json();
        console.log("✅ Coupon API response:", couponResult);
  
        if (couponResult.success && couponResult.coupon) {
          setCouponDetails(couponResult.coupon);
          console.log("✅ Coupon details set:", couponResult.coupon);
  
          // Check if coupon is already applied
          try {
            console.log("🔍 Calling check-subscription-coupon...");
            const checkRes = await fetch(`${import.meta.env.VITE_BASE_URL}coupon/check-subscription-coupon?profile=true`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include"
            });
  
            const checkData = await checkRes.json();
            console.log("✅ Coupon check response:", checkData);
  
            if (checkData?.hasCoupon === true) {
              console.log("🎯 Coupon is already applied.");
              setCouponAlreadyApplied(true);
            } else {
              console.log("🟢 Coupon NOT applied.");
              setCouponAlreadyApplied(false);
            }
          } catch (checkErr) {
            console.error("❌ Error calling check-subscription-coupon API:", checkErr);
          }
        } else {
          console.log("⚠️ No valid coupon found.");
        }
      } catch (err) {
        console.error("❌ Error fetching coupon:", err);
      }
    };
  
    const fetchPlan = async () => {
      try {
        console.log("📦 Fetching current plan...");
        const planResponse = await fetch(`${import.meta.env.VITE_BASE_URL}subscriptions/profile/v2`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
  
        const planResult = await planResponse.json();
        console.log("✅ Plan response:", planResult);
  
        if (planResult.success && planResult.data?.subscriptions?.length > 0) {
          const plan = planResult.data.subscriptions[0];
          setCurrentPlan(plan);
          setPlanCode(plan.code);
          console.log("✅ Current plan set:", plan);
        } else {
          console.log("⚠️ No active subscription found.");
        }
      } catch (err) {
        console.error("❌ Error fetching plan:", err);
      }
    };
  
    // Start both
    fetchCoupon();
    fetchPlan();
  }, []);

  const handleCancelPlan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}subscriptions/cancel?profile=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({})
      });

      const result = await response.json();
      if (result.success) {
        onCancelClose();
        onDiscountClose();
        navigate(`/settings/plans/profiledeleted?plan=${planCode}`);
      } else {
        alert(failedToCancelText);
      }
    } catch (error) {
      alert(somethingWentWrongText);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async () => {
    if (!couponDetails) {
      message.error(noDiscountText);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}subscriptions/apply-coupon?profile=true&coupon=${couponDetails.couponCode}`,
        { method: "POST", credentials: "include" }
      );
      const result = await response.json();

      if (response.status === 200 && result.success) {
        message.success(discountAppliedSuccessText);
        onDiscountClose();
        navigate("/settings/plans/profileplanstatus");
      } else {
        message.error(result.msg || couldNotApplyDiscountText);
      }
    } catch (error) {
      message.error(networkErrorText);
    } finally {
      setLoading(false);
    }
  };

  const getPlanDisplayName = (planType) => {
    switch (planType) {
      case "ONE_PROFILE": return profile1PlanText;
      case "THREE_PROFILE": return profile3PlanText;
      case "SIX_PROFILE": return profile6PlanText;
      default: return profilePlanLabelText;
    }
  };

  return (
    <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
      <div className="p-2">
        <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined className="lg:mt-2 mt-2 cursor-pointer" onClick={() => navigate(-1)} />
          <div className="flex justify-center w-full me-4 lg:me-6"><h2>{profilePlanText}</h2></div>
        </div>
      </div>

      <div className="relative p-2 mt-5">
        <Text fontSize="sm" mb="2">{cancelProfilePlanText}</Text>
        <Center><Divider w="full" mb="5" /></Center>
        <Text fontSize="lg" mb={5}>
          {cancelConfirmationText}
        </Text>
        <Center><Divider w="full" mb="3" /></Center>

        <Menu>
          {couponDetails && !couponAlreadyApplied && (
            <MenuItem bg="transparent">
              <Link to="" onClick={onDiscountOpen} className="w-full mt-2">
                <Box className="flex justify-between w-full">
                  <Text className="text-[#f8e9e9] text-lg">
                    {applyText} {couponDetails.percentage}{percentDiscountText}
                  </Text>
                  <AiOutlineRight className="text-lg text-white" />
                </Box>
              </Link>
            </MenuItem>
          )}

          <MenuItem bg="transparent" onClick={onCancelOpen}>
            <Box className="flex justify-between w-full">
              <Text className="text-[#f8e9e9] text-lg">{cancelPlanText}</Text>
              <AiOutlineRight className="text-lg text-white" />
            </Box>
          </MenuItem>
        </Menu>
      </div>

      <Box position="fixed" bottom={0} px={2} textAlign="center" w="100%" mb="3">
        <Divider />
        <Text fontSize="sm" m="3">
          {needAssistanceText}{" "}
          <Link to="/home/support"><span className="underline cursor-pointer"> {contactSupportText} </span></Link>{" "}
          {helpManagingAccountText}
        </Text>
      </Box>

      {/* Cancel Modal */}
      <Modal isOpen={isCancelOpen} onClose={onCancelClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="rgba(26, 16, 46, 0.8)" color="white" textAlign="center" p={6} borderRadius="xl" w="90%" maxW="md">
          <ModalBody>
            <Text fontSize="md" mb={3}>{cancelWarningText}</Text>
            <Text fontSize="md" mb={6}>{proceedText}</Text>
            <Button bg="#3F51B5" color="white" borderRadius="full" w="full" mb={3} isLoading={loading} onClick={handleCancelPlan}>{cancelPlanText}</Button>
            <Button variant="ghost" color="white" w="full" onClick={onCancelClose}>{goBackText}</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Discount Modal */}
      <Modal isOpen={isDiscountOpen} onClose={onDiscountClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="rgba(26, 16, 46, 0.8)" color="white" textAlign="center" p={6} w="90%" maxW="md" h="500px">
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold" mb={1}>{secretDiscountText}</Text>
            <Text fontSize="sm">{saveText}</Text>
            <Text fontSize="5xl" mb={0}>{couponDetails?.percentage || 0}%</Text>
            <Text fontSize="sm" mb={1}>
              {onYourText} {currentPlan ? getPlanDisplayName(currentPlan.type) : profilePlanLabelText}
            </Text>
            <Button
              bg="#3F51B5" color="white" borderRadius="full" w="full" mb={3}
              isLoading={loading} onClick={handleApplyDiscount}
            >
              {applyDiscountText}
            </Button>
            <Button variant="ghost" color="white" w="full" onClick={onDiscountClose}>{goBackText}</Button>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Text fontSize="xs">{discountAppliedNextCycleText}</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileCancelPlan;
