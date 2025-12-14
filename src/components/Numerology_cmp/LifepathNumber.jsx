import { useContext } from "react";
import "../Horoscope/HoroScope.css";
import { CardContext } from "../../context/CardsDataContext";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const LifepathNumber = () => {
  const { lifePath } = useContext(CardContext);
  const lifePathNumberText = useTranslatedText("Life Path Number");

  return (
    <div className="flex justify-center align-middle p-1 text-white ">
      <div className="bg-[#5a56c0] m-7 lg:w-2/3 md:w-[80vw] rounded-sm mt-10 bg-opacity-90 h-max p-5">
        <h1 className="text-2xl lg:text-5xl text-center">
          <span className="font-bold text-[#b0a4cb] text-5xl lg:text-8xl">
            {lifePath?.lifepath_number}
          </span>
          {lifePathNumberText}
        </h1>
        <p className="lg:text-xl mt-2">
          {lifePath?.report?.map((report, index) => {
            return <p key={index}>{report}</p>;
          })}
        </p>
      </div>
    </div>
  );
};

export default LifepathNumber;
