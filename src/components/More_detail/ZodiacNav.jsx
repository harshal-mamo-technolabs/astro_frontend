import {
  Box,
  ButtonGroup,
  Flex,
  Image,
 
  Menu,
 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../.././../src/assets/logo.png";
import PreminumLogo from "../../assets/preminum.png";
import { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import axios from "axios";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const ZodiacNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showPremiumCrown, setShowPremiumCrown] = useState(true);
  const premiumText = useTranslatedText("Premium");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}subscriptions/v2`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.success) {
          setShowPremiumCrown(false);
        } else {
          setShowPremiumCrown(true);
        }
      })
      .catch(() => setShowPremiumCrown(true));
  }, []);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };
 
  return (
    <Box
      backgroundColor="rgba(255, 255, 255, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      color="white"
      p={{ md: 4, lg: 3, base: 2 }}
    >
      <Flex justify="between" align="center">
        <Flex className=" w-full items-center">
          <Box className="flex gap-2 items-center">
            {showPremiumCrown && (
              <Link to={"/home/premium"}>
                <Image
                  src={PreminumLogo}
                  alt="preminumlogo"
                  height={{ base: "35px", lg: "50px", md: "50px" }}
                />
              </Link>
            )}
          </Box>
          <Box p="1" flex="0 0 auto" ml={2}>
            <Link to="/home">
              <Image src={Logo} alt="logo" height={"50px"} />
            </Link>
          </Box>

          <Box flex="1" />

          <Menu
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
            autoFocus={false}
            onBlur={() => {}}
          >
            <ButtonGroup gap={{ base: 1.5, md: 5, lg: 5 }} className="mt-2 flex items-center">
              <Box className="z-10">
                <Profile />
              </Box>
              <Box className="z-10">
                <LanguageToggle isSimpleButton={true} />
              </Box>
            </ButtonGroup>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ZodiacNav;
