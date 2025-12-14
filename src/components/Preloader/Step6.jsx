// import { Box, Input } from "@chakra-ui/react";
// import { AiOutlineLeft } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const Step6 = ({ setStep6, prev }) => {
//   return (
//     <div className=" bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-lg text-[#9e9e9f]  font-nunito-light lg:h-[72vh] p-2">
//       <Box h="10px" w="90%" className="bg-custom-gradient" />
//       <div onClick={() => prev()}>
//         <span className="flex items-center gap-3 text-2xl text-[#9e9e9f] font-nunito-light cursor-pointer ">
//           <AiOutlineLeft className="mt-1 " />
//           <h3>BACK</h3>
//         </span>
//       </div>
//       <div className=" flex flex-col justify-center items-center lg:gap-5 mt-20 ">
//         <h1 className="lg:text-4xl md:text-4xl text-2xl text-center font-['Times New Roman']">
//           What is your email address?
//         </h1>
//         <div className="mb-5 mt-3 w-[90%] lg:w-[70%]  font-[helvetica]">
//           <Input
//             variant="outline"
//             required
//             type="email"
//             placeholder="Type e-mail address here..."
//             onChange={(e) => setStep6(e.target.value)}
//           />
//         </div>
//         <div className=" w-[90%]">
//           <p className=" text-white text-center text-sm lg:text-xl mt-24">
//             By entering youe e-mail address you agree with our
//             <Link to={"/term"}>
//               <span className=" underline"> terms and consditions </span>
//             </Link>
//             and our{" "}
//             <Link to={"/policy"}>
//               <span className=" underline"> privacy policy </span>
//             </Link>
//             . and you allow us to send you e-mail(you can always unsuscribe via
//             the link at bottom of each mail)
//           </p>{" "}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step6;

import { Box, Input, useToast } from "@chakra-ui/react";
import "../Preloader/Preloader.css";
import { AiOutlineLeft } from "react-icons/ai";
import isEmail from "validator/lib/isEmail";
import { Link } from "react-router-dom";
import {  useState } from "react";
import { useProfile } from "../../context/Profile";
const Step6 = ({ prev, current, setCurrent }) => {
  const toast = useToast();
  const [step6data, setStep6data] = useState("");
  const { formData, setFormData } = useProfile();

  const next = () => {
    if (!step6data) {
      toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={3}
            className=" bg-custom-gradient font-nunito-light text-center rounded-md"
          >
            Email are required
          </Box>
        ),
      });
      return;
    }
    if (!isEmail(step6data)) {
      toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={3}
            className=" bg-custom-gradient font-nunito-light text-center rounded-md"
          >
            Enter valid Email address
          </Box>
        ),
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        step6: step6data,
      }));
      setCurrent(current + 1);
    }
  };

  return (
    <div className=" bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-lg text-[#9e9e9f]  font-nunito-light p-2">
      <Box h="10px" w="50%" className="bg-custom-gradient" />
      <div onClick={() => prev()}>
        <span className="flex items-center gap-3 text-2xl text-[#9e9e9f] font-nunito-light cursor-pointer ">
          <AiOutlineLeft className="mt-1 " />
          <h3>BACK</h3>
        </span>
      </div>
      <div className=" flex flex-col justify-center items-center gap-4 mt-10">
        <h1 className="lg:text-4xl md:text-4xl text-2xl font-['Times New Roman']">
          What is your e-mail address?
        </h1>
        <p className="text-lg">
          You`ll receive your reading via e-mail as soon as it is ready
        </p>
        <div className="mb-5 mt-4 w-[90%] lg:w-[70%] font-[helvetica]">
          <Input
            variant="outline"
            placeholder="Type e-mail address here..."
            onChange={(e) => setStep6data(e.target.value)}
          />
        </div>
      </div>
      <div className=" flex justify-center">
        <button
          className={`w-[30%] mt-5 rounded-full text-white font-light m-6
                   text-xl  p-1 lg:p-4  font-[helvetica]  bg-gradient-to-r from-purple-600 to-indigo-700`}
          onClick={() => next()}
        >
          Next
        </button>
      </div>
      <div className="flex justify-center">
        {" "}
        <div className="lg:w-[70%] md:w-[70%] w-[90%]">
          {" "}
          <p className=" text-white text-center text-sm font-thin ">
            By entering youe e-mail address you agree with our
            <Link to={"/term"}>
              <span className=" underline"> terms and consditions </span>
            </Link>
            and our{" "}
            <Link to={"/policy"}>
              <span className=" underline"> privacy policy </span>
            </Link>
            . and you allow us to send you e-mail(you can always unsuscribe via
            the link at bottom of each mail)
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Step6;
