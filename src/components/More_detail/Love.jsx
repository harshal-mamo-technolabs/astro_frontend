import { Box } from "@chakra-ui/react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Love = () => {
  const loveTexts = useMemo(() => [
    "Single Horoscope",
    "A love horoscope or a relationship horoscope is anything but an easy task for an astrologer. Anyone who expects to find a lifelong partner solely based on comparing zodiac signs should not be surprised if each new attempt is an unsuccessful one. A true relationship horoscope involves more than just zodiac signs; the natal chart needs to be examined in relation to partnership and potential partners.",
    "A love horoscope for an individual without a possible or existing partner can only reveal certain patterns of the seeker`s behavior. It can show what makes it difficult for them to find a suitable partner and what needs to happen to change these negative influences. However, a genuine partner won`t be found this way because their horoscope also plays a crucial role in the relationship or love horoscope. Nevertheless, it does reveal why one consistently ends up with the wrong partner, opening ways to break this negative cycle and find happiness. Such a relationship horoscope determines similarities and differences in the respective birth charts. It shows possibilities for shared development but also contradictions that may be insurmountable or seem to be.",
    "A love horoscope created in the midst of a relationship crisis can indicate ways out of it, but more importantly, it reveals the path into the crisis based on the natal charts of each partner. It uncovers behavioral patterns, unveils deeply hidden fears, and shows why one clings to a relationship that has not been functioning for a long time, out of fear of loneliness. Such a horoscope, created at the beginning of a relationship, considering both natal charts and the specific behavior in the relationship, can disclose the prospects of that relationship. It provides a very detailed picture of each partner concerning their desires and hopes in the partnership, differences, influences from previous relationships, or parents.",
    "Relationship horoscope cannot only show in romantic relationships what chances the relationship has for the future, no, it can also be used for business relationships, friendships, or family relationships and demonstrate the similarities and differences that exist, as well as the overall relationship between individuals. It is possible to see what future conflicts are expected and which ones are already present.",
    "A love horoscope or relationship horoscope is one of the most demanding horoscopes in astrology, but it can reveal which potential partners have prospects for a lasting romantic relationship, even in our turbulent times, where first relationships are terminated too quickly."
  ], []);

  const [
    singleHoroscopeText,
    loveHoroscopeIntroText,
    loveHoroscopeIndividualText,
    loveHoroscopeCrisisText,
    relationshipHoroscopeText,
    loveHoroscopeConclusionText
  ] = useTranslatedTexts(loveTexts);

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {singleHoroscopeText}
          </h2>
          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[80%]">
              <p className="">
                {loveHoroscopeIntroText}
              </p>

              <p className="mt-4">
                {loveHoroscopeIndividualText}
              </p>

              <p className="mt-4">
                {loveHoroscopeCrisisText}
              </p>
              <p className="mt-4">
                {relationshipHoroscopeText}
              </p>
              <p className="mt-4 mb-10">
                {loveHoroscopeConclusionText}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Love;