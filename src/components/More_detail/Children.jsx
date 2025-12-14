import { Box } from "@chakra-ui/react";
import ChildrenData from "./ChildrenHoroscope.json";
import { useProfile } from "../../context/Profile";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Children = () => {
  const { selectedUser } = useProfile();
  const data = ChildrenData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });
  console.log(data, "child carrer");

  const childrenTexts = useMemo(() => [
    "Children's Horoscope",
    "Astrology assumes that considering birth dates can provide valuable information about why, for example, an Aries child thinks differently from a Pisces child. It would be wrong to reduce children to their zodiac sign, but perhaps a general horoscope for children can at least give parents something to think about if they wonder why their child gets angry while other children play peacefully and behave well in the park.",
    "Even if general horoscopes like this one are more for fun, it's certainly not a mistake for adults to have a little more understanding for their children.",
    "Every child is a gift from heaven and, of course, a source of pride for their parents. Unfortunately, it is often forgotten that each newcomer brings their own little personality and thus their own needs that cannot fit into a predetermined template or table of average values.",
    "Children's horoscope"
  ], []);

  const [
    childrensHoroscopeText,
    astrologyAssumesText,
    evenIfGeneralText,
    everyChildText,
    childrensHoroscopeLabelText
  ] = useTranslatedTexts(childrenTexts);

  // Translate dynamic content from JSON
  const summaryText = useTranslatedText(data[0]?.horoscope?.summary || "");
  
  // Translate headData items
  // Memoize headData and its derived arrays to avoid re-triggering translations on every render
  const headData = useMemo(() => data[0]?.horoscope?.headData || [], [data]);
  const headDataTitleTexts = useMemo(() => headData.map((item) => item.title || ""), [headData]);
  const headDataDescTexts = useMemo(() => headData.map((item) => item.desc || ""), [headData]);
  const headDataTitles = useTranslatedTexts(headDataTitleTexts);
  const headDataDescs = useTranslatedTexts(headDataDescTexts);
  const headDataItems = useMemo(
    () =>
      headData.map((item, index) => ({
        title: headDataTitles[index] || item.title || "",
        desc: headDataDescs[index] || item.desc || "",
      })),
    [headData, headDataTitles, headDataDescs]
  );

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {childrensHoroscopeText}
          </h2>

          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p>
                {astrologyAssumesText}
              </p>
              <p className="mt-4">
                {evenIfGeneralText}
              </p>
              <p className="mt-4">
                {everyChildText}
              </p>

              <h2 className="text-center mt-6 text-2xl font-semibold underline">
                {data[0]?.logo} {childrensHoroscopeLabelText} {data[0]?.sign}
              </h2>
              <p className="mt-4">{summaryText}</p>
              <div className="mb-2">
                {headDataItems.map((item, index) => {
                  return (
                    <>
                      <p className="underline" key={index}>
                        {item.title}:
                      </p>
                      <p>{item.desc}</p>
                    </>
                  );
                })}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Children;