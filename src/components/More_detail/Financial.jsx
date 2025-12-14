import { Box } from "@chakra-ui/react";
import { useProfile } from "../../context/Profile";
import finicialData from "./Finicial.json";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Financial = () => {
  const { selectedUser } = useProfile();
  const data = finicialData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  const financialTexts = useMemo(() => [
    "Financial Horoscope",
    "Whether someone has a predisposition for money and whether they will become wealthy during their lifetime or remain forever poor is something astrology can reveal through the so-called existential axis in the horoscope. If you want to shed some light on why your wallet is always chronically empty, you might want to examine or have your very personal birth chart reviewed with regard to the axis of existence.",
    "Existence Axis in the Natal Chart",
    "Astrological theory of experience claims that the connection between the second and eighth houses, which are directly opposite in the birth chart, forms the so-called existence axis . The second house in the horoscope symbolizes wealth and material possessions. At the same time, however, it also advocates the self-esteem and security needs of the person in question. The eighth house symbolizes, among other things, other people's money but also shared money Here, astrological teachings seek indications of financial dependence, for example. Traces of potential inheritances should also be found here.",
    "Material security or a hand-to-mouth existence?",
    "When interpreting the existence axis the zodiac signs in which the cusps of the second and eighth houses are located are also taken into account. Usually, the following zodiac sign is considered. This way, astrology looks for clues about how the relevant person deals with the topic of money and finances. Additionally, astrological interpretation explores whether and which planetary influences can be found in the second and eighth houses.",
    "Saturn in the 8th House: No Gain Without Diligence",
    "For example, if the party pooper Saturn is in the eighth house in the natal chart, astrology will likely assume, with a high degree of certainty, that significant opportunities for other people's money are not expected here. Anyone with such birth conditions expecting an inheritance from a wealthy uncle in America or hoping to catch a millionaire is likely to be disappointed. Financial security from a partner is also unlikely. Saturn doesn't give gifts - rewards come through one's own hard work. Saturn in the 8th house always demands readiness for hard work, and a certain level of frugality is a prerequisite. In this case, from an astrological perspective, the individual will have to reconcile with earning a living. However, dedication and effort will ultimately be rewarded, and the person in question will be able to reap a suitable harvest for their labor.",
    "Zodiac Signs and Precious Money",
    "Are you a money fox, a miser, or do you have what it takes to become a millionaire? Just see what your zodiac sign can do when it comes to money and finances. Keep in mind that such a general task, which only relates to the sun sign, cannot have any real meaning and should be considered as entertainment. Enjoy reading!",
    "Financial Horoscope"
  ], []);

  const [
    financialHoroscopeText,
    whetherSomeoneText,
    existenceAxisText,
    astrologicalTheoryText,
    materialSecurityText,
    whenInterpretingText,
    saturnIn8thHouseText,
    saturnExampleText,
    zodiacSignsAndPreciousMoneyText,
    areYouMoneyFoxText,
    financialHoroscopeLabelText
  ] = useTranslatedTexts(financialTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {financialHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {whetherSomeoneText}
              </p>

              <h2 className=" mt-6 font-semibold underline">
                {existenceAxisText}
              </h2>
              <p className="mt-4">
                {astrologicalTheoryText}
              </p>
              <h3 className="underline mt-8">
                {materialSecurityText}
              </h3>
              <p className="">
                {whenInterpretingText}
              </p>
              <h3 className="underline mt-8">
                {saturnIn8thHouseText}
              </h3>
              <p className="">
                {saturnExampleText}
              </p>

              <h3 className="underline mt-8">
                {zodiacSignsAndPreciousMoneyText}
              </h3>
              <p className="mb-10">
                {areYouMoneyFoxText}
              </p>
              <h3 className="underline mt-8 text-center mb-4 text-2xl">
              {data[0]?.logo} {financialHoroscopeLabelText} {data[0]?.sign}
              </h3>
              <p className="mb-10">
                {summaryText}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financial;
