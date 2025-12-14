import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

const Privacypolicy = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-600 h-[100vh] flex justify-center align-middle items-center">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-600 min-h-screen flex flex-col items-center justify-center">
        <Link to={"/subscription"} className="absolute left-0 top-10 p-2">
          <AiOutlineLeft className="mt-1 text-[#a1a1a1] text-4xl" />
        </Link>
        <div className="container mx-auto text-white px-4">
          <h2 className="font-bold mb-4 text-center text-4xl">Privacy</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            fringilla vestibulum nisl, vel sollicitudin mauris cursus id. Fusce
            vel dictum quam. Nullam facilisis, elit nec fermentum venenatis, leo
            felis dignissim leo, eu dapibus elit tortor id tortor.
          </p>
          <p className="mb-4">
            Proin sit amet diam id justo consequat euismod. Nulla facilisi.
            Proin euismod ligula non odio efficitur, vitae accumsan tortor
            volutpat. Ut vel tellus sed purus fermentum venenatis vel at ante.
            Vivamus dapibus metus id tellus varius, at varius nisl volutpat.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Privacypolicy;
