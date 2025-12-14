import { Box } from "@chakra-ui/react";
import CareerData from "./Career.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Career = () => {
  const { selectedUser } = useProfile();
  const data = CareerData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });
  console.log(data, "data carrer");

  const careerTexts = useMemo(() => [
    "Career Horoscope",
    "Few decisions in life are as crucial as choosing a career, considering that we'll spend 1/3 of our lives working. What could be worse than waking up in the morning with the thought that today you have to go to a job you hate? It's not uncommon for the soul to react to a job you dislike with various illnesses at some point",
    "A career horoscope can be of great assistance when it comes to career choices, as the significant step from being a student, apprentice, or professional often shapes the course of one's life. Which profession suits your zodiac sign?",
    "Career horoscope",
    "Typical occupations for",
    "Typical jobs for"
  ], []);

  const [
    careerHoroscopeText,
    fewDecisionsText,
    careerHoroscopeAssistanceText,
    careerHoroscopeLabelText,
    typicalOccupationsForText,
    typicalJobsForText
  ] = useTranslatedTexts(careerTexts);

  const occupationLabel = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra"].includes(selectedUser?.zodiacSign)
    ? `${typicalOccupationsForText} ${data[0]?.sign}:`
    : `${typicalJobsForText} ${data[0]?.sign}`;

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");
  const headText = useTranslatedText(data[0]?.horoscope?.head || "");
  const headDataItems = useTranslatedTexts(data[0]?.horoscope?.headData || []);
  const occupationsText = useTranslatedText(data[0]?.horoscope?.occupations || "");

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {careerHoroscopeText}
          </h2>

          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p>
                {fewDecisionsText}
              </p>
              <h2 className="mt-4">
                {careerHoroscopeAssistanceText}
              </h2>

              <h2 className="text-center mt-6 text-2xl font-semibold underline">
                {data[0]?.logo} {careerHoroscopeLabelText} {data[0]?.sign}
              </h2>
              <p className="mt-4">{summaryText}</p>
              <h3 className=" mt-8 underline">{headText}</h3>
              {headDataItems.map((item, index) => {
                return (
                  <>
                    <p key={index} className="m-1">{item}</p>
                  </>
                );
              })}

              <h3 className="underline">
                {occupationLabel}
              </h3>

              <p className="mb-4">{occupationsText}</p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;