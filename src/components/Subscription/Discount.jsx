import { useProfile } from "../../context/Profile";
import Cardone from "./SingleCard";
const Discount = () => {
  const { selectedCard } = useProfile();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center bg-[#fdefee]">
        <div className="mt-8">
          <p className="text-4xl text-center">🎉</p>
          <h1 className="text-4xl">You get a secret discount</h1>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl text-center">You get a secret discount!</h2>
          <p className="text-center text-xl">No pressure. Cancel anytime</p>
          <div className="text-white p-6 font-semibold flex gap-10 items-center rounded-md bg-custom-gradient mt-4">
            <p className="text-xl">🎁Secret discount applied</p>
            <p className="text-xl">25%</p>
          </div>
          <div className="flex  mt-3 text-xl justify-between">
            <p className=" font-semibold">{selectedCard.months} plan</p>
            <p>
              <span className="line-through m-2">
                {selectedCard.extracharge}
              </span>
              89€
            </p>
          </div>
        </div>
        <Cardone />
      </div>
    </div>
  );
};

export default Discount;
