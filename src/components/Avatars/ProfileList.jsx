import { PlusOutlined } from "@ant-design/icons";
import {
  Box,
  Circle,
  Image,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import "../Horoscope/HoroScope.css";
import { useContext } from "react";
import { useProfile } from "../../context/Profile";
import { message } from "antd";
import AddPartnerModal from "../AddPartnermodal";
import { CardContext } from "../../context/CardsDataContext";
import axios from "axios";
import PurchaseProfileModal from "../PurchaseProfileModal";
import ChangeProfileModal from "../ChangeProfilePlan/ChangeProfileModal";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const ProfileList = () => {
  const {
    friendslist,
    selectedUser,
    setSelectedUser,
    getZodiacImage,
    Payprofile,
    setPayprofile,
  } = useProfile();
  const { fullprofile } = useContext(CardContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isChangePlanOpen, onOpen: onChangePlanOpen, onClose: onChangePlanClose } = useDisclosure();

  const profileListTexts = useMemo(() => [
    "Add Profile",
    "You"
  ], []);
  
  const [addProfileText, youText] = useTranslatedTexts(profileListTexts);

  const handleUserClick = (friend) => {
    setSelectedUser(friend);
    if (selectedUser?.name === friend?.name) {
      message.error(
        ` ${friend ? friend.name : "your"} profile is already selected`
      );
    } else {
      message.success(` ${friend ? friend.name : "your"} profile selected`);
    }
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
            message.info("You have reached the maximum profile limit with your current plan.");
          } else {
            onChangePlanOpen();
          }
        }
      } else {
        message.error("Failed to get subscription data.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setPayprofile(true);
        onOpen();
      } else {
        console.error("Error checking subscription status:", err);
        message.error("Failed to check subscription status");
      }
    }
  };

  return (
    <Box className=" flex gap-10  lg:h-[18.5vh] rounded-xl mt-4 bg-[#05102e] overflow-x-auto lg:overflow-y-hidden p-2  backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md">
      <Modal isOpen={isOpen} onClose={onClose}>
        {Payprofile ? (
           <div>
              <PurchaseProfileModal onClose={onClose} />
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

      <Box className="flex gap-5 w-[50%]  justify-between items-center font-nunito-light ">
        <div
          className="mt-5 lg:mt-10 ms-5  cursor-pointer lg:mb-7 "
          onClick={handleAddProfileClick}
        >
          <Circle
            size="60px"
            color="white"
            bg="#06123a"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            className="border-solid border-2 border-indigo-600 "
          >
            <PlusOutlined className=" text-2xl text-indigo-400" />
          </Circle>

          <p className=" text-xs text-[#5e67a4]  lg:m-0 relative right-2 w-[90px]">
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
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`p-1 cursor-pointer ${
              selectedUser?._id === fullprofile?._id
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
          <p className="text-white font-nunito-light text-center w-full text-xs md:text-base">
            {youText}
          </p>
        </div>
        {friendslist?.map((friend) => {
          return (
            <div
              key={friend._id}
              className={`mt-4 p-1 cursor-pointer `}
              onClick={() => handleUserClick(friend)}
            >
              <Box
                w="60px"
                h="60px"
                borderRadius="full"
                className={`p-1 cursor-pointer ${
                  selectedUser && selectedUser._id === friend._id
                    ? friend.free
                      ? "border-2 border-orange-500"
                      : "border-2 border-[#ff00e9] shadow-2xl"
                    : ""
                }`}
              >
                <Image
                  src={getZodiacImage(friend?.zodiacSign)}
                  borderRadius="full"
                  boxSize="50px"
                  objectFit="cover"
                  alt={friend?.zodiacSign}
                />
              </Box>
              <p className="text-white font-nunito-light text-center  w-full">
                {friend?.name}
              </p>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProfileList;
