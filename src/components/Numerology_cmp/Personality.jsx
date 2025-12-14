import { useContext } from "react";
import { CardContext } from "../../context/CardsDataContext";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const Personality = () => {
  const { personalitynum } = useContext(CardContext);
  const personalityNumberText = useTranslatedText("Personality Number");
  return (
    <div className="flex justify-center align-middle p-1 text-white ">
      <div className="bg-[#5a56c0] m-7 lg:w-2/3 md:w-[80vw] rounded-sm mt-10 bg-opacity-90 h-max p-5">
        <h1 className="text-2xl lg:text-5xl text-center">
          <span className="font-bold text-[#b0a4cb] text-5xl lg:text-8xl">
           {personalitynum?.personality_number}
          </span>
          {personalityNumberText}
        </h1>
        <p className="lg:text-xl mt-2">
          {personalitynum?.report?.map((report, index) => {
            return <p key={index}>{report}</p>;
          })}
        </p>
      </div>
    </div>
  );
};

export default Personality;
