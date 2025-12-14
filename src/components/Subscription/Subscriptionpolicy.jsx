import { Box } from "@chakra-ui/react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Subscriptionpolicy = () => {
  return (
    <Box className=" bg-custom-gradient h-screen">
      <div className="container mx-auto font-nunito-light text-white ">
        <Link to={"/subscription"} className="absolute left-0 top-10 p-2">
          <AiOutlineLeft className="mt-1 text-[#a1a1a1] text-4xl" />
        </Link>
        <h1 className="text-4xl font-semibold text-center mb-8">
          Membership Terms
        </h1>

        <div className="mt-20 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            1. Subscription Agreement
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h2 className="text-2xl font-semibold my-4">
            2. Billing and Payments
          </h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>

          <h2 className="text-2xl font-semibold my-4">
            3. Cancellation Policy
          </h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>

          <h2 className="text-2xl font-semibold my-4">4. Privacy Policy</h2>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default Subscriptionpolicy;
