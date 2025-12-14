import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Text, Divider, Button, Flex, Center, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { message } from "antd";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const DeactivateAccountPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Translations
  const deactivateTexts = useMemo(() => [
    "Deactivate Account",
    "You can temporarily deactivate your account. It will be reactivated automatically when you log back in.",
    "Deactivate my account",
    "Need assistance?",
    "Contact support",
    "for help with managing your account.",
    "Are you sure you want to deactivate your account?",
    "All your current active plans will be scheduled for cancellation at the end of the billing cycle. If you log in again, your account and plans will be reactivated.",
    "Deactivate My Account",
    "Go Back",
    "Failed to deactivate account.",
    "Failed to deactivate account. Please try again."
  ], []);

  const [deactivateAccountTitle, descriptionText, deactivateButtonText, needAssistanceText, contactSupportText, helpText, confirmTitleText, confirmDescriptionText, deactivateConfirmButtonText, goBackText, deactivateErrorText, deactivateErrorRetryText] = useTranslatedTexts(deactivateTexts);

  const handleDeactivateClick = () => {
    onOpen();
  };

  const handleConfirmDeactivate = async () => {
    onClose();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}users/deactivate`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate('/deactivation-success');
      } else {
        message.error(response.data.msg || deactivateErrorText);
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
      message.error(deactivateErrorRetryText);
    }
  };

  return (
    <Box
      className="text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600"
      position="relative"
      minH="100vh"
      overflow="hidden"
    >
      {/* Header */}
      <Box className="p-2">
        <Box className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined
            className="lg:mt-2 mt-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <Box className="flex justify-center w-full me-4 lg:me-6">
            <h2>{deactivateAccountTitle}</h2>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box px={6} pt={6} pb={28}> {/* Give enough bottom padding to avoid overlapping the footer */}
        <Text fontSize={{ base: "sm", md: "md" }} mb="4">
          {descriptionText}
        </Text>

        <Divider />

        {/* Deactivate Button - Now opens modal */}
        <Center mt={8}>
          <Button
            onClick={handleDeactivateClick}
            bg="#6C2CA6"
            color="white"
            px={8}
            py={3}
            borderRadius="8"
            fontSize="base"
            fontWeight="medium"
            _hover={{ opacity: 0.9 }}
            transition="opacity 0.3s"
            w={{ base: "full", md: "auto" }}
          >
            {deactivateButtonText}
          </Button>
        </Center>
      </Box>

      {/* Footer fixed to 5px from bottom */}
      <Box
        position="absolute"
        bottom="5px"
        left="0"
        w="full"
        textAlign="center"
      >
        <Divider mb={3} />
        <Text fontSize="sm" color="#d1c4e9" m="3">
          {needAssistanceText}{" "}
          <Link to="/home/support">
            <span className="underline cursor-pointer"> {contactSupportText} </span>
          </Link>
          {" "}{helpText}
        </Text>
      </Box>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="#33175b"
          color="white"
          borderRadius="md"
          p={4}
          maxW={{ base: "90%", md: "400px" }}
        >
          <ModalBody textAlign="center">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {confirmTitleText}
            </Text>
            <Text fontSize="sm" color="#d1c4e9">
              {confirmDescriptionText}
            </Text>
          </ModalBody>

          <ModalFooter flexDirection="column" gap={3} pt={4}>
            <Button
              onClick={handleConfirmDeactivate}
              bg="#6C2CA6"
              color="white"
              px={8}
              py={3}
              borderRadius="8"
              fontSize="base"
              fontWeight="medium"
              _hover={{ opacity: 0.9 }}
              transition="opacity 0.3s"
              w="full"
            >
              {deactivateConfirmButtonText}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              color="white"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              w="full"
            >
              {goBackText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeactivateAccountPage;
