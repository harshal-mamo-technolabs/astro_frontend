import Addquestion from "./Addquestion";
import Questionlist from "./Questionlist";
import Bg from "../../assets/bgpreloader.jpg";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen items-center justify-center font-nunito-light"
      style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover" }}
    >
      <div className="absolute top-2 z-10">
        <Link to="/" className="m-2">
          <Button className="text-white">Home</Button>
        </Link>
      </div>
      <div className="flex justify-evenly items-center flex-wrap">
        <Addquestion />
        <Questionlist />
      </div>
    </div>
  );
};

export default Dashboard;
