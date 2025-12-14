import { useContext, useState } from "react";
import { useProfile } from "../../context/Profile";
import ImageCarosel from "./Carosel";
import { FaCaretDown } from "react-icons/fa";
import { Center } from "@chakra-ui/react";
import Footersub from "./Footersub";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/CardsDataContext";
import Test from "./Test.jsx";

const Cards = ({ cards }) => {
  const [expandedCards, setExpandedCards] = useState({});
  const { setSelectedCard, selectedCard } = useProfile();
  const { current, setCurrent } = useProfile();
  const { redirect } = useContext(CardContext);
  const navigate = useNavigate();
  const handleCardClick = (item) => {
    setSelectedCard(item);
  };
  console.log(selectedCard, "selected card");

  const toggleContentVisibility = (itemId) => {
    setExpandedCards((prevExpandedCards) => ({
      ...prevExpandedCards,
      [itemId]: !prevExpandedCards[itemId],
    }));
  };
  // const next = () => {
  //   setCurrent(current + 1);
  // };

  //payment handle function

  // const handlePayment = async () => {
  //   const stripe = await loadStripe(
  //     import.meta.env.VITE_STRIPE_KEY
  //   );
  //   const { id, months, charge } = selectedCard;
  //   const paymentDetails = { id, months, charge };
  //   const body = {
  //     products: paymentDetails,
  //   };

  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/checkout",
  //       body,
  //       {
  //         headers: headers,
  //       }
  //     );

  //     const session = response.data;

  //     const result = stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (result.error) {
  //       console.log(result.error);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // const handlePayment = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/checkout", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       mode: "cors",
  //       body: JSON.stringify({
  //         items: [
  //           {
  //             id: 1,
  //             quantity: 3,
  //             price: 12,
  //             name: "premium",
  //           },
  //         ],
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     alert("done");
  //     window.location = data.url;
  //   } catch (error) {
  //     console.log(error);
  //     alert("errr");
  //   }
  // };
  const handlePayment = () => {
    navigate("/subscription/pay", { state: { selectedCard } });
  };
  // const handleToken = (token) => {
  //   console.log(token);
  //   if (redirect === "") {
  //     navigate("/home");
  //   } else {
  //     navigate(redirect);
  //   }
  return (
    <div className="bg-[#081132] min-h-screen font-nunito-light">
      <ImageCarosel />
      <h1 className="text-[#bd426c] lg:text-2xl text-lg text-center m-2">
        Get full access on all our premium reports and reading
      </h1>
      <div className="flex justify-center gap-2">
        {cards.map((item) => (
          <div
            key={item.id}
            className={`rounded-md lg:m-1 m-[1px] pb-3 lg:w-[20%] ${selectedCard?.id === item.id
                ? "bg-gradient-to-b from-[#58267f] to-black"
                : "bg-black"
              } ${expandedCards[item.id] ? "auto" : "h-fit"
              }  flex flex-col justify-between cursor-pointer`}
            onClick={() => handleCardClick(item)}
          >
            <div>
              <div className="flex justify-center">
                <div
                  className={`rounded-md p-2 ${selectedCard?.offer === item.offer ? "" : ""
                    } lg:p-2 p-[2px] w-full ${selectedCard?.offer === item.offer
                      ? "bg-gradient-to-b from-[#e86ee5] to-[#ae2ea7]"
                      : "bg-gradient-to-b from-white to-black"
                    } `}
                >
                  <p className={`text-white font-bold text-center text-sm p-1`}>
                    {item.offer}
                  </p>
                </div>
              </div>
              <p className="text-white font-semibold text-center lg:text-2xl text-[13px] lg:mt-6 mt-1">
                {item.plan}
              </p>
              <p className="text-center lg:text-xl text-sm md:text-xl text-[#a45bad]">
                {item.months}
              </p>

              <div className="mt-4">
                <div className="flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleContentVisibility(item.id);
                    }}
                    className="flex items-center justify-center"
                  >
                    <FaCaretDown className="text-[#f056cc] text-2xl" />
                  </button>
                </div>

                {expandedCards[item.id] && (
                  <div>
                    {item.get?.map((data, index) => (
                      <p
                        key={index}
                        className="text-white text-center lg:text-md text-sm"
                      >
                        {data}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {!expandedCards[1] && (
                <div className="flex flex-col items-center text-[10px] lg:text-lg justify-center">
                  <p className="text-[#bcbcbc] text-center text-[14px] lg:text-[17px]">
                    {item.id === 1 && "full access on all charts "}
                  </p>
                  <p className="text-[#bcbcbc] text-center text-[14px] lg:text-[17px]">
                    {item.id === 1 && "personal report"}
                  </p>
                  {/* <p className="text-transparent text-[5px]  text-center xl:hidden lg:block md:hidden sm:hidden">
                    {item.id === 1 && "reports"}
                  </p> */}
                </div>
              )}
              {!expandedCards[2] && (
                <div className="flex flex-col items-center text-[13px] lg:text-lg  justify-center">
                  <p className="text-[#bcbcbc] text-center text-[14px] lg:text-[17px]">
                    {item.id === 2 && "All included in Starter + plan"}
                  </p>
                </div>
              )}
              {!expandedCards[3] && (
                <div className="flex flex-col items-center text-[13px] lg:text-lg justify-center">
                  <p className="text-[#bcbcbc] text-center text-[14px] lg:text-[17px]">
                    {item.id === 3 && "All included in Premium + plan"}
                  </p>
                  {/* <p className="text-[#bcbcbc] text-center">
                    {item.id === 3 && "+ special offer"}
                  </p> */}
                </div>
              )}

              <p
                className={` ${item?.id === 1 ? "text-black" : "text-white"
                  } mt-3 text-center text-sm lg:text-lg`}
              >
                {item.discount}
              </p>
              <p className="text-[#9884aa] text-center text-sm lg:text-lg ">
                {item.charge}
              </p>
            </div>
            <div className="lg:mt-2 text-sm">
              <p className="text-[#666666] text-center">
                {item.id === 1 && "/3 days trial"} {item.then}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Center>
        {/* <button
          onClick={() => handlePayment()}
          className="bg-gradient-to-r from-indigo-700 to-purple-600 lg:w-[30%] w-[60%] mt-3 text-white rounded-full  p-3 border-none lg:text-2xl text-xl font-semibold"
        >
          Continue
        </button> */}
        {/* <StripeCheckout
          token={handleToken}
          stripeKey="pk_test_51OtQ1gSD1ZWugT11dvQgpaME2hmREVQhdIbq3gi1ZwBySwg7cpapEdyWS9FYHuymkWdtZfaJQYKrX8oea90tHPKn00CddMfUqB"
          name="Astrology"
          description={`${selectedCard?.plan}`}
          amount={10000}
          currency="EUR"
        > */}
        <button
          onClick={() => handlePayment()}
          className="bg-gradient-to-r from-indigo-700 to-purple-600 lg:w-[20%] w-[100%] mt-3 text-white rounded-full  p-3 border-none lg:text-2xl text-xl font-semibold"
        >
          Continue
        </button>
        {/* </StripeCheckout> */}
      </Center>
      <div className="text-center text-[12.5px] lg:text-[15px]">
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
      </div>
      <Footersub />
    </div>
  );
};

export default Cards;
