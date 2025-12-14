import { Box } from "@chakra-ui/react";
import { useProfile } from "../../context/Profile";
import SingleData from "./Single.json";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Single = () => {
  const { selectedUser } = useProfile();
  const data = SingleData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  const singleTexts = useMemo(() => [
    "Single Horoscope",
    "Still searching for your suitable partner? Then just read what our horoscope has to say to you. How do others perceive you based on your zodiac sign? Where can you successfully seek love? Are you considered boring, talkative, or attractive by people? The single's horoscope has answers to all these questions, and who knows: you might find a suggestion here on how to convince Cupid to shoot his arrows in the direction of your dream partner.",
    "Single"
  ], []);

  const [
    singleHoroscopeText,
    stillSearchingText,
    singleLabelText
  ] = useTranslatedTexts(singleTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {singleHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {stillSearchingText}
              </p>

              <h2 className="text-center mt-6 text-2xl mb-4 font-semibold underline">
                {data[0]?.logo} {data[0]?.sign} {singleLabelText}
              </h2>
              <p className="mt-4 mb-4">
                {summaryText}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
