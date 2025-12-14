import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPlanet } from "react-icons/bi";
import { Link } from "react-router-dom";

const Step1 = ({ next }) => {
  const { t } = useTranslation();
  const [localquestion, setLocalquestion] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("questions"));
    setLocalquestion(data);
  }, [setLocalquestion]);
  return (
    <div className=" bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-lg  text-[#9e9e9f] font-nunito-light   p-2">
      {localquestion?.length > 0 ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <BiPlanet size={100} />
          <h1 className="lg:text-4xl md:text-4xl font-['Times New Roman'] text-2xl">
            {t("step1Head")}
          </h1>
          <div className="flex justify-center">
            <p className="text-center font-[helvetica] lg:text-2xl md:text-3xl text-xl lg:w-[68%]">
              {t("step1")}
              <span> ask you a couple of questions</span>
            </p>
          </div>
          <button
            className={`w-[30%] mt-5 rounded-full text-white font-light text-xl  p-1 lg:p-4  font-[helvetica]  bg-gradient-to-r from-purple-600 to-indigo-700`}
            onClick={() => next()}
          >
            OK
          </button>
          <p className=" text-white m-2 ">
            Your answers will be used for the calculation of your Birth Chart.
            By answering the questions you agree with our
            <Link to={"/policy"}>
              <span className=" underline"> privacy policy</span>
            </Link>
          </p>
        </div>
      ) : (
        <h2 className="text-center text-white text-xl">
          No question added yet
        </h2>
      )}
    </div>
  );
};

export default Step1;
