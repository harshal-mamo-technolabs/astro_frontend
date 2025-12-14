import {
  Box,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useState } from "react";
import { LuEuro } from "react-icons/lu";
import transits from "../../assets/transit.png";
import LockReport from "../Lockreport/LockReport";
import moon from "../../assets/moon.png";

const Forecast = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lockreport, setLockreport] = useState(true);
  const [lock, setLock] = useState(true);

  const toast = useToast();

  const handleChildClick = () => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box
          color="white"
          p={3}
          className=" bg-[#1a102e]  font-nunito-light text-center rounded-md"
        >
          Unlocked success
        </Box>
      ),
    });
    setLockreport(false);
    onClose();
  };
  return (
    <div className="flex justify-center text-white ">
      <Box
        as={"span"}
        onMouseOver={() => setLock(false)}
        onMouseOut={() => setLock(true)}
        onClick={onOpen}
        zIndex={1}
        className={`bg-[#6255d9] flex p-2 rounded-full h-fit absolute top-[35rem] cursor-pointer transition-transform transform ${
          lock ? "translate-y-0" : "translate-y-[-10px]"
        } ${lockreport === false && "hidden"}`}
        style={{
          zIndex: "2",
        }}
      >
        <h2 className="text-2xl p-1">Unlock This Report</h2>
        <div className="flex justify-center">
          {lock ? (
            <CiLock className="text-4xl" />
          ) : (
            <CiUnlock className="text-4xl" />
          )}
        </div>
      </Box>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            width: "23rem",
          }}
          className=" p-2  m-5 lg:m-0  drop-shadow-sm"
          bg={"#190c26"}
        >
          <ModalHeader className="text-center text-white font-nunito-light">
            Unlock Life forecast Report
          </ModalHeader>
          <ModalBody>
            <Box className="text-white text-center flex flex-col gap-5">
              <div>
                <Text>6.00$</Text>
                <Text>One time payment</Text>
              </div>

              <Center>
                <Button
                  style={{
                    backgroundColor: "#9326DB ",
                    color: "white",
                    marginTop: "20px",
                  }}
                  className=" lg:w-[40%] w-[60%]  rounded-full p-0 h-[7vh] border-none text-2xl font-semibold"
                  onClick={handleChildClick}
                >
                  Continue
                </Button>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* <div>
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
                    <Image src={transits} height={150} />
                  </Box>
                </Box>
              </div>
              <Box className="text-center bg-[#190C26] relative top-1 text-xl md:text-2xl lg:text-2xl text-white font-[verdana] font-semibold">
                <h2>Unlock the report</h2>
                <h2>of Life forecast</h2>
              </Box>
              <Box className="text-center relative top-2 text-md text-[#A4A1A8] bg-[#190C26] font-nunito-light font-thin ">
                <p>Get full access with a detailed description</p>
                <p>of the lines</p>
              </Box>
              <Box className="text-center text-md lg:text-xl relative top-3 text-white font-nunito-light font-semibold">
                <p>91.3% of peoples have already</p>
                <p>tried!</p>
              </Box>
              <Box
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
              </Box>
              <div className="w-full mt-8 flex justify-center">
                <div className="w-[40%]">
                  <button
                    className="w-full rounded-full font-nunito-light text-white font-light text-xl p-2 bg-[#9326DB]"
                    onClick={handleChildClick}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </div> */}
        <LockReport
          to="/transits/dailytransit"
          src={moon}
          name="Daily transit"
          heading="Find Out How the Planetary Transits Impact Your Life!"
          footdesc="Find out how the upcoming months will be with a detailed transit report"
          image={transits}
          describtion="A Transit Chart analysis involves a method of interpreting the current movement of the planets as they transit the zodiac signs on any given day. Daily transit readings provide guidance on navigating daily life, making decisions, and understanding the broader cosmic influences shaping your experiences.              "
        />
      </Modal>
      <div className={`p-3 mt-10 w-4/5 ${lockreport && "blur"}`}>
        <Text className="text-2xl lg:text-4xl font-nunito-light text-center ">
          Life forecast Report
        </Text>

        <Divider />
        <div className="flex justify-center text-xl align-middle mt-5">
          <Box>
            <p className={` ${lockreport && "select-none"}`}>
              {lockreport
                ? ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                  omnis iusto neque nam et hic explicabo, in veritatis quidem
                  doloribus dolorem. Dicta cum ad suscipit architecto nihil quaerat
                  voluptatem, deleniti ducimus aspernatur dolores. Inventore
                  doloribus itaque error recusandae ipsa eum repellendus maiores
                  voluptates odio deserunt provident, eos, optio voluptatibus,
                  corporis voluptas magnam fugiat! A atque non doloremque tenetur
                  repellat harum? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Maxime, omnis iusto neque nam et hic explicabo, in veritatis
                  quidem doloribus dolorem. Dicta cum ad suscipit architecto nihil
                  quaerat voluptatem, deleniti ducimus aspernatur dolores. Inventore
                  doloribus itaque error recusandae ipsa eum repellendus maiores
                  voluptates odio deserunt provident, eos, optio voluptatibus,
                  corporis vo Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Maxime, omnis iusto corporis voluptas magnam fugiat! A atque
                  non doloremque tenetur repellat harum? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Maxime, omnis iusto neque nam et hic
                  explicabo, in veritatis quidem doloribus dolorem. Dicta cum ad
                  suscipit architecto nihil quaerat voluptatem, deleniti ducimus
                  aspernatur dolores. Inventore doloribus itaque error recusandae
                  ipsa eum repellendus maiores voluptates odio deserunt provident,
                  eos, optio voluptatibus, corporis vo Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Maxime, omnis iusto`
                : `life forecast report Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                  omnis iusto neque nam et hic explicabo, in veritatis quidem
                  doloribus dolorem. Dicta cum ad suscipit architecto nihil quaerat
                  voluptatem, deleniti ducimus aspernatur dolores. Inventore
                  doloribus itaque error recusandae ipsa eum repellendus maiores
                  voluptates odio deserunt provident, eos, optio voluptatibus,
                  corporis voluptas magnam fugiat! A atque non doloremque tenetur
                  repellat harum? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Maxime, omnis iusto neque nam et hic explicabo, in veritatis
                  quidem doloribus dolorem. Dicta cum ad suscipit architecto nihil
                  quaerat voluptatem, deleniti ducimus aspernatur dolores. Inventore
                  doloribus itaque error recusandae ipsa eum repellendus maiores
                  voluptates odio deserunt provident, eos, optio voluptatibus,
                  corporis vo Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Maxime, omnis iusto corporis voluptas magnam fugiat! A atque
                  non doloremque tenetur repellat harum? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Maxime, omnis iusto neque nam et hic
                  explicabo, in veritatis quidem doloribus dolorem. Dicta cum ad
                  suscipit architecto nihil quaerat voluptatem, deleniti ducimus
                  aspernatur dolores. Inventore doloribus itaque error recusandae
                  ipsa eum repellendus maiores voluptates odio deserunt provident,
                  eos, optio voluptatibus, corporis vo Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Maxime, omnis iusto`}
            </p>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
