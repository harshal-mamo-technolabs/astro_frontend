import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Divider, MenuItem, Text, Menu, Flex } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { message } from "antd";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const ManageAccount = () => {
  const navigate = useNavigate();

  // Translations
  const manageAccountTexts = useMemo(() => [
    "Manage Account",
    "Modify your account settings, deactivate your account, or delete it permanently. Please proceed carefully as some actions are irreversible.",
    "Deactivate account",
    "Delete account",
    "Need assistance?",
    "Contact support",
    "for help with managing your account.",
    "Your account has been deleted successfully.",
    "Account deletion failed. Please try again.",
    "An error occurred while deleting the account."
  ], []);

  const [manageAccountTitle, descriptionText, deactivateAccountText, deleteAccountText, needAssistanceText, contactSupportText, helpText, deleteSuccessText, deleteErrorText, deleteErrorOccurredText] = useTranslatedTexts(manageAccountTexts);

  const DeleteAccount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}users/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        message.success(deleteSuccessText);
        localStorage.clear();
        sessionStorage.clear();
        await fetch(`${import.meta.env.VITE_BASE_URL}users/logout`, {
          method: "POST",
          credentials: "include"
        });
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1500);
      } else {
        console.error("Account delete failed:", result.message || result);
        message.error(deleteErrorText);
      }
    } catch (error) {
      console.error("Error Deleting account:", error);
      message.error(deleteErrorOccurredText);
    }
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      className="text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600"
    >
      {/* Header */}
      <div className="p-2">
        <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined
            className="lg:mt-2 mt-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full me-4 lg:me-6">
            <h2>{manageAccountTitle}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <Box className="p-4 lg:p-8">
        <Text fontSize={{ base: "sm", md: "md" }} mb="4">
          {descriptionText}
        </Text>

        <Divider />

        <Menu>
          <MenuItem bg="transparent">
            <Link to="/settings/deactivateaccount" className="w-full mt-4">
              <Box className="flex justify-between w-full">
                <Text className="text-[#f8e9e9] text-lg">
                  {deactivateAccountText}
                </Text>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </Box>
            </Link>
          </MenuItem>

          <MenuItem bg="transparent">
            <Box className="flex justify-between w-full mt-4 cursor-pointer" onClick={() => navigate('/settings/deleteaccount')}>
              <div>
                <Text className="text-[#f8e9e9] text-lg">
                  {deleteAccountText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg text-[white]" />
              </div>
            </Box>
          </MenuItem>
        </Menu>
      </Box>

      {/* Footer pushed to bottom with 5px margin */}
      <Box mt="auto" mb="5px" textAlign="center" w="full">
        <Divider mt={6} mb={3} />
        <Text fontSize="sm" color="#d1c4e9" m="3">
          {needAssistanceText}{" "}
          <Link to="/home/support">
            <span className="underline cursor-pointer"> {contactSupportText} </span>
          </Link>
          {" "}{helpText}
        </Text>
      </Box>
    </Flex>
  );
};

export default ManageAccount;
