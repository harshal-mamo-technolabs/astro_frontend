import { Image } from "@chakra-ui/react";
import { useProfile } from "../../context/Profile";
import Discount from "../../assets/Discount.png";
const Abandoned = () => {
  const { selectedCard, setCurrent, current } = useProfile();
  const next = () => {
    setCurrent(current + 1);
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fdefee]">
      <div className="mt-10">
        <h1 className="text-4xl font-semibold text-center">Save 25% off!</h1>
        <Image src={Discount} />
        <div>
          <p className="text-2xl font-semibold text-center">
            🔥 25% off on your personalized plan
          </p>
        </div>
        <div>
          <p className="text-2xl text-center mt-4">
            🎁{selectedCard?.months} Premium plan
          </p>
          <p className="text-2xl font-semibold mt-4 text-center">
            €11.24 instead of {selectedCard?.charge} weekly
          </p>
        </div>
        <div className=" flex justify-center mt-4">
          <button
            className="bg-[#bc6ad8] p-2 text-white text-xl rounded-md"
            onClick={() => next()}
          >
            Get secret discount!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Abandoned;
