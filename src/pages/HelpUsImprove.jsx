import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {  Center, Divider, Text, Checkbox, Button, Box } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
//import { AiOutlineRight } from "react-icons/ai";


const HelpUsImprove = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // Read the plan code from the URL parameter
    const planCode = searchParams.get("plan");
    const [selectedReason, setSelectedReason] = useState("");
    const [selectedOffers, setSelectedOffers] = useState([]);

    // Translations
    const helpUsImproveTexts = useMemo(() => [
      "Plans",
      "Help Us Improve",
      "We'd Appreciate it if you could tell us why you're canceling",
      "Select a reason",
      "I wasn't using it often enough",
      "Too expensive.",
      "Didn't find the value worth the cost.",
      "It didn't meet my needs or expectations.",
      "Features I needed were unavailable.",
      "Reports or insights were too basic.",
      "I encountered technical problems.",
      "Poor app performance or usability issues.",
      "Reports or horoscopes weren't accurate.",
      "Information was repetitive or unhelpful.",
      "Other",
      "Would you have stayed subscribed if we Offered:",
      "Lower-cost subscription",
      "Annual discounted rates",
      "Additional premium content",
      "Cancel Plan",
      "Cancellation failed. Please try again.",
      "An error occurred while canceling the plan."
    ], []);

    const [plansTitle, helpUsImproveTitle, appreciateText, selectReasonText, notUsingOftenText, tooExpensiveText, notWorthCostText, didntMeetNeedsText, featuresUnavailableText, tooBasicText, technicalProblemsText, poorPerformanceText, notAccurateText, repetitiveText, otherText, wouldStayText, lowerCostText, annualRatesText, additionalContentText, cancelPlanText, cancellationFailedText, errorOccurredText] = useTranslatedTexts(helpUsImproveTexts);
  
    const handleCancelPlan = async () => {
    try {
      // Remove query parameter construction
      // const queryParams = new URLSearchParams();
      // if (selectedReason) {
      //   queryParams.append("reason", selectedReason);
      // }
      // if (selectedOffers.length > 0) {
      //   queryParams.append("offer", selectedOffers.join(","));
      // }

      const url = `${import.meta.env.VITE_BASE_URL}subscriptions/cancel?profile=false`; // Keep only the profile=false query param
      console.log(selectedOffers)
      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          // Include reason and offers in the request body
          
          body: JSON.stringify({
            reason: selectedReason,
            offer: selectedOffers,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("Plan canceled!");
        // Navigate to profiledeleted, including the plan code
        navigate(`/settings/plans/profiledeleted?plan=${planCode}`);
      } else {
        console.error("Cancellation failed:", result.message || result);
        alert(cancellationFailedText);
      }
    } catch (error) {
      console.error("Error canceling plan:", error);
      alert(errorOccurredText);
    }
  };

const handleReasonChange = (event) => {
  setSelectedReason(event.target.value);
};

const handleOfferChange = (event) => {
  const { value, checked } = event.target;
  // Use the value prop directly, which is already set to the offer text
  const offerText = value;

  if (checked) {
    setSelectedOffers([...selectedOffers, offerText]);
  } else {
    setSelectedOffers(selectedOffers.filter(offer => offer !== offerText));
  }
};

   
    return(
        <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
          <div className="p-2">
          <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
        <LeftOutlined
          className="lg:mt-2 mt-2  cursor-pointer "
          onClick={() => navigate(-1)}
        />
        <div className="flex justify-center w-full me-4 lg:me-6">
          <h2>{plansTitle}</h2>
        </div>
      </div>
    </div>
      <div className="relative p-2 mt-5">
      <Text fontSize="sm" mb="2">{helpUsImproveTitle} </Text>
      <Center>
            <Divider w="full" mb="5" mt=""/>
        </Center>
        <Text fontSize='lg' className="text-center" mb={5}>
        {appreciateText}
        </Text>
        <Center>
         <select
    value={selectedReason}
    onChange={handleReasonChange}
    className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2 rounded-md border mb-4 text-[#551d91] bg-[white]"
  >
    <option value="">{selectReasonText}</option>
    <option value="I wasn't using it often enough">{notUsingOftenText}</option>
    <option value="Too expensive.">{tooExpensiveText}</option>
    <option value="Didn't find the value worth the cost.">{notWorthCostText}</option>
    <option value="It didn't meet my needs or expectations.">{didntMeetNeedsText}</option>
    <option value="Features I needed were unavailable.">{featuresUnavailableText}</option>
    <option value="Reports or insights were too basic.">{tooBasicText}</option>
    <option value="I encountered technical problems.">{technicalProblemsText}</option>
    <option value="Poor app performance or usability issues.">{poorPerformanceText}</option>
    <option value="Reports or horoscopes weren't accurate.">{notAccurateText}</option>
    <option value="Information was repetitive or unhelpful.">{repetitiveText}</option>
    <option value="Other">{otherText}</option>
        </select>
        </Center>
        <Text fontSize={{base:"md", md:"lg"}} mb={6} className="text-center">
        {wouldStayText} </Text>
        <Box display="flex" justifyContent="center" mb={4}>
          <Checkbox value="Lower-cost subscription" colorScheme="purple" onChange={handleOfferChange}>{lowerCostText}</Checkbox>
        </Box>
        <Box display="flex" justifyContent="center" mb={4}>
          <Checkbox value="Annual discounted rates" colorScheme="purple" onChange={handleOfferChange}>{annualRatesText}</Checkbox>
        </Box>
        <Box display="flex" justifyContent="center" mb={6}>
          <Checkbox value="Additional premium content" colorScheme="purple" onChange={handleOfferChange}>{additionalContentText}</Checkbox>
        </Box>
        <Center>
        <Button position="fixed" bottom={{md:4}} 
        onClick={handleCancelPlan}
        bg="#3F51B5"
        color="white"
        borderRadius="full"
        w={{base:"full", md:"50%"}}
        mb={3}
        _hover={{ bg: "#32408f" }}
        >
        {cancelPlanText}
        </Button>
        </Center>
    </div>
        </div>
    );
}; 
export default HelpUsImprove;