import { Box } from "@chakra-ui/react";
import { useProfile } from "../../context/Profile";
import GiftData from "./Gift.json";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Gift = () => {
  const { selectedUser } = useProfile();
  const data = GiftData.zodiacSigns.filter((data) => {
    return data.sign === selectedUser?.zodiacSign;
  });

  const giftTexts = useMemo(() => [
    "Gift Horoscope",
    "Small gifts maintain friendships! Do you know that? Do you need a gift or souvenir, and can't immediately think of anything suitable? Of course, a mandatory bouquet of flowers will also do in case of emergency. But are you sure that a bouquet of roses truly satisfies the taste of the person you're giving it to? Maybe they prefer carnations! Find out and read what you can do to make each zodiac sign happy.",
    "Gift Horoscope",
    "Child",
    "Woman",
    "Man",
    "Grandparents",
    "Gift Tips:"
  ], []);

  const [
    giftHoroscopeText,
    smallGiftsText,
    giftHoroscopeLabelText,
    childText,
    womanText,
    manText,
    grandparentsText,
    giftTipsText
  ] = useTranslatedTexts(giftTexts);

  // Translate dynamic content from JSON
  const childTitle = useTranslatedText(data[0]?.horoscope?.child?.title || "");
  const childTips = useTranslatedTexts(data[0]?.horoscope?.child?.tip || []);
  const womenTitle = useTranslatedText(data[0]?.horoscope?.women?.title || "");
  const womenTips = useTranslatedTexts(data[0]?.horoscope?.women?.tip || []);
  const manTitle = useTranslatedText(data[0]?.horoscope?.man?.title || "");
  const manTips = useTranslatedTexts(data[0]?.horoscope?.man?.tip || []);
  const grandparentsTitle = useTranslatedText(data[0]?.horoscope?.grandparents?.title || "");
  const grandparentsTips = useTranslatedTexts(data[0]?.horoscope?.grandparents?.tip || []);

  return (
    <div>
      <div className="flex justify-center text-white">
        <div className="mt-5">
          <h2 className="text-center text-4xl  text-white font-nunito-light">
            {giftHoroscopeText}
          </h2>

          <div className="flex justify-center text-xl align-middle mt-10">
            <Box className="w-[90%]">
              <p>
                {smallGiftsText}
              </p>

              <h2 className="text-center mt-6 text-2xl mb-4 font-semibold underline">
                {data[0]?.logo} {data[0]?.sign} {giftHoroscopeLabelText}
              </h2>
              <h2>{data[0]?.sign} {childText}</h2>
              <p>{childTitle}</p>
              <h2 className="text-xl mt-4 font-semibold underline">
                {giftTipsText}
              </h2>
              <ul className="list-disc ml-6 mb-4">
                {childTips.map((item, index) => {
                  return (
                    <>
                      <li key={index}>{item}</li>
                    </>
                  );
                })}
              </ul>

              <h2>{data[0]?.sign} {womanText}</h2>
              <p>
                <p>{womenTitle}</p>
              </p>
              <h2 className="text-xl mt-4 font-semibold underline">
                {giftTipsText}
              </h2>
              <ul className="list-disc ml-6 mb-4">
                {womenTips.map((item, index) => {
                  return (
                    <>
                      <li key={index}>{item}</li>
                    </>
                  );
                })}
              </ul>

              <h2>{data[0]?.sign} {manText}</h2>
              <p>{manTitle}</p>

              <h2 className="text-xl mt-4 font-semibold underline">
                {giftTipsText}
              </h2>
              <ul className="list-disc ml-6 mb-4">
                {manTips.map((item, index) => {
                  return (
                    <>
                      <li key={index}>{item}</li>
                    </>
                  );
                })}
              </ul>

              <h2>{data[0]?.sign} {grandparentsText}</h2>
              <p>{grandparentsTitle}</p>

              <h2 className="text-xl mt-4 font-semibold underline">
                {giftTipsText}
              </h2>
              <ul className="list-disc ml-6 mb-4">
                {grandparentsTips.map((item, index) => {
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

export default Gift;