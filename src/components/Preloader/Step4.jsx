import { Box, Input, useToast } from "@chakra-ui/react";
import "../Preloader/Preloader.css";
import { AiOutlineLeft } from "react-icons/ai";
import { useProfile } from "../../context/Profile";
import { useState } from "react";
const Step4 = ({ prev, setCurrent, current }) => {
  const { setFormData } = useProfile();
  const [city, setCity] = useState("");
  const toast = useToast();

  const next = () => {
    if (!city) {
      toast({
        position: "top",
        duration: 2000,
        render: () => (
          <Box
            color="white"
            p={3}
            className=" bg-custom-gradient font-nunito-light text-center rounded-md"
          >
            City is required
          </Box>
        ),
      });
    } else {
      setCurrent(current + 1);
      setFormData((prevData) => ({
        ...prevData,
        step4: city,
      }));
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
          In which city were you born?
        </h1>
        <div className="mb-5 mt-4 w-[90%] lg:w-[70%] font-[helvetica]">
          <Input
            variant="outline"
            placeholder="Search your city"
            onChange={(e) => setCity(e.target.value)}
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
    </div>
  );
};

export default Step4;
