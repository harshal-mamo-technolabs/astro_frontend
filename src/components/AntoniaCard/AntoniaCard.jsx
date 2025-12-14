import { Center } from "@chakra-ui/react";
import CardButton from "../CardButton/index";
import { Link } from "react-router-dom";
import { useProfile } from "../../context/Profile";
import { useContext, useMemo } from "react";
import { CardContext } from "../../context/CardsDataContext";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import {
  TbZodiacGemini,
  TbZodiacTaurus,
  TbZodiacAries,
  TbZodiacAquarius,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacVirgo,
  TbZodiacCancer,
  TbZodiacCapricorn,
} from "react-icons/tb";

const AntoniaCard = ({ date, buttonText }) => {
  const { selectedUser } = useProfile();
  const { fullprofile } = useContext(CardContext);

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

  let zodiacSignIcon;

  switch (selectedUser?.zodiacSign) {
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

  return (
    <div className=" flex flex-col font-nunito-light rounded-lg text-white justify-evenly w-[100%] lg:w-[23vw] lg:ms-4 bg-[#29286c] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md overflow-hidden shadow-lg ">
      <div className=" text-center">
        <div className="font-normal text-3xl">
          {selectedUser?.name ? selectedUser?.name : fullprofile?.name}
        </div>
        <p className="text-xl text-[#8a29db]">{date ? date : ""}</p>
      </div>
      <div className="flex  flex-col justify-center align-middle items-center  ">
        {zodiacSignIcon}
        <p>
          {zodiacMap[selectedUser?.you
            ? fullprofile?.zodiacSign
            : selectedUser?.zodiacSign] || (selectedUser?.you
            ? fullprofile?.zodiacSign
            : selectedUser?.zodiacSign)}
        </p>
      </div>
      <Center>
        <div className="lg:px-6  lg:py-4 m-2 lg:w-11/12 w-2/4 md:w-5/6 flex justify-center text-lg ">
          {/* Updated the Link path */}
          <Link to="/home/detail/annual" className="w-[100%]">
            <CardButton>{buttonText}</CardButton>
          </Link>
        </div>
      </Center>
    </div>
  );
};

export default AntoniaCard;