import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Divider, Menu, MenuItem, Text } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";


const Help = () => {
    const navigate = useNavigate();

    const helpTexts = useMemo(() => [
        "Help",
        "Contact Support",
        "Quick Guide",
        "About Zodiya",
        "Zodiya features",
        "How to use",
        "Subscription and Billing",
        "Tech Assistance"
    ], []);

    const [helpText, contactSupportText, quickGuideText, aboutZodiyaText, zodiyaFeaturesText, howToUseText, subscriptionBillingText, techAssistanceText] = useTranslatedTexts(helpTexts);
    return (
      <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
         <div className="p-2">
            <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
          <LeftOutlined
            className="lg:mt-2 mt-2  cursor-pointer "
            onClick={() => navigate("/settings")}
          />
          <div className="flex justify-center w-full me-4 lg:me-6">
            <h2>{helpText}</h2>
          </div>
        </div>
       <Box textAlign="center" w={{ base: "100%", md: "full" }} mb="4" mt="7">
            <Divider/>
          </Box>
          <Menu>
           <MenuItem bg="transparent">
          <Link to="/home/support" className="w-full mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-lg">
                  {contactSupportText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <Box textAlign="center" w={{ base: "100%", md: "full" }} mb="3" mt="5">
            <Divider/>
          </Box>
          <Text className="text-lg" textAlign="center" mt={{ base: "5vh", md: 0 }} mb="3">{quickGuideText}</Text>
          <MenuItem bg="transparent">
          <Link to="/about-zodiya" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {aboutZodiyaText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/zodiya-features" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {zodiyaFeaturesText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/how-to-use" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {howToUseText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/subscription-and-billing" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {subscriptionBillingText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-lg cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/tech-assistance" className="w-full mt-4">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-md">
                  {techAssistanceText}
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
      </div>
    );
  };
  
  export default Help;
  