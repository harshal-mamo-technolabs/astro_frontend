import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Center, Divider, Text,  Button,  Modal,
  ModalOverlay,  useDisclosure, } from "@chakra-ui/react";
        //ModalContent, ModalBody, Modal, ModalOverlay, useDisclosure, Button } from "@chakra-ui/react";
//import { AiOutlineRight } from "react-icons/ai";
//import { useContext } from "react";
import { useProfile } from "../context/Profile";
import AddPartnerModal from "../components/AddPartnermodal";
//import { CardContext } from "../../context/CardsDataContext";
import ChangeProfileModal from "../components/ChangeProfilePlan/ChangeProfileModal";
import ProfilePlanPurchaseModal from "../components/ProfilePlanPurchaseModal";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const NewProfilePage = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
   const { Payprofile} = useProfile();
  // const { fullprofile } = useContext(CardContext);
     const { isOpen, onOpen, onClose } = useDisclosure();

  // Translations
  const profilePlanText = useTranslatedText("Profile Plan");
  const noActiveSubscriptionText = useTranslatedText("You have no active profile subscriptions !");
  const addNewProfileText = useTranslatedText("Add New Profile");
  const needAssistanceText = useTranslatedText("Need Assistance?");
  const contactSupportText = useTranslatedText("Contact support");
  const helpManagingAccountText = useTranslatedText("for help with managing your account.");
    //const handleCancelPlan = () => {
      // Add your cancel logic here
    //  console.log("Plan canceled!");
    //  onClose();
    //};

    return(
        <div className="min-h-screen font-nunito-light text-white bg-gradient-to-r from-indigo-700 to-purple-600">
          <div className="p-2">
          <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
        <LeftOutlined
          className="lg:mt-2 mt-2  cursor-pointer "
          onClick={() => navigate(-1)}
        />
        <div className="flex justify-center w-full me-4 lg:me-6">
          <h2>{profilePlanText}</h2>
        </div>
      </div>
    </div>
    <div className="p-2">
    <Center>
    <Box mt={{ base: "30vh", md: "15vh" }}>    
    <Text fontSize={{base:"lg", md:"xl"}} fontStyle="bold">
    {noActiveSubscriptionText}
  </Text>
  </Box>
  </Center>
  </div>
    <div>
        <Box position="fixed" bottom={0} px={2} textAlign="center" w={{ base: "100%", md: "full" }} mb="3">
        <Button
        bg="#32408f"
        color="white"
        w={{base: "full", md: "50%"}}
        mb={3}
        _hover={{ bg: "#5f53d4" }}
        onClick={onOpen}
        >
        {addNewProfileText}
      </Button>
  
            <Divider/>
            <Text fontSize="sm" m="3">
                {needAssistanceText}{" "}
                <Link to="/home/support"> 
                <span className="underline cursor-pointer"> {contactSupportText} </span></Link>{" "}
                {helpManagingAccountText}
            </Text>
        </Box>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ProfilePlanPurchaseModal onClose={onClose} />
      </Modal>

        </div>
    );
}; 
export default NewProfilePage;