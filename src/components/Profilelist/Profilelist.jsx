import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext, useState, useMemo } from "react";
import { useProfile } from "../../context/Profile";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import ZodiacNav from "../More_detail/ZodiacNav";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ZodiacAvatar from "../More_detail/ZodiacAvatar";
import AddPartnerModal from "../AddPartnermodal";
import { Popconfirm, Spin, message } from "antd";
import { CardContext } from "../../context/CardsDataContext";
import UpdateModal from "./UpdateModal";
import axios from "axios";
import PurchaseProfileModal from "../PurchaseProfileModal";
import ChangeProfileModal from "../ChangeProfilePlan/ChangeProfileModal";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const Profilelist = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isChangePlanOpen, 
    onOpen: onChangePlanOpen, 
    onClose: onChangePlanClose 
  } = useDisclosure();
  const {
    friendslist,
    selectedUser,
    setSelectedUser,
    getZodiacImage,
    deletefriendloader,
    setDeleteFriendLoader,
    setAvatar,
    Payprofile,
    setPayprofile,
    isFree,
    setIsFree
  } = useProfile();
  const { fullprofile } = useContext(CardContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const profileListText = useTranslatedText("Profile List");
  const addNewFriendText = useTranslatedText("+ Add new Friend");
  const profileAddedAtText = useTranslatedText("Profile added at");
  const pleaseLoginText = useTranslatedText("Please Login Your Account");
  const buySuccessText = useTranslatedText("Buy success");
  const profileDeletedText = useTranslatedText("Profile deleted");
  const maxProfileLimitText = useTranslatedText("You have reached the maximum profile limit with your current plan.");
  const failedToGetSubscriptionText = useTranslatedText("Failed to get subscription data.");
  const failedToCheckSubscriptionText = useTranslatedText("Failed to check subscription status");

  const messageTexts = useMemo(() => [
    "your",
    "profile is already selected",
    "profile selected"
  ], []);
  const translatedMessageTexts = useTranslatedTexts(messageTexts);

  const handleUserClick = (friend) => {
    setSelectedUser(friend);
    setAvatar(friend?.zodiacSign);

    if (selectedUser?.name === friend?.name) {
      message.error(
        ` ${friend ? friend.name : translatedMessageTexts[0]} ${translatedMessageTexts[1]}`
      );
    } else {
      message.success(` ${friend ? friend.name : translatedMessageTexts[0]} ${translatedMessageTexts[2]}`);
    }
  };
  const handleCheckboxChange = () => {
    setIsFree((prevIsFree) => !prevIsFree);
  };
  const confirm = (e, id) => {
    setDeleteFriendLoader(true);
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}friend/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDeleteFriendLoader(false);
        message.success(profileDeletedText);
        console.log(res?.data);
        setSelectedUser({
          zodiacSign: fullprofile?.zodiacSign,
          _id: fullprofile?._id,
          you: true,
        });
        setAvatar(fullprofile?.zodiacSign);
      })
      .catch((err) => {
        setDeleteFriendLoader(false);
        console.log(err);
      });
  };

  const handleChildClick = () => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box
          color="white"
          p={3}
          className=" bg-custom-gradient font-nunito-light text-center rounded-md"
        >
          {buySuccessText}
        </Box>
      ),
    });
    setPayprofile(false);
  };

  const handleAddProfileClick = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}subscriptions/profile`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.data) {
        const maxProfiles = res.data.data.type === "ONE_PROFILE" ? 1 :
                         res.data.data.type === "THREE_PROFILE" ? 3 :
                         res.data.data.type === "SIX_PROFILE" ? 6 : 0;

        if (friendslist.length < maxProfiles) {
          setPayprofile(false);
          onOpen();
        } else {
          if (res.data.data.type === "SIX_PROFILE") {
            message.info(maxProfileLimitText);
          } else {
            onChangePlanOpen();
          }
        }
      } else {
        message.error(failedToGetSubscriptionText);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        // If no subscription, show purchase modal
        setPayprofile(true);
        onOpen();
      } else {
        console.error("Error checking subscription status:", err);
        message.error(failedToCheckSubscriptionText);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-600 min-h-screen">
      <Box className="lg:p-3">
        <Navbar />
      </Box>{" "}
      <span className="lg:hidden md:hidden">
        <ZodiacNav />
      </span>{" "}
      <span className="lg:hidden">
        <ZodiacAvatar />
      </span>
      <Box className=" ">
        <Box className="w-fit">
          <Modal isOpen={isOpen} onClose={onClose}>
            {Payprofile ? (
              <PurchaseProfileModal onClose={onClose} />
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
        </Box>
      </Box>
      <div className="flex justify-center w-full">
        <Box className=" flex flex-col justify-center">
          <div
            className="flex gap-3 w-fit lg:text-3xl text-2xl pb-3 cursor-pointer text-white absolute top-[90px] lg:top-0 left-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className=" md:ms-5 lg:ms-5 ms-1 mt-40 " />
          </div>

          {fullprofile?.name ? (
            <>
              <div className="flex justify-center mt-4">
                <Box className=" text-white">
                  <Heading className="text-center text-white ">
                    {profileListText}
                  </Heading>
                  <Box
                    className="bg-black p-2 rounded-md mt-5 cursor-pointer"
                    w={{ lg: "30rem" }}
                  >
                    <Text
                      className="text-center text-3xl text-[#ddcfd0]"
                      onClick={handleAddProfileClick}
                    >
                      {addNewFriendText}
                    </Text>
                  </Box>
                </Box>
              </div>
              <Center>
                <div className="relative top-9 w-2/5">
                </div>
              </Center>
              <Box className="flex flex-col justify-center ">
                <Center>
                  <Box
                    className={`bg-white w-full m-2  border-2 cursor-pointer ${
                      selectedUser?.you
                        ? "border-2 border-[#ff00e9] shadow-2xl"
                        : ""
                    } flex gap-2 mt-2 rounded-md p-2 items-center`}
                    w={{ lg: "30rem" }}
                    onClick={() => {
                      setSelectedUser({
                        zodiacSign: fullprofile?.zodiacSign,
                        _id: fullprofile?._id,
                        you: true,
                      });
                      setAvatar(fullprofile?.zodiacSign);
                    }}
                  >
                    <Image
                      src={getZodiacImage(fullprofile?.zodiacSign)}
                      borderRadius="full"
                      boxSize="70px"
                      objectFit="cover"
                      border={selectedUser?.you && "2px solid #ff00e9"}
                      alt={fullprofile?.zodiacSign}
                    />
                    <div>
                      <Text className="font-bold text-2xl">
                        {`${fullprofile?.name
                          ?.charAt(0)
                          ?.toUpperCase()}${fullprofile?.name?.slice(1)}`}
                      </Text>
                      <Text className="text-[#b0b0b0] text-xl">
                        {fullprofile.day}-{fullprofile.month}-{fullprofile.year}
                      </Text>

                      <Text className="text-[#b0b0b0] text-xl">{`${profileAddedAtText} ${
                        new Date().toLocaleDateString()
                        // friend.createdAt
                      }`}</Text>
                    </div>
                  </Box>
                </Center>
              </Box>
            </>
          ) : (
            <Link
              to={"/login"}
              className="text-white text-2xl mt-10 border-b-2 border-blue-500"
            >
              {pleaseLoginText}
            </Link>
          )}

          <Spin spinning={deletefriendloader}>
            <div className="flex justify-center w-full mb-4 sm:mb-2">
              <Box className="flex flex-col justify-center ">
                {friendslist?.map((friend) => (
                  <Center key={friend._id}>
                    <Box
                      className={`bg-white m-2 border-2 cursor-pointer  ${
                        selectedUser?._id === friend._id && "border-[#ff00e9]"
                      } flex justify-between mt-2 rounded-md p-2 items-center`}
                      w={{ lg: "30rem" }}
                    >
                      <div
                        onClick={() => handleUserClick(friend)}
                        className="flex justify-between gap-2 "
                      >
                        <Image
                          src={getZodiacImage(friend?.zodiacSign)}
                          borderRadius="full"
                          boxSize="70px"
                          objectFit="cover"
                          border={
                            friend.free
                              ? "3px solid orange"
                              : selectedUser._id === friend._id
                              ? "2px solid #ff00e9"
                              : "none"
                          }
                          alt={friend?.zodiacSign}
                        />
                        <div>
                          <Text className="font-bold text-2xl">
                            {`${friend?.name
                              ?.charAt(0)
                              ?.toUpperCase()}${friend.name?.slice(1)}`}
                          </Text>
                          <Text className="text-[#b0b0b0] text-xl">
                            {friend.day}-{friend.month}-{friend.year}
                          </Text>

                          <Text className="text-[#b0b0b0] text-xl">{`${profileAddedAtText} ${new Date(
                            friend.createdAt
                          ).toLocaleDateString()}`}</Text>
                        </div>
                      </div>
                    </Box>
                  </Center>
                ))}
              </Box>
              <UpdateModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            </div>
          </Spin>
        </Box>
      </div>
    </div>
  );
};

export default Profilelist;
