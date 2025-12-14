import CardButton from "../../CardButton";
import { Center, Modal, useDisclosure, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Button, Text, Image } from "@chakra-ui/react";
import LockReport from "../../Lockreport/LockReport";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/Profile";
import PurchaseProfileModal from "../../PurchaseProfileModal";
import { useTranslatedTexts } from "../../../hooks/useTranslatedText";
import { useMemo } from "react";

const ServiceCard = ({
  src,
  describtion,
  name,
  to,
  image,
  heading,
  footdesc,
}) => {
  const navigate = useNavigate();
  const { selectedUser, Payprofile, setPayprofile } = useProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPurchaseOpen,
    onOpen: onPurchaseOpen,
    onClose: onPurchaseClose
  } = useDisclosure();

  // Helper: is this a locked report for a free profile?
  const isLockedForFree = selectedUser?.free && name !== "Synastry";

  const serviceCardTexts = useMemo(() => [
    "Unlock full insights for this profile",
    "Unlock",
    "Go Back"
  ], []);
  
  const [unlockText, unlockButtonText, goBackText] = useTranslatedTexts(serviceCardTexts);

  const handleCardClick = (e) => {
    if (isLockedForFree) {
      onOpen();
    } else {
      navigate(to);
    }
  };

  return (
    <div className=" bg-[#1a102e] backdrop-blur-md bg-opacity-40 webkit-backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-center align-middle gap-5 text-white overflow-hidden p-2">
      <Center>
        <Image
          src={src}
          alt="logo"
          w={{ base: "110px", md: "120px", lg: "130px" }}
          className="lg:w-[200px] filter grayscale invert"
        />
      </Center>
      <p className="md:text-[1.1rem] p-1 text-center text-[#9e9e9f] font-nunito-light">
        {describtion}
      </p>
      <div className="w-full  flex justify-center m-3">
        <div
          onClick={handleCardClick}
          className={`w-[80%] ${name === "Daily Tarot" && "relative top-3"} ${name === "Natal Chart" && "relative top-1"
            }${name === "Solar Return" && "relative top-1"} ${name === "Solar Return" && "relative top-1"
            }`}
        >
          <CardButton name={name}>{name}</CardButton>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
              {unlockText}
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
                onClose();
              }}
            >
              {unlockButtonText}
            </Button>
            <Button
              variant="ghost"
              color="white"
              w="full"
              fontWeight="medium"
              fontSize="md"
              onClick={onClose}
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
    </div>
  );
};

export default ServiceCard;
