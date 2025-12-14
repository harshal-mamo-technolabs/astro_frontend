import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Circle, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../../context/CardsDataContext";
import { useProfile } from "../../context/Profile";
import Navbar from "../Navbar/Navbar";
import ZodiacNav from "../More_detail/ZodiacNav";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const SynastryPage = () => {
  const navigate = useNavigate();
  const { fullprofile } = useContext(CardContext);
  const { getZodiacImage } = useProfile();

  const synastryPageTexts = useMemo(() => [
    "Compatibility",
    "Check your love compatibility",
    "Add your partner to see the result",
    "You",
    "Partner"
  ], []);

  const [compatibilityText, checkCompatibilityText, addPartnerText, youText, partnerText] = useTranslatedTexts(synastryPageTexts);
  return (
    <div
      className=" min-h-screen text-white"
      style={{ background: "linear-gradient(to right, #070d2d, #071b58)" }}
    >
      <Box className="lg:p-3">
        <Navbar />
      </Box>

      <span className="lg:hidden md:hidden">
        <ZodiacNav />
      </span>
      <div className="flex gap-3 text-2xl lg:text-3xl p-3  text-white ">
        <ArrowLeftOutlined
          className="mt-1 cursor-pointer"
          onClick={() => navigate("/home")}
        />
        <div className=" w-full flex justify-center me-6">
          <h2>{compatibilityText}</h2>
        </div>
      </div>

      <div className=" gap-5 flex justify-center flex-col items-center mt-20">
        <div>
          <h2 className=" font-semibold font-nunito-light text-2xl">
            {checkCompatibilityText}
          </h2>
          <p className="text-center font-nunito-light text-[#8f8cb3]">
            {addPartnerText}{" "}
          </p>
        </div>
        <div className="flex items-center gap-10">
          <div>
            <div>
              <Image
                src={getZodiacImage(fullprofile?.zodiacSign)}
                borderRadius="full"
                boxSize="100px"
                border={"2px solid blue"}
                objectFit="cover"
                alt={fullprofile?.zodiacSign}
              />
            </div>
            <div>
              <h2 className="text-center mt-2">{youText}</h2>
            </div>
          </div>

          <AddIcon className="text-[#8f8cb3] " />
          <div>
            <div className="">
              <Link to="/synastrypage/partner">
                <Circle
                  className="border-dashed border-2 border-[#8f8cb3]"
                  size="110px"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                >
                  <div className="bg-white rounded-full">
                    <PlusOutlined className=" text-[#071b58]  p-4   " />
                  </div>
                </Circle>
              </Link>
            </div>
            <div>
              <h2 className="text-center mt-2">{partnerText}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynastryPage;
