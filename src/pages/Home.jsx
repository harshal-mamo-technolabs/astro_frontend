import AntoniaCard from "../components/AntoniaCard";
import Navbar from "../components/Navbar";
import Avatars from "../components/Avatars/index";
import Horoscope from "../components/Horoscope";
import Service from "../components/Service";
import Footer from "../components/Footer";
import ARieslogo from "../assets/Aries-01.png";
import bg from "../assets/bg.mp4";
import { Box, Flex } from "@chakra-ui/react";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { CardContext } from "../context/CardsDataContext";
import { useProfile } from "../context/Profile";
import ProfileList from "../components/Avatars/ProfileList";
import LanguageToggle from "../components/LanguageToggle/LanguageToggle";
import { useTranslatedTexts } from "../hooks/useTranslatedText";

const Home = () => {
  const { fullprofile } = useContext(CardContext);
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    const maybeVerify = async () => {
      try {
        if (token) {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}users/verify-token`,
            { token },
            { withCredentials: true }
          );
        }
      } catch (err) {
        console.error("[Home] Token verification failed:", err?.response?.data || err?.message);
      } finally {
        setVerifying(false);
      }
    };
    maybeVerify();
  }, [searchParams]);

  console.log("fullprofile", fullprofile);
  const { selectedUser } = useProfile();
  
  const homePageTexts = useMemo(() => [
    "Guest",
    "More Details"
  ], []);
  
  const [guestText, moreDetailsText] = useTranslatedTexts(homePageTexts);
  
  if (verifying) return null;

  return (
    <>
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          className="object-cover w-full min-h-screen h-full fixed top-0 left-0 z-[-1]"
        >
          <source src={bg} type="video/mp4" />
        </video>
        <Box className="lg:p-3">
          <Navbar />
          <span className="lg:hidden md:hidden">
            <ZodiacNav />
          </span>{" "}
          <span className="lg:hidden md:hidden">
            <ProfileList />
          </span>
          <Flex justifyContent={"center"} mt={10} className="w-[100%] ">
            <Box className=" flex flex-col lg:flex-row md:flex-row gap-3  lg:w-[95%] ms:w-[95%] w-[90%] ">
              <AntoniaCard
                title={
                  selectedUser?.name ? selectedUser?.name : fullprofile?.name
                }
                date={
                  selectedUser?.day
                    ? `${selectedUser.day}-${selectedUser.month}-${selectedUser.year}`
                    : fullprofile?.day
                      ? `${fullprofile.day}-${fullprofile.month}-${fullprofile.year}`
                      : guestText
                }
                imageUrl={ARieslogo}
                buttonText={moreDetailsText}
              />
              <span className="lg:hidden md:hidden">
                <ZodiacAvatar />
              </span>
              <Box
                className=" flex flex-col gap-3 "
                w={{ base: "100%", sm: "63%", lg: "70%" }}
              >
                <Avatars />

                <Box className="bg-blue-900 h-full  lg:w-[100%]">
                  <Horoscope />
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Service />
          <Footer />
        </Box>
      </div>
    </>
  );
};

export default Home;
