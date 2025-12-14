import { useState } from "react";
import Cards from "./Cards";
import { Center } from "@chakra-ui/react";
import Footersub from "./Footersub";
import { AiOutlineLeft } from "react-icons/ai";
import { useProfile } from "../../context/Profile";
import Abandoned from "./Abandoned";
import Discount from "./Discount";

const Subscription = () => {
  const { selectedCard } = useProfile();
  console.log(selectedCard, "subscription");
  const [SingleCard, setSingleCard] = useState({
    id: 1,
    offer: "TRY IT",
    plan: "STARTER",
    months: "3 days trial",
    access: "full access on all chart and one personal report",
    then: "Then €19.99 weekly",
    charge: "*2.99€",
    discount: "",
    get: [
      "Natal Chart report",
      "Synstry chart",
      "Transit chart",
      "Solar return chart",
      "Numerology insight",
      "Daily Tarot",
      "Daily Horoscope",
      "Annual Horoscope",
    ],
    cancel:
      "*You can cancel any time. Total charge 2.99€. After 3 days trial you will be charged 19.99 weekly, billed monthly. Subscriptios is auto renewable until cancelation.",
  });
  const { cards, current, setCurrent } = useProfile();
  // const filteredCards = cards.filter((card, index) => {
  //   if (selectedCard == 1) {
  //     return index == 2;
  //   } else if (selectedCard == 0) {
  //     return index == 1 || index == 2;
  //   } else if (selectedCard == 2) {
  //     return index == 1;
  //   }
  // });

  // const navigate = useNavigate();
  // const Handlepay = () => {
  //   navigate("/subscription/payment");
  //   setUnSelectedPlans(filteredCards);
  // };
 
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleDataFromChild = (data) => {
    setSingleCard(data);
  };

  const steps = [
    {
      content: (
        <Cards handleDataFromChild={handleDataFromChild} cards={cards} />
      ),
    },
    // {
    //   content: <Cardone SingleCard={SingleCard} />,
    // },
    {
      content: <Abandoned />,
    },
    {
      content: <Discount />,
    },
  ];

  return (
    <>
      <div className=" ">
        <div>{steps[current].content}</div>
        {current == 1 && (
          <AiOutlineLeft
            className={`mt-1 cursor-pointer absolute top-1 lg:text-3xl text-2xl  ${
              current === 0 ? "text-white" : "text-black"
            }`}
            onClick={() => prev()}
          />
        )}
        {current == 2 && (
          <AiOutlineLeft
            className={`mt-1 cursor-pointer absolute top-1 lg:text-3xl text-2xl  ${
              current === 0 ? "text-white" : "text-black"
            }`}
            onClick={() => prev()}
          />
        )}
        {/* <div className={`${current === 0 ? "block" : "hidden"} bg-[#081132]`}>
          {current < steps.length - 1 && (
            <Center>
              <button
                onClick={() => next()}
                className="bg-gradient-to-r from-indigo-700 to-purple-600 mt-4 lg:w-[30%] w-[60%]  text-white rounded-full  p-3 border-none lg:text-2xl text-xl font-semibold"
              >
                Continue
              </button>
            </Center>
          )}
          <div className="text-[#bcbcbc] text-center">
            <p>{selectedCard?.cancel1}</p>
            <p>
              {selectedCard?.cancel2}
              {selectedCard?.id == 1 && "billed monthly"}
            </p>
            <p>
              {selectedCard?.id == 1 &&
                "Subscriptions is auto renewable until cancelation."}
            </p>
          </div>
          <div className="text-center">
            <p className=" h-fit relative bottom-2 text-[#34487b] font-nunito-light"></p>
          </div>
          <div className="mt-6 lg:p-0">
            <Footersub />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Subscription;
