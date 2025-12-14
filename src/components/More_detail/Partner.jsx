import { Box } from "@chakra-ui/react";
import PartnerData from "./Partner.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Partner = () => {
  const { selectedUser } = useProfile();
  const data = PartnerData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  const partnerTexts = useMemo(() => [
    "Partner Horoscope",
    "The partner horoscope should provide information about how two people harmonize, understand each other, what connects them, and areas where there might be issues. Astrology considers the exact birth dates of both partners and examines them with very specific methods. These methods for comparing partners include the so-called composite and synastry horoscopes. The following descriptions only relate to the corresponding zodiac signs and therefore cannot provide information about who fits together and who does not. Therefore, read everything with a bit of distance and a good dose of humor in the background of entertaining astrology.",
    "However, we don't want to miss the opportunity to take you on a little journey through the world of partnership and relationships based on your zodiac sign and the basic energies associated with it. So, we warmly invite you to be inspired, improvise, and feel which parts of your being can influence you and your partner.",
    "We wish you all the best in love, regardless of which zodiac sign you are and whoever you are in a relationship with!",
    "Partner Horoscope"
  ], []);

  const [
    partnerHoroscopeText,
    partnerHoroscopeIntroText,
    partnerHoroscopeJourneyText,
    partnerHoroscopeWishText,
    partnerHoroscopeLabelText
  ] = useTranslatedTexts(partnerTexts);

  // Translate dynamic content from JSON
  const summaryItems = useTranslatedTexts(data[0]?.horoscope?.summary || []);

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {partnerHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {partnerHoroscopeIntroText}
              </p>
              <p className="mt-4">
                {partnerHoroscopeJourneyText}
              </p>
              <p className="mt-4">
                {partnerHoroscopeWishText}
              </p>
              <h2 className="text-center mt-6 text-2xl mb-4 font-semibold underline">
                {data[0]?.logo} {data[0]?.sign} {partnerHoroscopeLabelText}
              </h2>
              {/* <p className="mt-4">
                Aries, like Leo and Sagittarius, belongs to the fire element.
                They love being in the spotlight and exude energy and patience.
                Aries goes straight to their goal without detours—also in love.
                They like to set the tone in relationships and want an adaptable
                partner.
              </p>
              <h3 className="underline mt-8">
                Love and relationship, eroticism and adventure - who is right
                for Aries?{" "}
              </h3>
              <p className="">
                Aries and Aries compete with each other, which can be exciting.
                The relationship between two such spontaneous, fiery minds can
                be quite exhausting in the long run, as both always want to be
                the fastest and first to reach their goals. With such complex
                temperaments in a relationship, there&apos;s certainly no
                boredom.
              </p>
              <p className="mt-4 mb-2">
                Aries and Taurus should give it a try. Although grounded Taurus
                can be a real stubborn person, something Aries is likely not to
                appreciate, Aries will benefit from the comfort and calmness
                that Taurus brings into their life. The relationship between
                these two zodiac signs has a realistic chance of lasting.
              </p>
              <p className="mt-4 mb-2">
                Aries and Gemini don&apos;t know boredom, and chemistry usually
                happens immediately. Born in Gemini can even turn out to be the
                ideal dream partner for Aries, as they know how to keep the love
                fire burning.
              </p>{" "}
              <p className="mt-4 mb-2">
                Aries and Cancer may not always find it easy together. However,
                this relationship can work because, as they say, opposites
                attract. Aries may not always fully understand Cancers, but they
                will surely appreciate them. The sensitive Cancer is also
                excellent at awakening the romantic side in Aries.
              </p>{" "}
              <p className="mt-4 mb-2">
                Aries and Leo can have a lot of fun together, but they can also
                have sparks flying. Here, two fiery signs, strong-willed and
                passionate, come together. Love at first sight is not uncommon
                for these two zodiac signs. In everyday life, however, a
                willingness to compromise will always be needed on both sides.
              </p>{" "}
              <p className="mt-4 mb-2">
                Aries and Pisces have good chances of a functioning relationship
                only if Pisces is willing to adapt and submit to the power of
                Aries. But it&apos;s usually not difficult for Aries. If Aries
                manages to occasionally get involved in the dream world of
                Pisces, then nothing stands in the way of such a connection.
              </p> */}
              {summaryItems.map((item, index) => {
                return (
                  <>
                    <p key={index} className="mb-4">
                      {item}
                    </p>
                  </>
                );
              })}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;