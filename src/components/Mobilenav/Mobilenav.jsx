import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../.././../src/assets/logo.png";
import PreminumLogo from "../../assets/preminum.png";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { message } from "antd";
import Profile from "../Profile/Profile";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSign, setSelectedSign] = useState("Aries");
  const [showHoroscope, setShowHoroscope] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleSignChange = (sign) => {
    setSelectedSign(sign);
  };

  const handleHoroscopeToggle = () => {
    setShowHoroscope((prev) => !prev);
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled((prev) => !prev);
  };
  const Habndlesave = () => {
    message.success("Saved successfully");
    onClose();
  };

  return (
    <Box
      backgroundColor="rgba(255, 255, 255, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      color="white"
      className="sm:hidden "
      p={{ md: 4, lg: 3 }}
    >
      <Flex justify="between" align="center">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="bg-[#05102e] rounded text-white text-center">
              Settings
            </ModalHeader>
            <ModalCloseButton className="text-white" />
            <ModalBody className="bg-[#05102e] text-center text-white">
              <div className="">
                <label>Select Your Zodiac Sign:</label>
                <select
                  value={selectedSign}
                  className="text-black"
                  onChange={(e) => handleSignChange(e.target.value)}
                >
                  <option value="Aries">Aries</option>
                  <option value="Taurus">Taurus</option>
                </select>
              </div>

              <div className="mt-5">
                <label>Show Daily Horoscope:</label>
                <input
                  type="checkbox"
                  checked={showHoroscope}
                  onChange={handleHoroscopeToggle}
                />
              </div>

              <div className="mt-5">
                <label>Enable Notifications:</label>
                <input
                  type="checkbox"
                  checked={notificationEnabled}
                  onChange={handleNotificationToggle}
                />
              </div>
            </ModalBody>

            <ModalFooter className="bg-[#05102e] ">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={Habndlesave}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex className=" w-full items-center">
          <Box className="flex gap-2 items-center">
            <Link to={"/home/premium"}>
              <Image
                src={PreminumLogo}
                alt="preminumlogo"
                height={{ base: "35px", lg: "50px", md: "50px" }}
              />
            </Link>
          </Box>
          <Box p="1" className="flex-shrink-0" ml={2}>
            <Link to="/home">
              <Image src={Logo} alt="logo" height={"50px"} />
            </Link>
          </Box>
          
          <Box flex="1" />
          
          <Box className="flex items-center gap-2">
            <Box className="flex items-center">
              <Profile />
            </Box>
            <Box className="flex items-center">
              <LanguageToggle isSimpleButton={true} />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileNav;
