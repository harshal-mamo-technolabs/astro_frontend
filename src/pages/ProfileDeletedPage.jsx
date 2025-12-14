import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Box, Center, Divider, Text } from "@chakra-ui/react";
import { Spin } from "antd";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const ProfileDeletedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");
  const [showSpinner, setShowSpinner] = useState(false);

  // Translations
  const profilePlanText = useTranslatedText("Profile Plan");
  const confirmationEmailText = useTranslatedText("A confirmation email has been sent");
  
  const planMessages = useMemo(() => [
    "Your 1 Profile Plan has been successfully canceled!",
    "Your 3 Profile Plan has been successfully canceled!",
    "Your 6 Profile Plan has been successfully canceled!",
    "Your premium Plan has been successfully canceled!",
    "Your gold Plan has been successfully canceled!",
    "Your trial Plan has been successfully canceled!",
    "Your profile Plan has been successfully canceled!"
  ], []);

  const [profile1CanceledText, profile3CanceledText, profile6CanceledText, premiumCanceledText, goldCanceledText, trialCanceledText, profileCanceledText] = useTranslatedTexts(planMessages);

  const getPlanMessage = () => {
    switch(plan) {
      case "ONE_PROFILE":
        return profile1CanceledText;
      case "THREE_PROFILE":
        return profile3CanceledText;
      case "SIX_PROFILE":
        return profile6CanceledText;
      case "PREMIUM":
        return premiumCanceledText; 
      case "GOLD":
        return goldCanceledText; 
      case "STARTER":
        return goldCanceledText; 
      case "TRIAL":
        return trialCanceledText; 
      default:
        return profileCanceledText;
    }
  };

  useEffect(() => {
    // Show spinner after 2 seconds
    const showSpinnerTimer = setTimeout(() => {
      setShowSpinner(true);

      // Then navigate after 2 more seconds
      const navigateTimer = setTimeout(() => {
        if(plan === "GOLD" || plan === "STARTER" || plan === "TRIAL" || plan === "PREMIUM"){
          navigate("/home");
        } else {
          navigate("/settings/plans/profileplans");
        }
      }, 2000);

      return () => clearTimeout(navigateTimer);
    }, 3000);

    return () => clearTimeout(showSpinnerTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600">
      {showSpinner ? (
        <Center h="100vh">
          <Spin
            spinning={true}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, fontWeight: "bold", color: "white" }}
                spin
              />
            }
          />
        </Center>
      ) : (
        <>
          <div className="p-2">
            <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
              <LeftOutlined
                className="lg:mt-2 mt-2 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <div className="flex justify-center w-full me-4 lg:me-6">
                <h2>{profilePlanText}</h2>
              </div>
            </div>
          </div>
          <div className="p-2">
            <Box className="text-center" mt={{ base: "20vh", md: "15vh" }}>
              <Divider mb={7} />
              <Text fontSize={{ base: "lg", md: "xl" }} mb="5" fontWeight="bold">
                {getPlanMessage()}
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }}>
                {confirmationEmailText}
              </Text>
            </Box>
            <Divider mt={7} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDeletedPage;
