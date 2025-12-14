import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const AddNewProfileModal = () => {
  const { friendslist, setPayprofile, paymentList, setPaymentList } = useProfile();
  // const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [maxFriend, setMaxfriend] = useState(null);
  const newProfile = [
    {
      id: 1,
      profile: "1 Profile",
      discount: "0%",
      charges: "9.99€",
      selected: true,
      type: "ONE_PROFILE",
      lookup_key: "zodiya_one_profile_test",
      text: "Enhance your astrology experience by adding addition profiles of yours friends.",
      desc: "Total charge 9.99€. Subscription is auto renewable until cancelation.",
    },
    {
      id: 2,
      profile: "3 Profiles",
      discount: "10% off",
      charges: "29.97€",
      selected: false,
      type: "THREE_PROFILE",
      lookup_key: "zodiya_three_profile_test",
      text: "With this profiles, you can access a variety of detailed reports for your friends.",
      desc: "Total charge 29.97€. Subscription is auto renewable until cancelation.",
    },
    {
      id: 3,
      profile: "6 Profiles",
      discount: "20% off",
      charges: "59.94€",
      selected: false,
      type: "SIX_PROFILE",
      lookup_key: "zodiya_six_profile_test",
      text: "After purchasing, simply add your friend's details: Name,  birth date and birthplace to create a new profile.",
      desc: "Total charge 59.94€. Subscription is auto renewable until cancelation.",
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
    setLoading(true);
    if (paymentList?.defaultPaymentMethodId) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}stripe/pay-default-payment-method`,
          {
            lookup_key: selectedProfile.lookup_key,
          },
          { withCredentials: true }
        );

        if(res.status === 200 && res.success === false && res.currentPlan && res.msg === 'Consider upgrading or downgrading your current plan.'){
          message.error("Consider upgrading or downgrading your current plan", 6);
          navigate("/home");
        }

        const data = res.data;

        if (data.requiresAction && data.client_secret) {
          const stripe = await stripePromise;
          const result = await stripe.confirmCardPayment(data.client_secret);

          if (result.error) {
            message.error(result.error.message || "3D Secure failed.");
          } else {
            navigate("/success");
            message.success("Plan purchased successfully!");
          }
        } else if (data.success) {
          navigate("/success");
          message.success("Plan purchased successfully!");
        } else {
          message.error(data.msg || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error in handleChildClick:", error);
        message.error("Payment failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/subscription/profile/pay", { state: { selectedProfile } });
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
        } else if (res.data.data.type === "THREE_PROFILE") {
          setSelectedProfile(newProfile[2]);
        } else if (res.data.data.type === "SIX_PROFILE") {
          setSelectedProfile(newProfile[0]);
        }
        if (friendslist.length >= maxFriends) {
          setPayprofile(true);
          message.success(
            "Maximum number of friends reached, Consider upgrading your subscription"
          );
        } else {
          message.success("Now you can add profile");
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
  return (
    <>
      <ModalOverlay
        style={{
          backdropFilter: "blur(10px)",
        }}
      />
      <ModalContent maxW={{ lg: "45vw" }} className="bg-[#1f1634] m-2 lg:m-0">
        <div>
          <ModalCloseButton className="text-white " />
        </div>

        <ModalBody className="bg-[#1f1634] ">
          <div className="flex justify-center">
            <Box className="text-center  ms-4 w-fit relative top-1 text-xl md:text-2xl lg:text-2xl text-[#f3e4e4] font-[verdana]">
              <h2> Add New Profile</h2>
              <p className={`${maxFriend && "relative top-4"}`}>
                {" "}
                {maxFriend &&
                  `Your currently on ${maxFriend
                    .toLowerCase()
                    .replace("_", " ")}`}
              </p>
              <p
                className={`text-red-600 font-semibold lg:text-xl  ${maxFriend == "SIX_PROFILE" && "relative top-3"
                  }`}
              >
                {maxFriend == "SIX_PROFILE" && "Maximum Profile Reached"}
              </p>
            </Box>
          </div>
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                }}
                spin
              />
            }
          >
            <div className="flex flex-wrap flex-col gap-6 mt-3">
              {newProfile.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row gap-6 text-center"
                  >
                    {/* Text section */}
                    <div className="lg:w-1/2 w-full lg:hidden block ">
                      <div className={`text-white  text-[16px] `}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap flex-col gap-6 mt-2  ">
              {newProfile.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col lg:flex-row gap-6 ${maxFriend == "SIX_PROFILE" && "justify-center"
                      }`}
                  >
                    <div className="lg:w-1/2 w-full hidden lg:block">
                      <div className={`text-white text-[17px]`}>
                        {item.text}
                      </div>
                    </div>
                    <div
                      className={`bg-[#29286c] lg:w-1/2 w-full h-fit flex p-4 text-[#838392] justify-between ${maxFriend === "SIX_PROFILE" &&
                        (index === 0 || index === 1)
                        ? "hidden"
                        : ""
                        }
                       ${maxFriend === "THREE_PROFILE" && index === 0
                          ? "hidden"
                          : ""
                        }
                      ${maxFriend == "ONE_PROFILE" && "relative lg:bottom-24"}
                      ${maxFriend === "THREE_PROFILE" &&
                          index === newProfile.length - 1
                          ? "relative lg:bottom-24"
                          : ""
                        } 
                      ${maxFriend == item.type && "hidden"
                        } cursor-pointer rounded-[10px] items-center ${selectedProfile.id === item.id &&
                        "border-[3.5px] border-[#9529ea]"
                        }`}
                      onClick={() => handleClick(item)}
                    >
                      <div className="flex  w-full">
                        <p
                          className={`text-xl  ${selectedProfile.id === item.id && "text-white"
                            }`}
                        >
                          {item.profile}
                        </p>
                        <p
                          className={`text-[#838392] ${selectedProfile.id === item.id && "text-white"
                            } lg:ms-6 ms-10 ${item.discount === "0%" && "hidden"
                            }`}
                        >
                          {item.discount}
                        </p>
                      </div>
                      <div
                        className={`text-[#838392] ${selectedProfile.id === item.id && "text-white"
                          }`}
                      >
                        <p>{item.charges}</p>
                        <p>Monthly</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>

          {/* Continue button */}
          <div className="w-full mt-8 flex flex-col items-center justify-center">
            <div className="w-[50%]">
              <button
                onClick={handleChildClick}
                className={`w-full rounded-full  ${maxFriend == "SIX_PROFILE" && "hidden"
                  } font-nunito-light text-white font-light text-xl p-3 bg-gradient-to-r from-purple-700 to-purple-800`}
              >
                Continue
              </button>
            </div>
            {/* Selected profile description */}
            <p
              className={`text-[#939294] font-nunito-light ${maxFriend == "SIX_PROFILE" && "hidden"
                }`}
            >
              <span className=" items-center text-center text-[12.5px] mt-2">
                <p className="mt-6">You can cancel anytime.</p>
                <p>
                  If you cancel profile subscription your profiles will be
                  removed from the zodiya portal.
                </p>
                <p>{selectedProfile.desc}</p>
              </span>
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default AddNewProfileModal;