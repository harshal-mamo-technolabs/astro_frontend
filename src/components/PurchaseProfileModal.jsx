import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { loadStripe } from '@stripe/stripe-js';
import AddPartnerModal from "./AddPartnermodal";
import ChangeProfileModal from "./ChangeProfilePlan/ChangeProfileModal";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PurchaseProfileModal = ({ onClose }) => {
  const { friendslist, setPayprofile, paymentList, setPaymentList } = useProfile();
  const [sliderValue, setSliderValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState(false);

  // Translations
  const purchaseProfilePlanText = useTranslatedText("Purchase Profile Plan");
  const currentPlanText = useTranslatedText("Current Plan:");
  const completePremiumAccessText = useTranslatedText("Complete Premium access");
  const forText = useTranslatedText("for");
  const monthlyText = useTranslatedText("Monthly");
  const continueText = useTranslatedText("Continue");
  const processingText = useTranslatedText("Processing...");
  const pleaseSelectPlanText = useTranslatedText("Please select a plan first");
  const failedToCheckSubscriptionText = useTranslatedText("Failed to check subscription status");
  const planPurchasedSuccessText = useTranslatedText("Profile plan purchased successfully!");
  const failedToPurchaseText = useTranslatedText("Failed to purchase profile plan.");
  const errorOccurredText = useTranslatedText("An error occurred during the purchase process.");
  const pleaseCompletePaymentText = useTranslatedText("Please complete the payment authentication.");
  const authenticationFailedText = useTranslatedText("3D Secure authentication failed.");

  const profileTexts = useMemo(() => [
    "1 Profile",
    "3 Profiles",
    "6 Profiles"
  ], []);

  const [profile1Text, profile3Text, profile6Text] = useTranslatedTexts(profileTexts);

  const discountTexts = useMemo(() => [
    "10% off",
    "20% off"
  ], []);

  const [discount10Text, discount20Text] = useTranslatedTexts(discountTexts);

  // Translated profile descriptions
  const profile1DescText = useTranslatedText("Total charge 9.99€. Subscription is auto renewable until cancelation.");
  const profile3DescText = useTranslatedText("Total charge 29.97€. Subscription is auto renewable until cancelation.");
  const profile6DescText = useTranslatedText("Total charge 59.94€. Subscription is auto renewable until cancelation.");

  const newProfile = [
    {
      id: 1,
      profile: "1 Profile",
      profileTranslated: profile1Text,
      discount: "0%",
      discountTranslated: "0%",
      charges: "9.99€",
      selected: true,
      type: "ONE_PROFILE",
      lookup_key: "zodiya_one_profile_test",
      text: "Enhance your astrology experience by adding addition profiles of yours friends.",
      desc: "Total charge 9.99€. Subscription is auto renewable until cancelation.",
      descTranslated: profile1DescText,
    },
    {
      id: 2,
      profile: "3 Profiles",
      profileTranslated: profile3Text,
      discount: "10% off",
      discountTranslated: discount10Text,
      charges: "29.97€",
      selected: false,
      type: "THREE_PROFILE",
      lookup_key: "zodiya_three_profile_test",
      text: "With this profiles, you can access a variety of detailed reports for your friends.",
      desc: "Total charge 29.97€. Subscription is auto renewable until cancelation.",
      descTranslated: profile3DescText,
    },
    {
      id: 3,
      profile: "6 Profiles",
      profileTranslated: profile6Text,
      discount: "20% off",
      discountTranslated: discount20Text,
      charges: "59.94€",
      selected: false,
      type: "SIX_PROFILE",
      lookup_key: "zodiya_six_profile_test",
      text: "After purchasing, simply add your friend's details: Name, birth date and birthplace to create a new profile.",
      desc: "Total charge 59.94€. Subscription is auto renewable until cancelation.",
      descTranslated: profile6DescText,
    },
  ];
  const [selectedProfile, setSelectedProfile] = useState(newProfile[0]);

  const fetchPaymentList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`, {
        withCredentials: true,
      });
      setPaymentList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPaymentList();
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}subscriptions/profile`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.data) {
        setCurrentPlan(res.data.data);
        const maxProfiles = res.data.data.type === "ONE_PROFILE" ? 1 :
          res.data.data.type === "THREE_PROFILE" ? 3 :
            res.data.data.type === "SIX_PROFILE" ? 6 : 0;

        if (friendslist.length < maxProfiles) {
          // User can add more profiles with current plan
          setShowAddProfile(true);
          setPayprofile(false);
        } else {
          // User has reached profile limit, show change plan modal
          setShowChangePlan(true);
          return;
        }
      } else {
        // No active subscription, show purchase modal
        setShowAddProfile(false);
        setPayprofile(true);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        // No active subscription, show purchase modal
        setShowAddProfile(false);
        setPayprofile(true);
      } else {
        message.error(failedToCheckSubscriptionText);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!selectedProfile) {
      message.error(pleaseSelectPlanText);
      return;
    }

    setLoading(true);
    try {
      if (paymentList?.defaultPaymentMethodId) {
        // Use existing payment method
        console.log("Using default payment method for purchase...");
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}stripe/pay-default-payment-method`,
          {
            lookup_key: selectedProfile.lookup_key,
          },
          { withCredentials: true }
        );

        const data = res.data;

        if (data.requiresAction && data.client_secret) {
          console.log("PurchaseProfileModal: Payment requires action. Client secret received.", data.client_secret);
          message.info(pleaseCompletePaymentText);

          const stripe = await stripePromise;
          console.log("PurchaseProfileModal: Calling stripe.confirmCardPayment...");
          const { error } = await stripe.confirmCardPayment(data.client_secret);

          if (error) {
            console.error("PurchaseProfileModal: 3D Secure authentication failed.", error);
            message.error(error.message || authenticationFailedText);
          } else {
            console.log("PurchaseProfileModal: 3D Secure authentication successful.");
            message.success(planPurchasedSuccessText);
            fetchPaymentList();
            checkSubscriptionStatus();
            onClose();
            // Refresh the page to update profile status in the UI after 3D Secure success
            window.location.reload();
          }
        } else if (data.success) {
          message.success(data.msg || planPurchasedSuccessText);
          onClose();
          fetchPaymentList();
          checkSubscriptionStatus();
          // Always refresh the page after successful profile plan purchase to update UI state
          window.location.reload();
        } else {
          console.error("PurchaseProfileModal: Purchase failed. Backend response:", data.msg);
          message.error(data.msg || failedToPurchaseText);
        }
      } else {
        // Navigate to payment page for new payment method
        console.log("No default payment method, navigating to add new...");
        onClose();
        navigate("/subscription/profile/pay", { state: { selectedProfile } });
      }
    } catch (error) {
      console.error("PurchaseProfileModal: An error occurred during the purchase process.", error);
      message.error(error.response?.data?.msg || errorOccurredText);
    } finally {
      setLoading(false);
    }
  };

  if (showAddProfile) {
    return <AddPartnerModal onClose={onClose} />;
  }

  if (showChangePlan) {
    return <ChangeProfileModal onClose={onClose} />;
  }

  return (
    <ModalContent maxW={{ lg: "45vw" }} className="bg-[#1f1634]font-nunito-light m-2 lg:m-0">
      <ModalCloseButton className="text-white" />
      <ModalBody className="bg-[#1f1634] ">
        <div className="flex justify-center">
          <Box className="text-center ms-4 w-fit relative top-1 text-xl md:text-2xl lg:text-2xl text-[#f3e4e4] font-[verdana]">
            <h2 className="text-md font-nunito-light">{purchaseProfilePlanText}</h2>
            {currentPlan && (
              <p className="text-sm mt-2">
                {currentPlanText} {currentPlan.type.toLowerCase().replace("_", " ")}
              </p>
            )}
          </Box>
        </div>

        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined
              style={{ fontSize: 48, fontWeight: "bold" }}
              spin
            />
          }
        >
          <div className="flex flex-wrap flex-col gap-6 mt-2">
            {[newProfile[sliderValue]].map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-6 justify-center">
                  <div className="w-full">
                    <Box position="relative" className="mt-6">
                      <Slider
                        value={sliderValue}
                        min={0}
                        max={2}
                        step={1}
                        onChange={(val) => {
                          setSliderValue(val);
                          setSelectedProfile(newProfile[val]);
                        }}
                        w="80%"
                      >
                        <SliderMark value={0} mt="-9" ml="-1.5" fontSize="sm" color="white">1</SliderMark>
                        <SliderMark value={1} mt="-9" ml="-1.5" fontSize="sm" color="white">3</SliderMark>
                        <SliderMark value={2} mt="-9" ml="-1.5" fontSize="sm" color="white">6</SliderMark>
                        <SliderTrack bg="white"><SliderFilledTrack bg="#ffe14f" /></SliderTrack>
                        <SliderThumb boxSize={6} bg="#ffe14f" />
                      </Slider>
                      <Box
                        position="absolute"
                        top="-10px"
                        right="0"
                        bg="#311f49"
                        color="white"
                        fontWeight="bold"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="md"
                        zIndex={1}
                      >
                        {newProfile[sliderValue].profileTranslated.split(" ")[0]}
                      </Box>
                      <Box display="flex" w={{ base: "90%", md: "85%" }} justifyContent="space-between" px={2}>
                        <span className="text-[#ffe14f] text-xs"></span>
                        <span className="text-[#ffe14f] text-xs">{newProfile[1].discountTranslated}</span>
                        <span className="text-[#ffe14f] text-xs">{newProfile[2].discountTranslated}</span>
                      </Box>
                    </Box>
                  </div>
                </div>
              );
            })}
          </div>
        </Spin>

        {/* Continue button and card section */}
        <div className="w-full mt-8 flex flex-col items-center justify-center">
          <div
            className="flex w-full cursor-pointer rounded-[14px] overflow-hidden border-2 border-[#e48af7] mt-6 mb-6"
          >
            <div className="bg-[#672ab5] text-white w-[70%] md:w-[75%] p-4 flex items-center">
              <p className="text-[13px] md:text-[18px] leading-snug">
                {completePremiumAccessText}<br />{forText} {selectedProfile.profileTranslated.toLowerCase()}
              </p>
            </div>
            <div className="bg-[#2b297d] w-[35%] md:w-[25%] p-4 text-right text-white leading-tight flex flex-col justify-center items-end">
              <p className="text-md">{selectedProfile.profileTranslated}</p>
              <p className="text-[15px] font-bold">{selectedProfile.charges}</p>
              <p className="text-xs">{monthlyText}</p>
              {selectedProfile.discount !== "0%" && (
                <p className="text-[#ffe14f] text-xs font-bold mt-1">
                  {selectedProfile.discountTranslated}
                </p>
              )}
            </div>
          </div>
          <div className="w-[50%]">
            <button
              onClick={handleContinue}
              className="w-full rounded-full font-nunito-light text-white font-light text-xl p-3 bg-gradient-to-r from-purple-700 to-purple-800"
              disabled={loading}
            >
              {loading ? processingText : continueText}
            </button>
          </div>
          <div className="text-[#939294] text-center text-[12.5px] mt-6">
            <p>{newProfile[sliderValue]?.descTranslated}</p>
          </div>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

export default PurchaseProfileModal; 