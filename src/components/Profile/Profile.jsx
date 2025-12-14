import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  theme,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../Horoscope/HoroScope.css";
import { Popover, Spin, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { CardContext } from "../../context/CardsDataContext";
import axios from "axios";
import { useProfile } from "../../context/Profile";
import { useTranslatedText } from "../../hooks/useTranslatedText";
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";

const content = (
  <div className="text-xl flex  flex-col m-2 p-2 gap-4">
    <Link to="/home/paymentTerms">
      {" "}
      <p>Payment terms</p>
    </Link>
    <Link to={"/home/membershipterms"}>
      {" "}
      <p>Membership terms</p>
    </Link>
    {/* <Link to={"/home/moneybackpolicy"}>
      {" "}
      <p>Money back policy</p>
    </Link> */}
    {/* <Link to={"/home/cancelsubscription"}>
      {" "}
      <p>Cancel subscription</p>
    </Link> */}
    <Link to="/home/support">
      {" "}
      <p>Contact us</p>
    </Link>
  </div>
);
const Profile = () => {
  const { fullprofile, setLoginUser, login, setFullprofile } =
    useContext(CardContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { setFriendslist, setSelectedUser } = useProfile();
  const [showPremiumCrown, setShowPremiumCrown] = useState(true);

  // Translations
  const myProfileText = useTranslatedText("My Profile");
  const guestText = useTranslatedText("Guest");
  const unlockAllFeaturesText = useTranslatedText("Unlock All Features");
  const settingsText = useTranslatedText("Settings");
  const profileListText = useTranslatedText("Profile List");
  const logoutText = useTranslatedText("Logout");
  const loginText = useTranslatedText("Login");
  const logoutSuccessText = useTranslatedText("Logout success");
  const somethingWentWrongText = useTranslatedText("something went wrong");

  let zodiacSignIcon;

  switch (fullprofile?.zodiacSign) {
    case "Gemini":
      zodiacSignIcon = <TbZodiacGemini className="text-8xl" />;
      break;
    case "Aries":
      zodiacSignIcon = <TbZodiacAries className="text-8xl" />;
      break;
    case "Taurus":
      zodiacSignIcon = <TbZodiacTaurus className="text-8xl" />;
      break;
    case "Cancer":
      zodiacSignIcon = <TbZodiacCancer className="text-8xl" />;
      break;
    case "Leo":
      zodiacSignIcon = <TbZodiacLeo className="text-8xl" />;
      break;
    case "Virgo":
      zodiacSignIcon = <TbZodiacVirgo className="text-8xl" />;
      break;
    case "Libra":
      zodiacSignIcon = <TbZodiacLibra className="text-8xl" />;
      break;
    case "Scorpio":
      zodiacSignIcon = <TbZodiacScorpio className="text-8xl" />;
      break;
    case "Sagittarius":
      zodiacSignIcon = <TbZodiacSagittarius className="text-8xl" />;
      break;
    case "Capricorn":
      zodiacSignIcon = <TbZodiacCapricorn className="text-8xl" />;
      break;
    case "Aquarius":
      zodiacSignIcon = <TbZodiacAquarius className="text-8xl" />;
      break;
    case "Pisces":
      zodiacSignIcon = <TbZodiacPisces className="text-8xl" />;
      break;
    default:
      zodiacSignIcon = <TbZodiacAries className="text-8xl" />;
      break;
  }
  console.log(login, "login");
  console.log(fullprofile, "fullprofile");
  console.log("a dnjdhvnnjgnjrmgktkhomkohjmkyojmkoyjmkoyjmkoymijthijtrij")
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}users/logout`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setLoginUser({});
        setFullprofile({});
        setFriendslist([]);
        setSelectedUser({});
        message.success(logoutSuccessText);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        message.error(somethingWentWrongText);
        setLoading(false);
      });
  };

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

  return (
    <Menu
      isOpen={isMenuOpen}
      onClose={handleMenuClose}
      autoFocus={false}
      onBlur={() => { }}
    >
      <Spin spinning={loading} />
      <Flex
        onClick={handleMenuToggle}
        className=" h-full flex flex-col justify-center cursor-pointer item-center relative lg:bottom-3"
      >
        <MenuButton
          aria-label="Options"
          className="rounded-full hidden"
          icon={
            <Avatar
              bg="#5f53d3"
              height={{ base: "40px", lg: "50px", md: "50px" }}
            />
          }
          bg="transparent"
          _hover={{
            bg: "none",
          }}
          _focus={{
            boxShadow: "none",
          }}
        />
        <div className="flex mt-1 flex-col justify-center items-center">
          <Avatar
            name={login && fullprofile?.name}
            bg="#6255d9"
            textColor={"white"}
          />
          <Text mt={2} className="cursor-pointer flex gap-2 ">
            {myProfileText}
          </Text>
        </div>
      </Flex>

      <MenuList
        style={{
          marginTop: "60px",
          background: "linear-gradient(to right, #4F46E5, #9F7AEA)",
        }}
        m={2}
        overflowY="scroll"
        padding="20px"
        sx={{
          "&::-webkit-scrollbar": { width: "3px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "white",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.colors.purple[500],
          },
        }}
        h={{ base: "fit", md: "fit", lg: "80vh" }}
        // w={{ base: "65vw", md: "50vw" }}
        w={{ base: "350px", lg: "400px" }}
        p={3}
      >
        <Flex justifyContent={"center"} m={2}>
          <Box className="bg-[#33175b] p-3 h-2/3 flex justify-evenly text-white mt-5 rounded-md">
            <div>{zodiacSignIcon}</div>
            <div>
              <p className="md:text-2xl lg:text-3xl">
                {login ? fullprofile?.name : guestText}
              </p>
              <p className="text-[#8a26d8] text-xl">
                {fullprofile?.name
                  ? `${fullprofile.day}.${fullprofile.month}.${fullprofile.year}`
                  : guestText}
              </p>
              <p className="mt-10 invisible">Lorem ipsum, dolor sit amet</p>
            </div>
          </Box>
        </Flex>
        <Center>
          <div className="relative top-3 w-full m-2">
            <Divider />
          </div>
        </Center>
        {/*
        <MenuItem bg="transparent">
          <Link to="/account" className="w-full  mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-xl">My Account</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        */}
        {/* <MenuItem bg="transparent">
          <Link to="/refer" className="w-full  mt-2">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-xl">Refer a friend</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem> */}
        {showPremiumCrown && (
          <MenuItem bg="transparent">
            <Link to="/home/premium" className="w-full mt-2">
              <Box className="flex justify-between w-full">
                <div>
                  <Text className="text-[#f8e9e9] text-xl">
                    {unlockAllFeaturesText}
                  </Text>
                </div>
                <div>
                  <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
                </div>
              </Box>
            </Link>
          </MenuItem>
        )}
        <MenuItem bg="transparent">
          <Link to="/settings" className="w-full">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-xl">
                  {settingsText}
                </Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        {/*
        <MenuItem bg="transparent">
          <Link to="/verify" className="w-full  ">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-xl">Verify Email</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent">
          <Link to="/subscription/changePayment" className="w-full  ">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-xl">Change Payment Details</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        */}
        
        <MenuItem bg="transparent">
          <Link to="/home/profilelist" className="w-full">
            <Box className="flex justify-between w-full">
              <div>
                <Text className="text-[#f8e9e9] text-xl">{profileListText}</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        {/*
        <Center>
          <div className="relative top-5 w-full ">
            <Divider />
          </div>
        </Center>
        <br />
        <MenuItem bg={"transparent"}>
          <Link to="/privacy" className=" w-full">
            <Box className=" flex justify-between ">
              <div>
                <Text className="text-[#f8e9e9] text-xl">Privacy</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem bg={"transparent"}>
          <Box className="flex justify-between w-full">
            <Popover
              content={content}
              trigger="click"
              className="flex justify-between w-full"
              onClick={(e) => {
                e?.stopPropagation();
              }}
            >
              <div>
                <Text className="text-[#f8e9e9] text-xl">Terms of Use</Text>
              </div>
              <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
            </Popover>
          </Box>
        </MenuItem>
        <MenuItem bg={"transparent"}>
          <Link to="/home/support" className=" w-full">
            <Box className=" flex justify-between ">
              <div>
                <Text className="text-[#f8e9e9] text-xl">Support</Text>
              </div>
              <div>
                <AiOutlineRight className="text-3xl cursor-pointer text-[white]" />
              </div>
            </Box>
          </Link>
        </MenuItem>
        <br />
        */}
        <MenuItem bg={"transparent"}>
          <Box className=" w-full">
            <div>
              {fullprofile?.name ? (
                <Text
                  className="text-red-500 font-bold text-xl text-center"
                  onClick={handleLogout}
                >
                  {logoutText}
                </Text>
              ) : (
                <p className=" text-center">
                  <Link
                    to="/login"
                    className=" font-bold text-xl text-center w-full "
                  >
                    {loginText}
                  </Link>
                </p>
              )}
            </div>
          </Box>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
