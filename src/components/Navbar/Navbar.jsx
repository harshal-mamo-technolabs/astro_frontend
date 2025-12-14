import {
  Box,
  ButtonGroup,
  Circle,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import Logo from "../.././../src/assets/logo.png";
import PreminumLogo from "../../assets/preminum.png";
import { useContext, useEffect, useState } from "react";
import { useProfile } from "../../context/Profile";
import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import AddPartnerModal from "../AddPartnermodal";
import axios from "axios";
import { CardContext } from "../../context/CardsDataContext";
import { useNavigate } from "react-router-dom";
import PurchaseProfileModal from "../PurchaseProfileModal";
import ChangeProfileModal from "../ChangeProfilePlan/ChangeProfileModal";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Navbar = () => {
  const {
    friendslist,
    selectedUser,
    setSelectedUser,
    setFriendslist,
    loadingprofile,
    getZodiacImage,
    deletefriendloader,
    setAvatar,
    Payprofile,
    setPayprofile,
  } = useProfile();
  const { setFullprofile, fullprofile } = useContext(CardContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isChangePlanOpen, onOpen: onChangePlanOpen, onClose: onChangePlanClose } = useDisclosure();
  const email = new URLSearchParams(location.search).get("email");
  const navigate = useNavigate();
  // Control visibility of the premium crown only after we know subscription status
  const [showPremiumCrown, setShowPremiumCrown] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);

  const navbarTexts = useMemo(() => [
    "Add Profile",
    "You",
    "Premium"
  ], []);
  
  const [addProfileText, youText, premiumText] = useTranslatedTexts(navbarTexts);

  console.log(selectedUser, "selected user");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
        withCredentials: true,
      })
      .then((res) => {
        setFullprofile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (email) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}users/me/full`,
          {
            email: email,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setFullprofile(res.data.data);
        })
        .catch((err) => {
          navigate("/login");
          console.log(err);
        });
    }
    // Check premium subscription (gate UI until we know for sure)
    axios
      .get(`${import.meta.env.VITE_BASE_URL}subscriptions/v2`, { withCredentials: true })
      .then((res) => {
        const hasActive = Boolean(res?.data?.success && res?.data?.data?.subscriptions?.length > 0);
        console.log('[Navbar] subscription check:', { hasActive, raw: res?.data });
        setShowPremiumCrown(!hasActive);
      })
      .catch((err) => {
        console.warn('[Navbar] subscription check failed; defaulting to show crown', err?.response?.status);
        setShowPremiumCrown(true);
      })
      .finally(() => setIsCheckingSubscription(false));
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}friend/my`, {
        withCredentials: true,
      })
      .then((res) => setFriendslist(res.data.friends))
      .catch((err) => console.log(err));
  }, [loadingprofile, deletefriendloader]);
  const handleUserClick = (friend) => {
    setSelectedUser(friend);
    setAvatar(friend?.zodiacSign);
    if (selectedUser?._id === friend?._id) {
      message.error(
        ` ${friend ? friend.name : "your"} profile is already selected`
      );
    } else {
      message.success(` ${friend ? friend.name : "your"} profile selected`);
    }
  };

  return (
    <Box
      backgroundColor="rgba(255, 255, 255, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      className="lg:block  hidden md:block"
      color="white"
      p={{ md: 4, lg: 3 }}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        {Payprofile ? (
          <div>
            <div>
              <PurchaseProfileModal onClose={onClose} />
            </div>
          </div>
        ) : (
          <div>
            <ModalOverlay />
            <AddPartnerModal isOpen={isOpen} onClose={onClose} />
          </div>
        )}
      </Modal>

      <Modal isOpen={isChangePlanOpen} onClose={onChangePlanClose}>
        <ModalOverlay />
        <ChangeProfileModal onClose={onChangePlanClose} />
      </Modal>

      <Flex justify="between" align="center" className="">
        {!isCheckingSubscription && showPremiumCrown && (
          <Link to={"/home/premium"}>
            <div className="ms-2">
              <Image
                src={PreminumLogo}
                alt="preminumlogo"
                height={{ base: "40px", lg: "50px", md: "50px" }}
              />
            </div>
            {premiumText}
          </Link>
        )}
        <Flex className=" w-full justify-between items-center">
          <Box p="1" className=" flex  justify-end">
            <Link to="/home">
              {" "}
              <Image src={Logo} alt="logo" height={"60px"} />
            </Link>
          </Box>

          <Box className="flex gap-4 ">
            <div className=" lg:block">
              <Box className="flex  relative justify-end bottom-2 right-4 h-fit">
                <div className="mt-5 ms-3 cursor-pointer">
                  <Circle
                    size="60px"
                    color="white"
                    bg="#9326DB"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={async () => {
                      try {
                        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}subscriptions/profile`, {
                          withCredentials: true,
                        });

                        if (res.data.success && res.data.data) {
                          const maxProfiles = res.data.data.type === "ONE_PROFILE" ? 1 :
                            res.data.data.type === "THREE_PROFILE" ? 3 :
                              res.data.data.type === "SIX_PROFILE" ? 6 : 0;

                          if (friendslist.length >= maxProfiles) {
                            if (res.data.data.type === "SIX_PROFILE") {
                              message.info("You have reached the maximum profile limit with your current plan.");
                            } else {
                              onChangePlanOpen();
                            }
                            return;
                          }
                        }
                        setPayprofile(true);
                        onOpen();
                      } catch (err) {
                        if (err.response?.status === 404) {
                          // No active subscription, show purchase modal
                          setPayprofile(true);
                          onOpen();
                        } else {
                          message.error("Failed to check subscription status");
                        }
                      }
                    }}
                  >
                    <PlusOutlined className="text-[#8f8cb3] text-2xl mb-1" />
                  </Circle>

                  <p className="text-white lg:m-0 relative right-2 w-[85px]">
                    {addProfileText}
                  </p>
                </div>
                <div
                  className={`mt-4 p-1 cursor-pointer `}
                  onClick={() => {
                    setSelectedUser({
                      zodiacSign: fullprofile?.zodiacSign,
                      _id: fullprofile?._id,
                      you: true,
                    });
                    setAvatar(fullprofile?.zodiacSign);
                  }}
                >
                  <Box
                    w="60px"
                    h="60px"
                    borderRadius="full"
                    className={`profile-image-container p-1 cursor-pointer ${selectedUser?._id == fullprofile?._id
                      ? fullprofile?.free
                        ? "border-2 border-orange-500"
                        : "border-2 border-[#ff00e9] shadow-2xl"
                      : ""
                      }`}
                  >
                    <Image
                      src={getZodiacImage(fullprofile?.zodiacSign)}
                      borderRadius="full"
                      boxSize="50px"
                      objectFit="cover"
                      alt={fullprofile?.zodiacSign}
                    />
                  </Box>
                  <p className="text-white font-nunito-light text-center  w-full">
                    {youText}
                  </p>
                </div>
                <div className=" flex w-[28%]  scroll-container">
                  {friendslist?.map((friend) => {
                    return (
                      <div
                        key={friend._id}
                        className={`mt-4 p-1 cursor-pointer hidden lg:block `}
                        onClick={() => handleUserClick(friend)}
                      >
                        <Box
                          w="60px"
                          h="60px"
                          borderRadius="full"
                          className={`profile-image-container p-1 cursor-pointer ${selectedUser && selectedUser._id === friend._id
                            ? friend.free
                              ? "border-2 border-orange-500"
                              : "border-2 border-[#ff00e9] shadow-2xl"
                            : ""
                            }`}
                        >
                          <Image
                            src={getZodiacImage(friend.zodiacSign)}
                            borderRadius="full"
                            boxSize="50px"
                            objectFit="cover"
                            alt={friend?.zodiacSign}
                          />
                        </Box>
                        <p className="text-white font-nunito-light text-center w-full text-xs md:text-base">
                          {friend.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Box>
            </div>

            <ButtonGroup gap={{ base: 2, md: 5, lg: 5 }} className="mt-2">
              <Box className="lg:mt-3 z-10">
                <Profile />
              </Box>
              <Box className="lg:mt-3 z-10">
                <LanguageToggle isSimpleButton={true} />
              </Box>
            </ButtonGroup>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
