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
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/Profile";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { loadStripe } from '@stripe/stripe-js';
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const ChangeProfileModal = ({ onClose }) => {
  const { friendslist, setPayprofile, paymentList, setPaymentList } = useProfile();
  // const toast = useToast();
  const [sliderValue, setSliderValue] = useState(0)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [maxFriend, setMaxfriend] = useState(null);

  // Translations
  const addNumberOfProfilesText = useTranslatedText("Add number of profiles");
  const yourCurrentlyOnText = useTranslatedText("Your currently on");
  const maximumProfileReachedText = useTranslatedText("Maximum Profile Reached");
  const completePremiumAccessText = useTranslatedText("Complete Premium access");
  const forText = useTranslatedText("for");
  const monthlyText = useTranslatedText("Monthly");
  const continueText = useTranslatedText("Continue");
  const pleaseSelectPlanText = useTranslatedText("Please select a plan to upgrade to.");
  const planUpgradedSuccessText = useTranslatedText("Plan upgraded successfully!");
  const failedToUpgradeText = useTranslatedText("Failed to upgrade plan.");
  const errorOccurredUpgradeText = useTranslatedText("An error occurred during the upgrade process.");
  const authenticationFailedText = useTranslatedText("3D Secure authentication failed.");
  const maxFriendsReachedText = useTranslatedText("Maximum number of friends reached, Consider upgrading your subscription");
  const nowYouCanAddProfileText = useTranslatedText("Now you can add profile");
  const offText = useTranslatedText("off");

  const profileTexts = useMemo(() => [
    "1 Profile",
    "3 Profiles",
    "6 Profiles"
  ], []);

  const [profile1Text, profile3Text, profile6Text] = useTranslatedTexts(profileTexts);

  const discountTexts = useMemo(() => [
    "10%",
    "20%"
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
      discount: "10%",
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
      discount: "20%",
      discountTranslated: discount20Text,
      charges: "59.94€",
      selected: false,
      type: "SIX_PROFILE",
      lookup_key: "zodiya_six_profile_test",
      text: "After purchasing, simply add your friend's details: Name,  birth date and birthplace to create a new profile.",
      desc: "Total charge 59.94€. Subscription is auto renewable until cancelation.",
      descTranslated: profile6DescText,
    },
  ];
  const [selectedProfile, setSelectedProfile] = useState(newProfile[0]);
  const handleClick = (item) => {
    setSelectedProfile(item);
  };

  const fetchPaymentList = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`, {
        withCredentials: true,
      })
      .then((res) => {
        setPaymentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPaymentList();
  }, []);

  const handleChildClick = async () => {
    console.log("ChangeProfileModal: Upgrade process started.");
    if (!selectedProfile) {
      message.error(pleaseSelectPlanText);
      console.error("ChangeProfileModal: No profile selected for upgrade.");
      return;
    }

    console.log("ChangeProfileModal: Upgrading to plan:", selectedProfile);
    setLoading(true);
    try {
      console.log(`ChangeProfileModal: Calling upgrade endpoint: /subscriptions/upgrade?plan=${selectedProfile.type}`);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}subscriptions/upgrade?plan=${selectedProfile.type}`,
        {},
        { withCredentials: true }
      );

      const data = response.data;
      console.log("ChangeProfileModal: Received response from backend:", data);

      if (data.clientSecret) {
        console.log("ChangeProfileModal: 3D Secure required. Client secret received.");
        // message.info("Please complete the payment authentication.");

        const stripe = await stripePromise;
        console.log("ChangeProfileModal: Calling stripe.confirmCardPayment...");
        const { error } = await stripe.confirmCardPayment(data.clientSecret);

        if (error) {
          console.error("ChangeProfileModal: 3D Secure authentication failed.", error);
          message.error(error.message || authenticationFailedText);
        } else {
          console.log("ChangeProfileModal: 3D Secure authentication successful. Upgrade complete.");
          message.success(planUpgradedSuccessText);
          fetchPaymentList();
          onClose();
          // Refresh the page to update profile status in the UI after 3D Secure success
          window.location.reload();
        }
      } else if (data.success) {
        console.log("ChangeProfileModal: Upgrade successful without 3D Secure.");
        message.success(planUpgradedSuccessText);
        fetchPaymentList();
        onClose();
        // Refresh the page to update profile status in the UI after successful upgrade
        window.location.reload();
      } else {
        console.error("ChangeProfileModal: Upgrade failed. Backend response:", data.msg);
        message.error(data.msg || failedToUpgradeText);
      }
    } catch (error) {
      console.error("ChangeProfileModal: An error occurred during the upgrade process.", error);
      message.error(error.response?.data?.msg || errorOccurredUpgradeText);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}subscriptions/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setPayprofile(true);
        setLoading(false);
        const maxFriends =
          res.data.data.type === "ONE_PROFILE"
            ? Number(1)
            : res.data.data.type === "THREE_PROFILE"
              ? Number(3)
              : res.data.data.type === "SIX_PROFILE"
                ? Number(6)
                : Number(0);
        setMaxfriend(res.data.data.type);
        if (res.data.data.type === "ONE_PROFILE") {
          setSelectedProfile(newProfile[1]);
          setSliderValue(1);
        } else if (res.data.data.type === "THREE_PROFILE") {
          setSelectedProfile(newProfile[2]);
          setSliderValue(2);
        } else if (res.data.data.type === "SIX_PROFILE") {
          setSelectedProfile(newProfile[0]);
          setSliderValue(0);
        }
        if (friendslist.length >= maxFriends) {
          setPayprofile(true);
          message.success(maxFriendsReachedText);
        } else {
          message.success(nowYouCanAddProfileText);
          setPayprofile(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status == 404) {
          setPayprofile(true);
        }
        setLoading(false);
      });
  }, []);
  const isCurrentPlan = selectedProfile.type === maxFriend;
  return (
    <>
      <ModalOverlay
        style={{
          backdropFilter: "blur(10px)",
        }}
      />
      <ModalContent maxW={{ lg: "45vw" }} className="bg-[#1f1634]font-nunito-light m-2 lg:m-0">
        <div>
          <ModalCloseButton className="text-white " />
        </div>

        <ModalBody className="bg-[#1f1634] ">
          <div className="flex justify-center">
            <VStack spacing={2} className="text-center ms-4 w-fit relative top-1 text-xl md:text-2xl lg:text-2xl text-[#f3e4e4] font-[verdana]">
              <h2 className="text-md font-nunito-light mb-1">{addNumberOfProfilesText}</h2>
              <p className={`${maxFriend && "relative top-4"} mb-1`}>
                {maxFriend && `${yourCurrentlyOnText} ${maxFriend.toLowerCase().replace("_", " ")}`}
              </p>
              <p className={`text-red-600 font-semibold lg:text-xl ${maxFriend == "SIX_PROFILE" && "relative top-3"} mb-1`}>
                {maxFriend == "SIX_PROFILE" && maximumProfileReachedText}
              </p>
            </VStack>
          </div>
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined style={{ fontSize: 48, fontWeight: "bold" }} spin />
            }
          >
            <div className="flex flex-wrap flex-col gap-6 mt-4">
              {[newProfile[sliderValue]].map((item, index) => {
                return (
                  <div key={index} className={`flex flex-col gap-6 ${maxFriend == "SIX_PROFILE" && "justify-center"}`}>
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
                          <SliderMark value={0} mt="-9" ml="-1.5" fontSize="sm" color="white">
                            1
                          </SliderMark>
                          <SliderMark value={1} mt="-9" ml="-1.5" fontSize="sm" color="white">
                            3
                          </SliderMark>
                          <SliderMark value={2} mt="-9" ml="-1.5" fontSize="sm" color="white">
                            6
                          </SliderMark>
                          <SliderTrack bg="white">
                            <SliderFilledTrack bg="#ffe14f" />
                          </SliderTrack>
                          <SliderThumb boxSize={6} bg="#ffe14f" />
                        </Slider>

                        {/* Fixed Bubble on Right End */}
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
                        {/* Discount Labels Below Slider */}
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
          {!isCurrentPlan && (
            <div className="w-full mt-10 flex flex-col items-center justify-center">
              <div
                className={`flex w-full cursor-pointer rounded-[14px] overflow-hidden border-2 ${selectedProfile.id === newProfile[sliderValue].id ? "border-[#e48af7]" : "border-transparent"} mt-6 mb-6`}
                onClick={() => handleClick(newProfile[sliderValue])}
              >
                {/* Card content */}
                <div className="bg-[#672ab5] text-white w-[70%] md:w-[75%] p-4 flex items-center">
                  <p className="text-[13px] md:text-[18px] leading-snug">
                    {completePremiumAccessText}<br />{forText} {newProfile[sliderValue].profileTranslated.toLowerCase()}
                  </p>
                </div>
                <div className="bg-[#2b297d] w-[35%] md:w-[25%] p-4 text-right text-white leading-tight flex flex-col justify-center items-end">
                  <p className="text-md">{newProfile[sliderValue].profileTranslated}</p>
                  <p className="text-[15px] font-bold">{newProfile[sliderValue].charges}</p>
                  <p className="text-xs">{monthlyText}</p>
                  {newProfile[sliderValue].discount !== "0%" && (
                    <p className="text-[#ffe14f] text-xs font-bold mt-1">
                      {newProfile[sliderValue].discountTranslated} {offText}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[50%] mb-4">
                <button
                  onClick={handleChildClick}
                  className="w-full rounded-full font-nunito-light text-white font-light text-xl p-3 bg-gradient-to-r from-purple-700 to-purple-800"
                >
                  {continueText}
                </button>
              </div>
              <div className="text-[#939294] text-center text-[12.5px] mt-6">
                <p>{newProfile[sliderValue]?.descTranslated}</p>
              </div>
            </div>
          )}

        </ModalBody>
      </ModalContent>
    </>
  );
};

export default ChangeProfileModal;