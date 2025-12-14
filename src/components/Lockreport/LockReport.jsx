import {
  Box,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  // useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/CardsDataContext";

const LockReport = ({ to, image, name, heading, footdesc }) => {
  const { setRedirect } = useContext(CardContext);
  // const toast = useToast();
  const navigate = useNavigate();
  const showToast = () => {
    // toast({
    //   position: "top",
    //   duration: 2500,
    //   render: () => (
    //     <Box
    //       color="white"
    //       p={3}
    //       className="bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md font-nunito-light text-center"
    //     >
    //       Buy Success
    //     </Box>
    //   ),
    // });
    navigate("/subscription");
    setRedirect(to);
  };
  // const handleClickBuy = async () => {
  //   if (name === "Natal Chart") {
  //     const apiUrl = "https://json.astrologyapi.com/v1/western_horoscope";
  //     const authCredentials = {
  //       username: "627719",
  //       password: "4e21077ce40109e9e98aa728c84cd60c",
  //     };

  //     const payload = {
  //       day: "10",
  //       month: "5",
  //       year: "1990",
  //       hour: "19",
  //       min: "55",
  //       lat: "19.20",
  //       lon: "25.20",
  //       tzone: "5.30",
  //     };

  //     try {
  //       const response = await axios.post(apiUrl, payload, {
  //         auth: authCredentials,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       toast({
  //         position: "top",
  //         duration: 2500,
  //         render: () => (
  //           <Box
  //             color="white"
  //             p={3}
  //             className="bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md font-nunito-light text-center"
  //           >
  //             Buy Success
  //           </Box>
  //         ),
  //       });
  //       setAllNatalChartData(response.data);
  //       navigate(to);
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //     }
  //   } else {
  //     toast({
  //       position: "top",
  //       duration: 2500,
  //       render: () => (
  //         <Box
  //           color="white"
  //           p={3}
  //           className="bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md font-nunito-light text-center"
  //         >
  //           Buy Success
  //         </Box>
  //       ),
  //     });
  //     navigate(to);
  //   }
  // };

  return (
    <div>
      <ModalOverlay
        style={{
          backdropFilter: "blur(10px)",
        }}
      />
      <ModalContent className="bg-[#190C26]">
        <span className="relative top-0 bottom-[20px] lg:left-4 ">
          <ModalCloseButton className="text-white  top-10" />
        </span>
        <ModalBody className="bg-[#190C26]">
          <div className="flex justify-center">
            <Box
              bg="#392852"
              color="white"
              borderRadius="lg"
              className="w-[90%] h-fit lg:w-[100%] md:w-[100%]"
            >
              <Box className=" flex justify-center">
                <Image src={image} height={150} />
              </Box>
            </Box>
          </div>
          <Box className="text-center bg-[#190C26] relative top-1 text-xl md:text-2xl font-semibold lg:text-2xl text-white">
            <p>{heading}</p>
          </Box>
          <Box className="text-center relative top-2 text-md mt-4  font-nunito-light font-thin ">
            <p className="text-white text-xl">As a Premium user</p>
            <p className="text-[#A4A1A8] text-xl">
              you get FREE detailed {name} Report
            </p>
          </Box>
          {/* <Box className="text-center text-md lg:text-xl relative top-3 text-white font-nunito-light font-semibold">
            <p>91.3% of peoples have already</p>
            <p>tried!</p>
          </Box> */}
          {/* <Box
            bg="#392852"
            color="white"
            className="flex justify-between items-center relative top-4 rounded-[25px] "
            p={4}
          >
            <div className="flex  flex-col gap-4">
              <div className="flex gap-10">
                <p className="line-through">
                  <span className="flex items-center">
                    14,00
                    <LuEuro />
                  </span>
                </p>
                <p className="font-semibold font-nunito-light text-xl">
                  <span className="flex items-center">
                    7,30
                    <LuEuro />
                  </span>
                </p>
              </div>

              <p className="text-[#9e9e9f] font-nunito-light">
                Buy with 50% profit
              </p>
            </div>
            <div className=" border-2 bg-transparent w-[35%] text-center rounded-lg  shadow-lg shadow-[#8C182F]">
              <button
                className="text-xl font-nunito-light font-semibold backdrop-blur-sm "
                style={{
                  textShadow: "3px 3px #8C182F",
                }}
              >
                Sale
              </button>
            </div>
          </Box> */}
          <p className="text-white mt-8 text-center">{footdesc}</p>
          <div className="w-full mt-3 flex justify-center">
            <div className="w-[90%] flex justify-center ">
              <button
                className="w-[70%] rounded-full font-nunito-light text-white font-light text-xl p-3 mt-4 mb-2 bg-[#9326DB]"
                onClick={showToast}
              >
                GET IT NOW
              </button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </div>
  );
};

export default LockReport;
