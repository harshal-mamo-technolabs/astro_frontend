import { useContext, useEffect, useState, useMemo } from "react";
import styles from "./PlansPage.module.scss";
//import Cards from "../../sections/Cards/Cards";
//import SubFooter from "../SubFooter/SubFooter";
import ImageSlider from "../ImageSlider/ImageSlider";
import { CardContext } from "../../context/CardContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import axios from "axios";
import { useProfile } from "../../context/Profile";
//import { Button } from "antd";
import { Text, Button} from "@chakra-ui/react";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

//const AstrologyReportPage = ({ subscriptionInfo }) => {
const AstrologyReportPage = () => {
  const { selectedCard } = useContext(CardContext);
  const { paymentList, setPaymentList } = useProfile();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");
  const isUpgrade = searchParams.get("upgrade") === "true";

  // Translation texts
  const welcomeStarterText = useTranslatedText("Welcome to Zodiya Starter 1 month plan");
  const welcomePremiumText = useTranslatedText("Welcome to Zodiya Premium 2 months plan");
  const welcomeGoldText = useTranslatedText("Welcome to Zodiya Gold 3 months plan");
  const welcomeDefaultText = useTranslatedText("Welcome to Zodiya");
  const unlockedReportsText = useTranslatedText("you have unlocked all premium reports:");
  const goToReportText = useTranslatedText("Go to astrology report");

  const reportTexts = useMemo(() => [
    "Synastry Report",
    "Transit Report",
    "Solar return Report",
    "Numerology Report"
  ], []);

  const [synastryReportText, transitReportText, solarReturnReportText, numerologyReportText] = useTranslatedTexts(reportTexts);

  const getPlanMessage = () => {
    switch(plan) {
      case "STARTER":
        return welcomeStarterText;
      case "PREMIUM":
        return welcomePremiumText;
      case "GOLD":
        return welcomeGoldText;
      default:
        return welcomeDefaultText;
    }
  };

  const navigatetoHome = () => {
    navigate("/home");
  }
  const handleContinue = async () => {
    if (paymentList?.defaultPaymentMethodId) {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}stripe/pay-default-payment-method`,
          {
            lookup_key: selectedCard.lookup_key,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setLoading(false);
          navigate("/success");
        })
        .catch((err) => setLoading(false))
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/subscription/pay", { state: { selectedCard } });
    }
  };
  const fetchPaymentList = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`, {
        withCredentials: true,
      })
      .then((res) => {
        setPaymentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

/*  
  const handleChangePayment = () => {
    navigate("/subscription/changePayment", { state: { selectedCard } });
  };
*/
  useEffect(() => {
    fetchPaymentList();
  }, []);

  /*const bulletPoints = [
    "The current subscription will remain active until the end of the current billing cycle.",
    "The new subscription will only be active from the start of the next billing cycle.",
    "Please click Confirm to proceed.",
  ];
  */

  return (
    <div
      className={`${styles.planPage} min-h-screen`}
      style={{
        backgroundColor: "#141333",
      }}
    >
      <BackButton onClick={() => navigate("/home")} />
      <ImageSlider />
      <h2 className={styles.subtitle}>
        {getPlanMessage()}
      </h2>
      <div className="text-white text-center mt-3 text-sm">
      <Text>
        {unlockedReportsText}
        </Text>
    <Text>{synastryReportText}</Text>
        <Text>{transitReportText}</Text>
        <Text>{solarReturnReportText}</Text>
        <Text mb="8">{numerologyReportText}
      </Text>
      <Button
        bg="#551d91"
        color="white"
        borderRadius="full"
        w={{base: "90%", md: "50%"}}
        mb={3}
        _hover={{ bg: "#551d91" }}
        onClick={navigatetoHome}
        >
       {goToReportText}
      </Button>
      </div>
    {/*   <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent 
              textAlign="center"
              bgGradient="linear(to-r, #4f46e5, #9333ea)" // Tailwind's indigo-700 and purple-600
              color="white"
              p={6}
              w="100%"
              maxW="md"
              h="500px"
              >
              <ModalBody>
              <Text fontSize="2xl" mb={6}>
              You are about to upgrade to premium
              </Text>
      <Box m={0} p={0}>       
      <VStack spacing={2} align="start" mb={4} fontSize={{ base: "sm", md: "md" }}>
        {bulletPoints.map((point, index) => (
          <HStack align="start" spacing={2} key={index}>
            <Text as="span">•</Text>
            <Text>{point}</Text>
          </HStack>
        ))}
      </VStack>
   </Box>
    <div className="flex justify-between gap-4">
          <Button
              bg="transparent"
              color="white"
              borderRadius="xl"
              border="2px"
              borderColor="#7937a0"
              w="full"
              mb={3}
              _hover={{ bg: "#7937a0" }}
              onClick={onClose}
              >
              Cancel
            </Button>
      
            <Button
              bg="#7937a0"
              color="white"
              borderRadius="xl"
              w="full"
              mb={3}
              _hover={{ bg: "#7937a0" }}
              onClick={handleContinue}
            >
              Confirm
            </Button>
          </div>
          </ModalBody>
              </ModalContent>
      </Modal>
    */}
    </div>
  );
};

export default AstrologyReportPage;
