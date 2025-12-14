import { Box } from "@chakra-ui/react";
import HappinesData from "./happiness.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Happiness = () => {
  const { selectedUser } = useProfile();
  const data = HappinesData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  const happinessTexts = useMemo(() => [
    "Horoscope For Happiness",
    "It's a matter of luck. Some have it, others don't. Perhaps many don't perceive their happiness that way or simply aren't willing to do anything for it.",
    "The pessimist moans like crazy when he sprains his ankle. The optimist is glad it's just the leg, and nothing else happened. Which type are you? Are you a soldier of fortune, spoiled by success, or, better said, a person who perpetually complains?",
    "Horoscope for Happiness",
    "Here's how",
    "can spin the wheel of fortune:",
    "Lucky Charms for",
    ":"
  ], []);

  const [
    horoscopeForHappinessText,
    luckMatterText,
    pessimistOptimistText,
    horoscopeForHappinessLabelText,
    heresHowText,
    canSpinText,
    luckyCharmsForText,
    colonText
  ] = useTranslatedTexts(happinessTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");
  const fortuneItems = useTranslatedTexts(data[0]?.horoscope?.fortune || []);
  const charmsItems = useTranslatedTexts(data[0]?.horoscope?.charms || []);

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {horoscopeForHappinessText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {luckMatterText}
              </p>
              <p className="mt-4">
                {pessimistOptimistText}
              </p>

              <h2 className="text-center mt-6 text-2xl font-semibold underline">
                {data[0]?.logo} {data[0]?.sign} {horoscopeForHappinessLabelText}
              </h2>
              <p className="mt-4">{summaryText}</p>
              <h3 className="underline mt-8">
                {heresHowText} {data[0]?.sign} {canSpinText}
              </h3>

              <div>
                {fortuneItems.map((item, index) => {
                  return (
                    <>
                      <p key={index} className="m-1">
                        {item}
                      </p>
                    </>
                  );
                })}
              </div>

              <h2 className="text-xl mt-4 font-semibold underline">
                {luckyCharmsForText} {data[0]?.sign}{colonText}
              </h2>
              <ul className="list-disc ml-6 mb-4">
                {charmsItems.map((item, index) => {
                  return (
                    <>
                      <li key={index}>{item}</li>
                    </>
                  );
                })}
              </ul>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Happiness;