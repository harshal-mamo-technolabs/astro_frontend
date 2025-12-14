import { Box, Modal, ModalOverlay, ModalContent, ModalBody, Button, Text } from "@chakra-ui/react";
import SrHeader from "../components/Solar_return_cmp/SrHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import { useEffect, useState } from "react";
import bg from "../assets/bg.mp4";
import { useProfile } from "../context/Profile";
import PurchaseProfileModal from "../components/PurchaseProfileModal";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslatedText } from "../hooks/useTranslatedText";

const SolarReturn = () => {
  const { pathname } = useLocation();
  const { selectedUser, Payprofile, setPayprofile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isOpen: isPurchaseOpen,
    onOpen: onPurchaseOpen,
    onClose: onPurchaseClose
  } = useDisclosure();
  const navigate = useNavigate();

  const unlockFullInsightsText = useTranslatedText("Unlock full insights for this profile");
  const unlockText = useTranslatedText("Unlock");
  const goBackText = useTranslatedText("Go Back");

  // //personality report api call

  // const expressionNumber = () => {
  //   axios
  //     .get("https://paste.soulharsh007.dev/31fc640.json")
  //     .then((res) => setExpression(res.data.data))
  //     .catch((err) => console.log(err));
  // };

  // const soulurge = () => {
  //   axios
  //     .get("https://paste.soulharsh007.dev/1bba6e6.json")
  //     .then((res) => setSoul(res.data.data))
  //     .catch((err) => console.log(err));
  // };

  // const subconsciousData = () => {
  //   axios
  //     .get("https://paste.soulharsh007.dev/6a7ef91.json")
  //     .then((res) => setSubconscious(res.data.data))
  //     .catch((err) => console.log(err));
  // };

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
          </Box>
          <span className="lg:hidden md:hidden">
            <ZodiacNav />
          </span>
          <span className="lg:hidden">
            <ZodiacAvatar />
          </span>
          <SrHeader />
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

export default SolarReturn;
