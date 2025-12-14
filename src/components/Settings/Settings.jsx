import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Center, Divider, MenuItem, Text, Menu } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Settings = () => {
    const navigate = useNavigate();
    
    const translationKeys = useMemo(() => [
        "Settings",
        "Personal Information",
        "Plans",
        "Billing",
        "Manage Account",
        "Help",
        "Privacy Policy",
        "Refund Policy",
        "Terms of Use",
        "FAQ"
    ], []);
    
    const translatedTexts = useTranslatedTexts(translationKeys);
    
    const [
        settingsText,
        personalInfoText,
        plansText,
        billingText,
        manageAccountText,
        helpText,
        privacyPolicyText,
        refundPolicyText,
        termsOfUseText,
        faqText
    ] = translatedTexts;

    return(
        <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
          <div className="p-2">
          <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
        <LeftOutlined
          className="lg:mt-2 mt-2  cursor-pointer "
          onClick={() => navigate("/home")}
        />
        <div className="flex justify-center w-full me-4 lg:me-6">
          <h2>{settingsText}</h2>
        </div>
      </div>
    </div>
      <div className="relative mt-5">
      <Center>
            <Divider w="full"/>
         </Center>
        </div>
        <Menu>
           <MenuItem bg="transparent">
          <Link to="/Account" className="w-full mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {personalInfoText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/settings/plans" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {plansText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/settings/billing" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {billingText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <div className="relative mt-7">
      <Center>
            <Divider w="full"/>
         </Center>
        </div>
        <MenuItem bg="transparent">
          <Link to="/settings/manageaccount" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {manageAccountText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/settings/help" className="w-full mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {helpText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/privacy" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {privacyPolicyText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/refund" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {refundPolicyText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/terms" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {termsOfUseText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/faq" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {faqText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        
        </Menu>
        </div>
    );
}; 
export default Settings;