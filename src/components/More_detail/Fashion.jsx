import { Box } from "@chakra-ui/react";
import fashionData from "./Fashion.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Fashion = () => {
  const { selectedUser } = useProfile();
  const data = fashionData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  console.log("Filtered Data:", selectedUser);

  const fashionTexts = useMemo(() => [
    "Fashion Horoscope",
    "As you know, tastes vary. But could it be that people born under the same zodiac sign also have similar ideas when it comes to choosing their clothing? Astrology doesn't remain silent on this topic and attributes very specific characteristics to each zodiac sign when it comes to fashion.",
    "Fashion horoscope"
  ], []);

  const [
    fashionHoroscopeText,
    asYouKnowText,
    fashionHoroscopeLabelText
  ] = useTranslatedTexts(fashionTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {fashionHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p>
                {asYouKnowText}
              </p>
              <h2 className="text-center mt-6 text-2xl font-semibold underline">
              {data[0]?.logo} {fashionHoroscopeLabelText} {data[0]?.sign}
              </h2>
              <p className="mt-4 mb-4">{summaryText}</p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fashion;
