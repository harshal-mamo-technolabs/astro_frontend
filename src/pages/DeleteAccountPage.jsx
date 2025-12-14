import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Text, Divider, Button, Flex, Center, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { message } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const DeleteAccountPage = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [hasActiveSubscriptions, setHasActiveSubscriptions] = useState(false);
    const [loading, setLoading] = useState(true);

    // Translations
    const deleteTexts = useMemo(() => [
      "Delete Account",
      "Permanently delete your account. This action will revoke all access and remove all your data from our systems.",
      "Delete my Account",
      "Need assistance?",
      "Contact support",
      "for help with managing your account.",
      "You can't delete your account as you have active subscription plans. Manage your active subscription plans or cancel them.",
      "Cancel my plans",
      "Go back",
      "By deleting your account, you agree to the following:",
      "Loss of access to your account",
      "Permanent deletion of your personal data",
      "Retention of anonymized logs as per our policy",
      "Delete My Account",
      "Go Back",
      "Loading...",
      "Failed to check subscription status",
      "Failed to delete account.",
      "Failed to delete account. Please try again."
    ], []);

    const [deleteAccountTitle, descriptionText, deleteButtonText, needAssistanceText, contactSupportText, helpText, activeSubscriptionsText, cancelPlansText, goBackText, agreeText, lossAccessText, permanentDeletionText, retentionLogsText, deleteConfirmButtonText, goBackButtonText, loadingText, checkSubscriptionErrorText, deleteErrorText, deleteErrorRetryText] = useTranslatedTexts(deleteTexts);

    useEffect(() => {
        checkActiveSubscriptions();
    }, []);

    const checkActiveSubscriptions = async () => {
        setLoading(true);
        try {
            // Check both subscription endpoints
            const [subscriptionsRes, profileSubscriptionsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BASE_URL}subscriptions/v2`, { withCredentials: true })
                    .catch(error => {
                        if (error.response?.status === 404) {
                            return { data: { success: false } };
                        }
                        throw error;
                    }),
                axios.get(`${import.meta.env.VITE_BASE_URL}subscriptions/profile/v2`, { withCredentials: true })
                    .catch(error => {
                        if (error.response?.status === 404) {
                            return { data: { success: false } };
                        }
                        throw error;
                    })
            ]);

            const hasSubscriptions = (subscriptionsRes.data?.success || profileSubscriptionsRes.data?.success) === true;
            setHasActiveSubscriptions(hasSubscriptions);
            return hasSubscriptions;
        } catch (error) {
            console.error("Error checking subscriptions:", error);
            message.error(checkSubscriptionErrorText);
            setHasActiveSubscriptions(true);
            return true;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = async () => {
        const hasSubscriptions = await checkActiveSubscriptions();
        if (hasSubscriptions) {
            onOpen();
        } else {
            onOpen();
        }
    };

    const handleConfirmDelete = async () => {
        onClose();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}users/delete`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate('/deletion-success');
            } else {
                message.error(response.data.msg || deleteErrorText);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            message.error(deleteErrorRetryText);
        }
    };

    if (loading) {
        return (
            <Box className="min-h-screen text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600 flex items-center justify-center">
                <Text>{loadingText}</Text>
            </Box>
        );
    }

    return (
        <Box
            className="min-h-screen text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600"
            position="relative"
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
                        <h2>{deleteAccountTitle}</h2>
                    </Box>
                </Box>
            </Box>

            {/* Content */}
            <Box px={6} pt={6} pb={28} className="flex flex-col flex-grow">
                <Text fontSize={{ base: "sm", md: "md" }} mb="4">
                    {descriptionText}
                </Text>

                <Divider />

                {/* Delete Button */}
                <Center mt={8}>
                    <Button
                        onClick={handleDeleteClick}
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
                        {deleteButtonText}
                    </Button>
                </Center>
            </Box>

            {/* Footer */}
            <Box
                position="absolute"
                bottom="5px"
                left="0"
                right="0"
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

            {/* Active Subscriptions Modal */}
            <Modal isOpen={isOpen && hasActiveSubscriptions} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    bg="#33175b"
                    color="white"
                    borderRadius="md"
                    p={4}
                    maxW={{ base: "90%", md: "400px" }}
                >
                    <ModalBody textAlign="center">
                        <Text fontSize="sm" color="#d1c4e9">
                            {activeSubscriptionsText}
                        </Text>
                    </ModalBody>

                    <ModalFooter flexDirection="column" gap={3} pt={4}>
                        <Button
                            onClick={() => navigate('/settings/plans')}
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
                            {cancelPlansText}
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

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isOpen && !hasActiveSubscriptions} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    bg="#33175b"
                    color="white"
                    borderRadius="md"
                    p={4}
                    maxW={{ base: "90%", md: "400px" }}
                >
                    <ModalBody textAlign="center">
                        <Text fontSize="sm" color="#d1c4e9">
                            {agreeText}
                        </Text>
                        <Box as="ul" textAlign="left" color="#d1c4e9" fontSize="sm" mt={2} ml={4}>
                            <li>{lossAccessText}</li>
                            <li>{permanentDeletionText}</li>
                            <li>{retentionLogsText}</li>
                        </Box>
                        </ModalBody>    

                    <ModalFooter flexDirection="column" gap={3} pt={4}>
                        <Button
                            onClick={handleConfirmDelete}
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
                            {deleteConfirmButtonText}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            color="white"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                            w="full"
                        >
                            {goBackButtonText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DeleteAccountPage; 