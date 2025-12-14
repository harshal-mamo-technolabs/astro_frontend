// import Footersub from "./Footersub";
// import CheckoutSteps from "./Steps";

// const Cardone = ({ SingleCard }) => {
//   console.log(SingleCard, "single card");
//   return (
//     <>
//       <div className="bg-[#012060] h-[20vh]">
//         <h2 className="text-white font-nunito-light text-2xl text-center">
//           Checkout
//         </h2>
//         <CheckoutSteps current={2} />
//       </div>

//       <h2 className="text-2xl font-semibold text-white mt-10 text-center">
//         Summary
//       </h2>
//       <div className="flex justify-center mt-5">
//         <div className=" lg:w-[25%] p-4 border rounded-[20px] shadow-lg shadow-indigo-500/10 text-center">
//           <h2 className="text-2xl text-white font-nunito-light font-semibold">
//             {SingleCard.isFree && "3-day free trial"}
//           </h2>
//           <p className="text-[#4f2c80]  font-semibold">
//             {SingleCard.isFree && "then pay $35.99* monthly"}
//           </p>
//           <h2 className="text-xl text-white font-nunito-light font-semibold">
//             {SingleCard.billed === 49.99 && "6 Months Premium"}
//           </h2>
//           <p className="text-[#4f2c80]  font-semibold">
//             {SingleCard.billed === 49.99 && "pay $49.99* monthly"}
//           </p>
//           <h2 className="text-xl text-white font-nunito-light font-semibold">
//             {SingleCard.billed === 59.99 && "9 Months Premium"}
//           </h2>
//           <p className="text-[#4f2c80]  font-semibold">
//             {SingleCard.billed === 59.99 && "pay $59.99* monthly"}
//           </p>

//           {/* <h2 className="text-2xl text-white font-nunito-light font-semibold">
//             {SingleCard.month === 9 && "9 Months Premium"}
//           </h2>
//           <h2 className="text-[#7465ac]">
//             {SingleCard.month === 9 && ` pay  $${SingleCard.billed} monthly`}
//           </h2>
//           <h2 className="text-[#7465ac]">
//             {SingleCard.month === 3 && `then pay $${SingleCard.billed} monthly`}
//           </h2> */}
//         </div>
//       </div>

//       <div className="mt-10 bg-red-900">
//         <Footersub />
//       </div>
//     </>
//   );
// };

// export default Cardone;

import { useState } from "react";
import { useProfile } from "../../context/Profile";
import { Box, Center, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Cardone = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const { selectedCard, setCurrent } = useProfile();
  const toast = useToast();
  const navigate = useNavigate();
  console.log(selectedCard, "singcard");
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted");
  };

  const Handlesubmit = () => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box
          color="white"
          p={3}
          className=" bg-custom-gradient font-nunito-light text-center rounded-md"
        >
          Buy Successfully
        </Box>
      ),
    });
    setTimeout(() => {
      navigate("/home");
      setCurrent(0);
    }, 1000);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#fdefee]">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="">
          Total charge
          {selectedCard?.id == 1
            ? `${selectedCard.charge} After 3 days trial you will be charged 19.99 weekly, billed monthly. `
            : `${selectedCard.extracharge} billed for ${selectedCard.months}`}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold ">Payment Method</label>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePaymentMethodChange("creditCard")}
              className={`flex items-center p-2 border ${
                paymentMethod === "creditCard" ? "border-blue-500" : ""
              } rounded-md cursor-pointer focus:outline-none`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={() => {}}
                className="sr-only"
              />
              <span className="ml-2">Credit/Debit Card</span>
            </button>
            <button
              onClick={() => handlePaymentMethodChange("paypal")}
              className={`flex items-center p-2 border ${
                paymentMethod === "paypal" ? "border-blue-500" : ""
              } rounded-md cursor-pointer focus:outline-none`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => {}}
                className="sr-only"
              />
              <span className="ml-2">PayPal</span>
            </button>
          </div>
        </div>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              placeholder="Enter card number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              placeholder="Enter cardholder name"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-2">
                Expiry Month
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none"
                placeholder="MM"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-2">
                Expiry Year
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none"
                placeholder="YYYY"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">CVV</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none"
              placeholder="Enter CVV"
            />
          </div>
          <Center>
            <button
              onClick={Handlesubmit}
              className="bg-gradient-to-r from-indigo-700 to-purple-600 mb-4   lg:w-[30%] w-[60%] hover:text-white text-white hover:text-white-700 rounded-full p-0 h-[7vh] border-none text-2xl font-semibold"
            >
              Start
            </button>
          </Center>
        </form>
      </div>
    </div>
  );
};

export default Cardone;
