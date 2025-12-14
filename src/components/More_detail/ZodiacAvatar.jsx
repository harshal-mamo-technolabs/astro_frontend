import { Box, Circle } from "@chakra-ui/react";
import "../Horoscope/HoroScope.css";
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
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const ZodiacAvatar = () => {
  const { setAvatar, selectedUser } = useProfile();

  const zodiacSigns = useMemo(
    () => [
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
      "Pisces",
    ],
    []
  );

  const translatedZodiacSigns = useTranslatedTexts(zodiacSigns);
  const zodiacLabelMap = useMemo(() => {
    const map = {};
    zodiacSigns.forEach((sign, index) => {
      map[sign] = translatedZodiacSigns[index];
    });
    return map;
  }, [translatedZodiacSigns, zodiacSigns]);

  const getLabel = (sign) => zodiacLabelMap[sign] || sign;

  return (
    <Box className=" flex gap-10  lg:h-[18.5vh] rounded-xl mt-4 bg-[#05102e] overflow-x-auto lg:overflow-y-hidden p-2  backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md">
      {/* <Box className="flex gap-5 w-[50%]  justify-between items-center font-nunito-light ">
        <div className="lg:mt-1 mt-2 cursor-pointer">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-3">{getLabel("Aries")}</p>
        </div>{" "}
        <div className="lg:mt-1 mt-2 cursor-pointer ">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={TarusLogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-2">taurus</p>
        </div>
        <div className="lg:mt-1 mt-2 cursor-pointer">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={GeminiLogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{getLabel("Gemini")}</p>
        </div>{" "}
        <div className="lg:mt-1 mt-2 cursor-pointer">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
        <div className="lg:mt-1 mt-2 cursor-pointer ">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
        <div className="lg:mt-1 mt-2 cursor-pointer ">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
        <div className="lg:mt-1 mt-2 cursor-pointer ">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
        <div className="lg:mt-1 mt-2 cursor-pointer ">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white  font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
        <div className="mt-2  cursor-pointer lg:hidden">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
        <div className="mt-2 cursor-pointer lg:hidden ">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white font-thin ms-1">{getLabel("Cancer")}</p>
        </div>{" "}
        <div className="mt-2 cursor-pointer lg:hidden">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white font-thin ms-1">{getLabel("Cancer")}</p>
        </div>{" "}
        <div className="mt-2 cursor-pointer lg:hidden">
          <Box w="60px" h="60px" borderRadius="full">
            <Circle
              size="60px"
              color="white"
              bg="#181d45"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
            >
              <Image
                src={ARieslogo}
                borderRadius="full"
                sizes={30}
                className="filter invert brightness-0"
              />
            </Circle>
          </Box>
          <p className="text-white font-thin ms-1">{getLabel("Cancer")}</p>
        </div>
      </Box> */}
      <Box className="flex gap-2  justify-between font-nunito-light scroll-container ">
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
            className={`${selectedUser?.zodiacSign === "Aries" && "border-2"}`}
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
          <p className="text-white  font-thin ms-2">{getLabel("Aries")}</p>
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
            className={`${selectedUser?.zodiacSign === "Taurus" && "border-2"}`}
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
          <p className="text-white  font-thin ms-2">{getLabel("Taurus")}</p>
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
            className={`${selectedUser?.zodiacSign === "Gemini" && "border-2"}`}
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
          <p className="text-white  font-thin ms-1">{getLabel("Gemini")}</p>
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
            className={`${selectedUser?.zodiacSign === "Cancer" && "border-2"}`}
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
          <p className="text-white  font-thin ms-1">{getLabel("Cancer")}</p>
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
            className={`${selectedUser?.zodiacSign === "Leo" && "border-2"}`}
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
          <p className="text-white  font-thin text-center">{getLabel("Leo")}</p>
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
            className={`${selectedUser?.zodiacSign === "Virgo" && "border-2"}`}
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
          <p className="text-white  font-thin text-center">{getLabel("Virgo")}</p>
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
            className={`${selectedUser?.zodiacSign === "Libra" && "border-2"}`}
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
          <p className="text-white  font-thin text-center">{getLabel("Libra")}</p>
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
            className={`${
              selectedUser?.zodiacSign === "Scorpio" && "border-2"
            }`}
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
          <p className="text-white  font-thin ms-1">{getLabel("Scorpio")}</p>
        </div>
        <div
          className="mt-2 p-1   cursor-pointer flex flex-col items-center"
          onClick={() => {
            setAvatar("Sagittarius");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${
              selectedUser?.zodiacSign === "Sagittarius" && "border-2"
            }`}
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
          <p className="text-white font-thin ">{getLabel("Sagittarius")}</p>
        </div>
        <div
          className="mt-2 p-1  cursor-pointer flex flex-col items-center "
          onClick={() => {
            setAvatar("Capricorn");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${
              selectedUser?.zodiacSign === "Capricorn" && "border-2"
            }`}
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
          <p className="text-white font-thin">{getLabel("Capricorn")}</p>
        </div>{" "}
        <div
          className="mt-2 p-1  cursor-pointer "
          onClick={() => {
            setAvatar("Aquarius");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${
              selectedUser?.zodiacSign === "Aquarius" && "border-2"
            }`}
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
          <p className="text-white font-thin ms-1">{getLabel("Aquarius")}</p>
        </div>{" "}
        <div
          className="mt-2 p-1  cursor-pointer "
          onClick={() => {
            setAvatar("Pisces");
          }}
        >
          <Box
            w="60px"
            h="60px"
            borderRadius="full"
            className={`${selectedUser?.zodiacSign === "Pisces" && "border-2"}`}
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
          <p className="text-white font-thin ms-1">{getLabel("Pisces")}</p>
        </div>
      </Box>
    </Box>
  );
};

export default ZodiacAvatar;
