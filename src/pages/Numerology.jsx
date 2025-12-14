import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NumerologyHeader from "../components/Numerology_cmp/NumerologyHeader";
import { ArrowLeftOutlined } from "@ant-design/icons";
import bg from "../assets/bg.mp4";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import { useContext, useEffect, useState } from "react";
import { Box, Modal, ModalOverlay, ModalContent, ModalBody, Button, Text } from "@chakra-ui/react";
import axios from "axios"
import { CardContext } from "../context/CardsDataContext";
import { useProfile } from "../context/Profile";
import PurchaseProfileModal from "../components/PurchaseProfileModal";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslatedText } from "../hooks/useTranslatedText";

const Numerology = () => {
  const { pathname } = useLocation();
  const { selectedUser, Payprofile, setPayprofile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isOpen: isPurchaseOpen,
    onOpen: onPurchaseOpen,
    onClose: onPurchaseClose
  } = useDisclosure();
  const navigate = useNavigate();
  const {
    setNumbers,
    setLifePath,
    setPersonalitynum,
    setExpression,
    setSoul,
    setSubconscious,
  } = useContext(CardContext);

  const numerologyText = useTranslatedText("Numerology");
  const unlockFullInsightsText = useTranslatedText("Unlock full insights for this profile");
  const unlockText = useTranslatedText("Unlock");
  const goBackText = useTranslatedText("Go Back");

  //get numbers api call
  const getNumbers = () => {
    axios
      .get("https://paste.soulharsh007.dev/e71512b.json")
      .then((res) => setNumbers(res.data.data))
      .catch((err) => console.log(err));
  };

  //life path api call
  const getLifePath = () => {
    axios
      .get("https://paste.soulharsh007.dev/291c6e0.json")
      .then((res) => setLifePath(res.data.data))
      .catch((err) => console.log(err));
  };

  //personality report api call
  const personality = () => {
    axios
      .get("https://paste.soulharsh007.dev/8e6b972.json")
      .then((res) => setPersonalitynum(res.data.data))
      .catch((err) => console.log(err));
  };
  const expressionNumber = () => {
    axios
      .get("https://paste.soulharsh007.dev/31fc640.json")
      .then((res) => setExpression(res.data.data))
      .catch((err) => console.log(err));
  };

  const soulurge = () => {
    axios
      .get("https://paste.soulharsh007.dev/1bba6e6.json")
      .then((res) => setSoul(res.data.data))
      .catch((err) => console.log(err));
  };

  const subconsciousData = () => {
    axios
      .get("https://paste.soulharsh007.dev/6a7ef91.json")
      .then((res) => setSubconscious(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNumbers();
    getLifePath();
    personality();
    expressionNumber();
    soulurge();
    subconsciousData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!!selectedUser?.free) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [selectedUser]);

  return (
    <Box className="min-h-screen font-nunito-light">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full min-h-screen h-full fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>
      {!isModalOpen && (
        <>
          <Box className="lg:p-3">
            <Navbar />
          </Box>{" "}
          <span className="lg:hidden md:hidden">
            <ZodiacNav />
          </span>{" "}
          <span className="lg:hidden">
            <ZodiacAvatar />
          </span>
          <NumerologyHeader />
          <div className="flex gap-3 text-2xl lg:text-3xl p-3  text-white ">
            <ArrowLeftOutlined
              className="mt-1 cursor-pointer"
              onClick={() => navigate("/home")}
            />
            <div className=" w-full flex justify-center me-6">
              <h2>{numerologyText}</h2>
            </div>
          </div>
          <Outlet />
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {}}
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent
          bg="#23123a"
          borderRadius="2xl"
          boxShadow="2xl"
          p={{ base: 6, md: 8 }}
          maxW="sm"
          mx="auto"
        >
          <ModalBody>
            <Text fontSize="lg" color="white" textAlign="center" mb={7}>
              {unlockFullInsightsText}
            </Text>
            <Button
              colorScheme="purple"
              bg="#4b50c2"
              color="white"
              borderRadius="2xl"
              w="full"
              fontWeight="medium"
              fontSize="md"
              mb={3}
              py={3}
              onClick={() => {
                setPayprofile(true);
                onPurchaseOpen();
              }}
            >
              {unlockText}
            </Button>
            <Button
              variant="ghost"
              color="white"
              w="full"
              fontWeight="medium"
              fontSize="md"
              onClick={() => {
                setIsModalOpen(false);
                navigate(-1);
              }}
              _hover={{ bg: "#2d1a3a" }}
            >
              {goBackText}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isPurchaseOpen} onClose={onPurchaseClose} isCentered>
        <PurchaseProfileModal onClose={onPurchaseClose} />
      </Modal>
    </Box>
  );
};

export default Numerology;
