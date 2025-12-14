import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import SignHeader from "../components/More_detail/SignHeader";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import ProfileList from "../components/Avatars/ProfileList";
import bg from "./../assets/bg.mp4";

const ZoiacSign = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Box className=" w-full min-h-screen">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full min-h-screen h-full fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <Box className="lg:p-3 ">
        <Navbar />
      </Box>{" "}
      <span className="lg:hidden md:hidden">
        <ZodiacNav />
      </span>{" "}
      <span className="lg:hidden">
        <ProfileList />
      </span>
      <SignHeader />
      <Outlet />
    </Box>
  );
};

export default ZoiacSign;
