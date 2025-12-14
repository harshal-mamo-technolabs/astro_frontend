import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useProfile } from "../../context/Profile";
import AddPartnerModal from "../AddPartnermodal";
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ZodiacNav from "../More_detail/ZodiacNav";
import PurchaseProfileModal from "../PurchaseProfileModal";
import { message } from "antd";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const Partner = () => {
  const {
    getZodiacImage,
    loadingprofile,
    deletefriendloader,
    synastryFriends,
    setSynastryFriends,
    friendslist,
  } = useProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalToShow, setModalToShow] = useState(null); // 'add-free', 'add-paid', or 'purchase'
  const [loading, setLoading] = useState(false);

  const partnerTexts = useMemo(() => [
    "Partner",
    "Now, add your partner",
    "Choose one of your friends or add someone else",
    "Friend",
    "ADD PARTNER'S DETAILS",
    "Checking...",
    "You cannot add more profiles. You are at your maximum profile plan."
  ], []);

  const [partnerText, addPartnerText, chooseFriendText, friendText, addPartnerDetailsText, checkingText, maxProfileText] = useTranslatedTexts(partnerTexts);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}friend/my/synastry`, {
        withCredentials: true,
      })
      .then((res) => setSynastryFriends(res.data.friends))
      .catch((err) => console.log(err));
  }, [loadingprofile, deletefriendloader, setSynastryFriends]);

  // Check for active profile plan, returns plan data or null
  const checkActiveProfilePlan = async () => {
    console.log("[Partner] Checking for active profile plan...");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}subscriptions/profile`, {
        withCredentials: true,
      });
      console.log("[Partner] checkActiveProfilePlan response:", res.data);
      return res.data.success ? res.data.data : null;
    } catch (err) {
      console.log("[Partner] checkActiveProfilePlan error:", err?.response?.data?.msg || err.message);
      if (err.response?.status === 404) return null;
      return null;
    }
  };

  // Handler for add partner button
  const handleAddPartnerClick = async () => {
    setLoading(true);
    setModalToShow(null);
    
    const planData = await checkActiveProfilePlan();
    console.log("[Partner] Plan data:", planData);

    if (!planData) {
      // No active plan
      const alreadyHasFreeProfile = friendslist.some(f => f.free);
      console.log("[Partner] No plan found. User has free profile:", alreadyHasFreeProfile);
      if (!alreadyHasFreeProfile) {
        // No plan, no free profile -> show AddPartnerModal for free
        setModalToShow('add-free');
        onOpen();
      } else {
        // No plan, but has free profile -> show PurchaseProfileModal
        setModalToShow('purchase');
        onOpen();
      }
    } else {
      // User has an active plan, check profile limit
      const maxProfiles =
        planData.type === "ONE_PROFILE" ? 1 :
        planData.type === "THREE_PROFILE" ? 3 :
        planData.type === "SIX_PROFILE" ? 6 : 0;
      
      console.log(`[Partner] User has a plan. Max profiles: ${maxProfiles}, Current profiles: ${friendslist.length}`);

      if (friendslist.length < maxProfiles) {
        // Can add more profiles
        console.log("[Partner] User can add more profiles.");
        setModalToShow('add-paid');
        onOpen();
      } else {
        // Reached profile limit
        if (planData.type === "SIX_PROFILE") {
          // Already on max plan, just show toast
          message.info(maxProfileText);
        } else {
          // Reached profile limit, show purchase modal to upgrade
          console.log("[Partner] User has reached profile limit. Prompting for upgrade.");
          setModalToShow('purchase');
          onOpen();
        }
      }
    }
    setLoading(false);
  };

  const handleModalClose = () => {
    setModalToShow(null);
    onClose();
  }

  return (
    <div
      className=" min-h-screen"
      style={{ background: "linear-gradient(to right, #070d2d, #071b58)" }}
    >
      <Box className="lg:p-3">
        <Navbar />
      </Box>
      <span className="lg:hidden md:hidden">
        <ZodiacNav />
      </span>{" "}
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        {modalToShow === 'add-free' && <AddPartnerModal onClose={handleModalClose} free={true} />}
        {modalToShow === 'add-paid' && <AddPartnerModal onClose={handleModalClose} free={false} />}
        {modalToShow === 'purchase' && <PurchaseProfileModal onClose={handleModalClose} />}
      </Modal>
      <div className=" text-white flex items-center ">
        <Link to="/synastrypage">
          <AiOutlineArrowLeft className="text-2xl lg:text-4xl font-bold cursor-pointer mt-4 ms-2" />
        </Link>
        <div className=" w-full  text-center">
          <h2 className="font-semibold font-nunito-light text-2xl mt-4 me-6">
            {partnerText}
          </h2>
        </div>
      </div>
      <div className="text-center text-white mt-10">
        <h2 className="font-semibold font-nunito-light text-2xl">
          {addPartnerText}
        </h2>
        <p className="text-[#8f8cb3] font-nunito-light">
          {chooseFriendText}
        </p>
      </div>
      <Box className="flex flex-col items-center gap-5 mt-10">
        {synastryFriends?.map((friend) => {
          return (
            <div
              className="bg-[#333659] rounded-md p-4 lg:w-[50%] w-[80%] text-white"
              key={friend._id}
            >
              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/synastrypage/partner/${friend._id}/chart`}
                  className="flex justify-between w-full"
                >
                  <div className="flex gap-2">
                    <span>
                      <Image
                        src={getZodiacImage(friend?.zodiacSign)}
                        borderRadius="full"
                        boxSize="80px"
                        border={friend.free ? "3px solid orange" : "2px solid blue"}
                        objectFit="cover"
                        alt={friend?.zodiacSign}
                      />
                    </span>
                    <span>
                      <h3>{friend?.name}</h3>
                      <p className="text-[#8f8cb3] ">{friendText}</p>
                    </span>
                  </div>
                  <div className=" flex items-center">
                    <ChevronRightIcon className="text-2xl  cursor-pointer" />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </Box>
      <div className="flex justify-center">
        <div className="mt-10 flex justify-center flex-col lg:w-[40%]">
          <button
            className="bg-[#5f66fd] rounded-full p-2 text-white "
            onClick={handleAddPartnerClick}
            disabled={loading}
          >
            {loading ? checkingText : addPartnerDetailsText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partner;
