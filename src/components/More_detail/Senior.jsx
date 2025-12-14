import { Box } from "@chakra-ui/react";
import { useProfile } from "../../context/Profile";
import SeniorData from "./senior.json";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Senior = () => {
  const { selectedUser } = useProfile();
  const data = SeniorData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  const seniorTexts = useMemo(() => [
    "Horoscope For Senior Citizens",
    "In the vernacular, it is said, You're as young as you feel, or No one has leased eternal youth But does that really apply to everyone? The fact is: no one is like another. Astrology claims that the quality of old age is also related to the zodiac sign. What does your zodiac sign expect in old age?",
    "Senior citizens Horoscope for"
  ], []);

  const [
    horoscopeForSeniorCitizensText,
    inTheVernacularText,
    seniorCitizensHoroscopeForText
  ] = useTranslatedTexts(seniorTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {horoscopeForSeniorCitizensText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {inTheVernacularText}
              </p>

              <h2 className="text-center mt-6 text-2xl font-semibold underline">
                {data[0]?.logo} {seniorCitizensHoroscopeForText} {data[0]?.sign}
              </h2>
              <p className="mt-4">
                {summaryText}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Senior;