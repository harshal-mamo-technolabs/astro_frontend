import { Box, Circle, Modal, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import "../Horoscope/HoroScope.css";
import AddProfileModal from "./AddProfileModal";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
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
import { useProfile } from "../../context/Profile";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Avatars = () => {
  const { isOpen, onClose } = useDisclosure();
  const [Payprofile, setPayprofile] = useState(false);
  const { setAvatar, avatar } = useProfile();
  const initialRef = useRef(null);
  const toast = useToast();
  const buySuccessText = useTranslatedText("Buy success");

  const zodiacSigns = useMemo(() => [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ], []);

  const translatedZodiacSigns = useTranslatedTexts(zodiacSigns);
  
  const zodiacMap = useMemo(() => {
    const map = {};
    zodiacSigns.forEach((sign, index) => {
      map[sign] = translatedZodiacSigns[index];
    });
    return map;
  }, [zodiacSigns, translatedZodiacSigns]);

  const handleChildClick = () => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box
          color="white"
          p={3}
          className=" bg-custom-gradient font-nunito-light text-center rounded-md"
        >
          {buySuccessText}
        </Box>
      ),
    });
    setPayprofile(true);
  };

  return (
    <Box className=" flex gap-10 lg:block hidden md:block rounded-xl  overflow-x-auto lg:overflow-y-hidden pb-5 p-1  backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md">
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        {Payprofile ? (
          <AddProfileModal />
        ) : (
          <PaymentModal handleChildClick={handleChildClick} />
        )}
      </Modal>

      <Box className="flex gap-4  justify-between font-nunito-light scroll-container ">
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer "
          onClick={() => {
            setAvatar("Aries");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Aries" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacAries className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-3">{zodiacMap["Aries"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer "
          onClick={() => {
            setAvatar("Taurus");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Taurus" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacTaurus className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-2">{zodiacMap["Taurus"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer"
          onClick={() => {
            setAvatar("Gemini");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Gemini" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacGemini className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{zodiacMap["Gemini"]}</p>
        </div>{" "}
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer"
          onClick={() => {
            setAvatar("Cancer");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Cancer" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              {/* <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              /> */}
              <TbZodiacCancer className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{zodiacMap["Cancer"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer"
          onClick={() => {
            setAvatar("Leo");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Leo" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacLeo className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin  text-center">{zodiacMap["Leo"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer"
          onClick={() => {
            setAvatar("Virgo");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Virgo" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacVirgo className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin text-center">{zodiacMap["Virgo"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1  cursor-pointer"
          onClick={() => {
            setAvatar("Libra");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Libra" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacLibra className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin text-center">{zodiacMap["Libra"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer"
          onClick={() => {
            setAvatar("Scorpio");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Scorpio" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacScorpio className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{zodiacMap["Scorpio"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer flex flex-col items-center"
          onClick={() => {
            setAvatar("Sagittarius");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Sagittarius" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacSagittarius className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white font-thin ">{zodiacMap["Sagittarius"]}</p>
        </div>
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer flex flex-col items-center "
          onClick={() => {
            setAvatar("Capricorn");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Capricorn" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacCapricorn className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white font-thin ">{zodiacMap["Capricorn"]}</p>
        </div>{" "}
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer flex flex-col items-center "
          onClick={() => {
            setAvatar("Aquarius");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Aquarius" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacAquarius className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white font-thin">{zodiacMap["Aquarius"]}</p>
        </div>{" "}
        <div
          className="lg:mt-1 mt-2 p-1 cursor-pointer flex flex-col items-center "
          onClick={() => {
            setAvatar("Pisces");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${avatar === "Pisces" && "border-2"}`}
          >
            <Circle
              size="55px"
              color="white"
              bg="#6255d9"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <TbZodiacPisces className="text-4xl" />
            </Circle>
          </Box>
          <p className="text-white font-thin">{zodiacMap["Pisces"]}</p>
        </div>
      </Box>
    </Box>
  );
};

export default Avatars;
