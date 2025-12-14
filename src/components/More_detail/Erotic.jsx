import { Box } from "@chakra-ui/react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Erotic = () => {
  const eroticTexts = useMemo(() => [
    "Erotic Horoscope",
    "It would certainly be inappropriate to delve into people's intimate lives and claim that someone could be daring or an absolute dynamo in bed based on their zodiac sign. Equally presumptuous would be trying to determine someone's sexual inclinations – whether they prefer to live their love life as straight, gay, or lesbian – based on their astrological sign.",
    "In love, anything is possible.",
    "One might behave reserved outwardly but shine with passion within, while another may appear to be a wild lover, only to disappoint in bed. Surely, someone is not inherently good or bad in bed due to their zodiac sign. Nevertheless, we want to explore the answers and not take it all too seriously, examining what astrology tends to attribute to specific zodiac signs in terms of eroticism.",
    "Zodiac signs and your sex appeal.",
    "What do you think about that particular something? One person has it, another doesn't. Is it possible that someone's attractiveness is ingrained from birth? What about sex appeal? If you follow astrological teachings, you should be able to find signs in someone's natal chart indicating whether they go through life as a beauty or have been in a less favorable position in terms of looks and charisma. Of course, common sense tells us that a person's appearance is probably more connected to disposition and genetics. You can, but you don't have to believe astrology's claim that the horoscope can provide information about a person's external appearance and its impact on their surroundings.",
    "The following example cannot be entirely dismissed and at least gives food for thought: Astrology asserts that a person with a well-placed and unharmed Venus on the ascendant in the natal chart leaves an excellent impression on those around them. If this person is also born under the sign of Libra, astrology almost certainly assumes that they are aesthetically pleasing, or good-looking. Allegedly, this is indeed the case, although exceptions always exist.",
    "Aries, Leo, and Sagittarius have fire and passion in their blood.",
    "When it comes to love and eroticism, astrology confirms that fiery signs have a lot of temperament. Aries jumps into action quickly, being a passionate lover who doesn't hesitate. Leo shares a lot in common with Aries in this regard. They are grandiose lovers, taking what they need. Leo is an invincible hero in bed, a walking erotic package leaving no doubt about their potency. They are open to all kinds of love but also appreciate being admired and adored. Witty Sagittarius is also at home in the fiery element. Always open to new things in bed, they dislike being confined.",
    "Taurus, Virgo, and Capricorn - For earth signs, erotica is also paired with reason.",
    "Taurus, Virgo, and Capricorn are astrologically attributed to the earth element. Known for their grounded nature, they are not inherently bold when it comes to love. In terms of love and eroticism, typical Taurus takes things slowly. They take their time, don't rush in, and are knowledgeable. Of course, lovemaking may take a little longer. Virgo is characterized not only by reason in life but also in bed. They prefer a familiar environment and would rather plan a seductive evening than engage in quick sex in improbable places. Eroticism and reason go hand in hand - at least for Virgo. Infidelity and affairs come with complications, so a true Virgo will willingly avoid them. The reserved Capricorn is slow to open up and takes time to trust a partner.",
    "Gemini, Libra, and Aquarius can do without boredom - even in bed.",
    "Gemini, Libra, and Aquarius are at home in the air element and love diversity. Eroticism must remain exciting for these zodiac signs. Gemini can't stand a dull love life, loves to experiment, even in bed. There is nothing worse for them than boredom and routine. Despite a certain instability often attributed to Gemini, infidelity is not one of their characteristics. With their lively charisma and open nature, Geminis usually succeed in openly approaching potential flirtatious partners and winning hearts. Harmony and balance are essential for Libra. Although they love new challenges, they rarely take the initiative themselves. Libras never lack admirers as their charm quickly wins hearts. In love, they will do everything to make their partner happy. Unconventional Aquarius requires excitement and diversity in love. This zodiac sign is said to have a certain thirst for adventure, such as having sex in unusual places.",
    "Water signs Cancer, Scorpio, and Pisces: feelings, feelings, and more feelings.",
    "Cancer, Scorpio, and Pisces, born in the water element, are considered emotional individuals. Cancer relies on security - even in bed. They are born romantics who love cuddling. Cancer needs gentle care full of love and the feeling of being in good hands. Mental agreement with a partner and a sense of security come first. Romance and sensuality are inseparable for Cancer. Truly intense emotions are promised with Scorpio. Passion and eroticism go hand in hand for this zodiac sign. Not only passionate, Scorpio can also be very possessive and jealous. In bed, Scorpio often seeks a very special touch. Pisces are often called sentimentalists. They are extremely sensitive and love to be pampered. Therefore, they prefer to take a passive role in bed."
  ], []);

  const [
    eroticHoroscopeText,
    inappropriateText,
    inLoveAnythingText,
    behaveReservedText,
    zodiacSignsAndSexAppealText,
    whatDoYouThinkText,
    followingExampleText,
    ariesLeoSagittariusText,
    whenItComesToLoveText,
    taurusVirgoCapricornText,
    taurusVirgoCapricornDescText,
    geminiLibraAquariusText,
    geminiLibraAquariusDescText,
    waterSignsText,
    waterSignsDescText
  ] = useTranslatedTexts(eroticTexts);

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {eroticHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p className="">
                {inappropriateText}
              </p>
              <p className="mt-10 underline">{inLoveAnythingText}</p>
              <p className="">
                {behaveReservedText}
              </p>
              <h3 className="mt-4">{zodiacSignsAndSexAppealText}</h3>
              <p className="mt-10">
                {whatDoYouThinkText}
              </p>{" "}
              <p className="mt-10">
                {followingExampleText}
              </p>{" "}
              <p className="mt-10 mb-10">
                {ariesLeoSagittariusText}
              </p>
              <p className="mt-10">
                {whenItComesToLoveText}
              </p>{" "}
              <p className="mt-10 mb-10">
                {taurusVirgoCapricornText}
              </p>
              <p className="mt-10">
                {taurusVirgoCapricornDescText}
              </p>{" "}
              <p className="mt-10 mb-10">
                {geminiLibraAquariusText}
              </p>
              <p className="mt-10">
                {geminiLibraAquariusDescText}
              </p>{" "}
              <p className="mt-10 mb-10">
                {waterSignsText}
              </p>
              <p className="mt-10 mb-10">
                {waterSignsDescText}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Erotic;