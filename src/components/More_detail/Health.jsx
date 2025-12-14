import { Box } from "@chakra-ui/react";
import HealthData from "./Health.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Health = () => {
  const { selectedUser } = useProfile();
  const data = HealthData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });
  console.log(data, "health");

  const healthTexts = useMemo(() => [
    "Health Horoscope",
    "If you want to believe in ancient traditions, it is said that astrology and medicine worked together in the early times.",
    "What is astro-medicine?",
    "Today, under the term astromedicine, it is understood as the examination of the birth chart concerning potential weak points, thereby determining possible predispositions to physical and/or mental illnesses. According to astrological teachings, zodiac signs, house positions, planetary positions, and all their aspects are associated with specific parts of the body and organs.",
    "Is illness really in the horoscope?",
    "Astrology consultants, alternative practitioners, or other therapists familiar with astrology may be able to provide health recommendations based on a person's birth chart. Advocates of so-called astromedicine claim that potential predispositions or tendencies towards health disorders can be identified in advance.",
    "Critics are certainly right to emphasize the underestimated danger that merely believing in a supposedly dormant illness can cause much more harm than actual health problems. In individuals who are mentally unstable or prone to hypochondria, examining the personal natal chart for astro-medically indicated health tendencies is undoubtedly harmful, even unacceptable.",
    "Zodiac signs in astro-medicine:",
    "Below, we have compiled some instructions and advice for each zodiac sign, taking into account recommendations from ancient astrological theory and experience. Enjoy!",
    "Health horoscope and astro-medicine for",
    "Recommendations for",
    ":"
  ], []);

  const [
    healthHoroscopeText,
    ancientTraditionsText,
    whatIsAstroMedicineText,
    astromedicineDefinitionText,
    isIllnessInHoroscopeText,
    astrologyConsultantsText,
    criticsText,
    zodiacSignsInAstroMedicineText,
    compiledInstructionsText,
    healthHoroscopeAndAstroMedicineForText,
    recommendationsForText,
    colonText
  ] = useTranslatedTexts(healthTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");
  const recommendationItems = useTranslatedTexts(data[0]?.horoscope?.recommendation || []);

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {healthHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {ancientTraditionsText}
              </p>
              <h2 className="mt-4">{whatIsAstroMedicineText}</h2>
              <p>
                {astromedicineDefinitionText}
              </p>

              <h2 className=" mt-6 font-semibold underline">
                {isIllnessInHoroscopeText}
              </h2>
              <p className="mt-4">
                {astrologyConsultantsText}
              </p>
              <p className="mt-2">
                <p className="mt-4">
                  {criticsText}
                </p>
              </p>

              <h3 className=" mt-8 font-semibold underline">
                {zodiacSignsInAstroMedicineText}
              </h3>
              <p className="">
                {compiledInstructionsText}
              </p>
              <h3 className=" mt-8 font-semibold underline">
              {data[0]?.logo} {healthHoroscopeAndAstroMedicineForText} {data[0]?.sign}{colonText}
              </h3>
              <p className="">{summaryText}</p>

              <h2 className="text-2xl mb-2 mt-4  font-semibold underline">
                {recommendationsForText} {data[0]?.sign}{colonText}
              </h2>
              <ul className="list-disc ml-6 mb-4">
                {recommendationItems.map((item, index) => {
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

export default Health;
