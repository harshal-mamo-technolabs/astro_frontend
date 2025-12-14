// import { Link } from "react-router-dom";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { Center } from "@chakra-ui/react";
// import CheckoutSteps from "./Steps";

// const PaymentSuccess = () => {
//   return (
//     <div className="bg-[#012060] min-h-screen">
//       <div className="bg-[#012060] h-[20vh]">
//         <h2 className="text-white font-nunito-light text-2xl text-center">
//           Checkout
//         </h2>
//         <CheckoutSteps current={3} />
//       </div>
//       <h1 className="text-center text-white text-2xl font-nunito-light font-semibold mt-10">
//         Payment Completed!
//       </h1>
//       <div className="flex justify-center mt-10">
//         <FaRegCheckCircle className="lg:text-6xl text-2xl bg-[#5F66FD] border rounded-full text-white" />
//       </div>
//       <p className="text-white text-2xl text-center mt-5">payment successful</p>
//       <Link to="/home">
//         <Center>
//           <button className="bg-[#5F66FD] mt-10 lg:w-[20%] w-[45%] hover:text-white text-white hover:text-white-700 rounded-full p-1 lg:h-[6vh] h-fit border-none lg:text-2xl text-xl font-semibold">
//             Complete
//           </button>
//         </Center>
//       </Link>
//     </div>
//   );
// };

// export default PaymentSuccess;

const PaymentSuccess = () => {
  const handleGetDiscount = () => {
    // Handle the logic for getting the discount
    console.log("Get Secret Discount clicked");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#081132]">
      <div className="text-white p-8 rounded-lg text-center">
        <p className="text-2xl font-semibold ">Save 25% off!</p>
        <img
          src="path/to/your/discount-image.jpg"
          alt="Discount Image"
          className="mb-4 mx-auto"
        />
        <p className="text-lg mb-4">25% off on your personalized plan</p>
        <p className="text-lg mb-4">2 months Premium Plan</p>
        <p className="text-lg mb-4">11 euro instead of 14.99 euro weekly</p>

        <button
          onClick={handleGetDiscount}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Get Secret Discount
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
