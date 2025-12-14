import { useContext } from "react";
import { CardContext } from "../../context/CardsDataContext";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const Subcoincise = () => {
  const { subconscious } = useContext(CardContext);
  const subconsciousSelfNumberText = useTranslatedText("Subconscious Self Number");
  return (
    <div className="flex justify-center align-middle p-1 text-white ">
      <div className="bg-[#5a56c0] m-7 lg:w-2/3 md:w-[80vw] rounded-sm mt-10 bg-opacity-90 h-max p-5">
        <h1 className="text-2xl lg:text-5xl text-center">
          <span className="font-bold text-[#b0a4cb] text-5xl lg:text-8xl">
            {subconscious?.subconscious_self_number}
          </span>
          {subconsciousSelfNumberText}
        </h1>
        <p className="lg:text-xl mt-2">
          {subconscious?.report?.map((report, index) => {
            return <p key={index}>{report}</p>;
          })}
        </p>
      </div>
    </div>
  );
};

export default Subcoincise;
