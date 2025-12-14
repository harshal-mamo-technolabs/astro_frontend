import { Box } from "@chakra-ui/react";
import AnuualData from "./AnnualHoroscope.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const General = () => {
  const { selectedUser } = useProfile();
  const data = AnuualData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });
  console.log("Filtered Data:", data[0]);

  const generalTexts = useMemo(() => [
    "Annual Horoscope",
    "ANNUAL HOROSCOPE FOR 2026:",
    "Love:",
    "Love and Partnership:",
    "Career and Finances:",
    "Fitness and Health:",
    "Best Months for",
    "in 2026:",
    "Your",
    "Talisman for 2026:"
  ], []);

  const [
    annualHoroscopeText,
    annualHoroscopeFor2026Text,
    loveText,
    loveAndPartnershipText,
    careerAndFinancesText,
    fitnessAndHealthText,
    bestMonthsForText,
    in2026Text,
    yourText,
    talismanFor2026Text
  ] = useTranslatedTexts(generalTexts);

  const loveLabel = selectedUser?.zodiacSign === "Aries" ? loveText : loveAndPartnershipText;

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");
  const loveAndPartnershipContent = useTranslatedText(data[0]?.horoscope?.loveAndPartnership || "");
  const careerAndFinancesContent = useTranslatedText(data[0]?.horoscope?.careerAndFinances || "");
  const fitnessAndHealthContent = useTranslatedText(data[0]?.horoscope?.fitnessAndHealth || "");
  const talismanText = useTranslatedText(data[0]?.talisman || "");

  return (
    <Box>
      <div>
        <div className="flex justify-center text-white">
          <div className="mt-5">
            <h2 className="text-center text-4xl  text-white font-nunito-light">
              {annualHoroscopeText}
            </h2>
            <div className="flex justify-center text-xl align-middle mt-10">
              <Box className="w-[90%]">
                <h2 className="text-center mb-4 text-2xl font-semibold underline">
                  {data[0]?.logo} {annualHoroscopeFor2026Text} {data[0]?.sign}
                </h2>
                
                <p>
                  {summaryText}
                </p>
                <h3 className="mt-4 underline">
                  {loveLabel}
                </h3>
                <p>
                  {loveAndPartnershipContent}
                </p>
                <h3 className="mt-4 underline">{careerAndFinancesText}</h3>
                <p>
                  {careerAndFinancesContent}
                </p>
                <h3 className="mt-4 underline">{fitnessAndHealthText}</h3>
                <p>
                  {fitnessAndHealthContent}
                </p>

                <p className="mt-4 underline">
                  {bestMonthsForText} {data[0]?.sign} {in2026Text}
                </p>
                <p>{data[0]?.bestMonths?.join(", ")}</p>

                <p className="mt-4 underline">
                  {yourText} {data[0]?.sign} {talismanFor2026Text}
                </p>
                <p>
                  {talismanText}
                </p>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-5  p-2">
        {/* <Box
        className="text-black bg-white rounded-sm p-2"
        h={"10rem"}
        w={500}
      >
        <ul className="font-bold text-xl">
          <h2 className="text-center">Legand for Natal Chart</h2>
          <li className="flex gap-2">
            <BsMoonStars />
            <p>sdds</p>
          </li>
          <li className="flex gap-2">
            {" "}
            <BsMoonStars />
            <p>sdds</p>
          </li>
          <li className="flex gap-2">
            {" "}
            <BsMoonStars />
            <p>sdds</p>
          </li>
          <li className="flex gap-2">
            {" "}
            <BsMoonStars />
            <p>sdds</p>
          </li>
        </ul>
      </Box> */}
      </div>
    </Box>
  );
};

export default General;