import { Link } from "react-router-dom";

const Footersub = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex justify-center  gap-4 text-sm lg:text-md text-[#9e9e9f] text-center font-nunito-light">
        <Link to="/term">
          <p className="cursor-pointer">Terms of Services</p>
        </Link>
        <Link to="/privacypolicy">
          <p className="cursor-pointer">Privacy Policy</p>
        </Link>
        <Link to="/subscriptionpolicy">
          <p className="cursor-pointer">Subscription policy</p>
        </Link>
      </div>
    </div>
  );
};

export default Footersub;
