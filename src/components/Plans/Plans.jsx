import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Center, Divider, MenuItem, Text, Menu } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";


const Plans = () => {
    const navigate = useNavigate();

    const plansTexts = useMemo(() => [
        "Settings",
        "Current Plans:",
        "Premium Plans",
        "Profile Plans",
        "Need Assistance?",
        "Contact support",
        "for help with managing your account."
    ], []);

    const [settingsText, currentPlansText, premiumPlansText, profilePlansText, needAssistanceText, contactSupportText, helpManagingAccountText] = useTranslatedTexts(plansTexts);
   

    return(
        <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
          <div className="p-2">
          <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
        <LeftOutlined
          className="lg:mt-2 mt-2  cursor-pointer "
          onClick={() => navigate(-1)}
        />
        <div className="flex justify-center w-full me-4 lg:me-6">
          <h2>{settingsText}</h2>
        </div>
      </div>
    </div>
      <div className="relative mt-5">
      <Text fontSize="sm" mb="2">{currentPlansText} </Text>
      <Center>
            <Divider w="full" mb="2" mt="2"/>
         </Center>
        </div>
        <Menu>
           <MenuItem mt={2} mb={2} bg="rgba(255, 255, 255, 0.1)">
          <Link to="/settings/plans/premiumplanStatus" className="w-full mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {premiumPlansText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem mt={2} mb={2} bg="rgba(255, 255, 255, 0.1)">
          <Link to="/settings/plans/profileplanStatus" className="w-full mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {profilePlansText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        </Menu>
        <div>
        <Box position="fixed" bottom={0} px={2} textAlign="center" w={{ base: "100%", md: "full" }} mb="3">
            <Divider/>
            <Text fontSize="sm" m="3">
                {needAssistanceText}{" "}
                <Link to="/home/support"> 
                <span className="underline cursor-pointer"> {contactSupportText} </span></Link>{" "}
                {helpManagingAccountText}
            </Text>
        </Box>
        </div>
        </div>
    );
}; 
export default Plans;