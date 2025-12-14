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
import { useState, useMemo } from "react";
import { LuEuro } from "react-icons/lu";
import SolarReturn from "../../assets/SolarReturn.png";
import LockReport from "../Lockreport/LockReport";
import sun from "../../assets/sun.png";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const SrReport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lockreport, setLockreport] = useState(true);
  const [lock, setLock] = useState(true);

  const toast = useToast();

  const unlockSuccessText = useTranslatedText("Unlocked success");
  const unlockReportText = useTranslatedText("Unlock This Report");
  const srReportText = useTranslatedText("SR Report");

  const handleChildClick = () => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box
          color="white"
          p={3}
          className=" bg-[#1a102e]  drop-shadow-2xl  font-nunito-light text-center rounded-md"
        >
          {unlockSuccessText}
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
        className={`bg-[#5f53d3] flex p-2 rounded-full h-fit absolute top-[35rem] cursor-pointer transition-transform transform ${
          lock ? "translate-y-0" : "translate-y-[-10px]"
        } ${lockreport === false && "hidden"}`}
        style={{
          zIndex: "2",
        }}
      >
        <h2 className="text-2xl p-1">{unlockReportText}</h2>
        <div className="flex justify-center">
          {lock ? (
            <CiLock className="text-4xl" />
          ) : (
            <CiUnlock className="text-4xl" />
          )}
        </div>
      </Box>

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
                    <Image src={SolarReturn} height={150} />
                  </Box>
                </Box>
              </div>
              <Box className="text-center bg-[#190C26] relative top-1 text-xl md:text-2xl lg:text-2xl text-white font-[verdana] font-semibold">
                <h2>Unlock the report</h2>
                <h2>of Solar Return</h2>
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
          to="/solar/chart"
          src={sun}
          name="Solar Return"
          heading="Gift Yourself a Solar Return Report this Birthday"
          footdesc="Gain insights into potential opportunities, challenges, and overall trends that may unfold during coming year."
          image={SolarReturn}
          describtion="A solar return chart is an astrology report that predicts the next 12 months of your life based on your birth date, birth time, birth location, and current location. Gain insights into potential opportunities, challenges, and overall trends that may unfold during coming year. "
        />
      </Modal>

      <div className={`p-3 mt-10 w-4/5 ${lockreport && "blur "}`}>
        <Text className="text-2xl lg:text-4xl font-nunito-light text-center ">
          {srReportText}
        </Text>

        <Divider />
        <div className="flex flex-col gap-10 justify-center text-xl align-middle mt-5">
          <div className=" font-serif">
            <h2
              className={`text-2xl lg:text-4xl font-serif ${
                lockreport && "select-none"
              }`}
            >
              {lockreport ? "lorem erjeere " : " Venus in Capricorn"}
            </h2>
            <p className={` ${lockreport && "select-none"}`}>
              {lockreport
                ? ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
                in ducimus. Aliquam est vel commodi autem expedita quidem odit?
                Repellendus iste fugiat rerum aspernatur ea fugit veritatis,
                sapiente architecto et voluptates iure, asperiores illum? Iure
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione`
                : `real report  Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
                in ducimus. Aliquam est vel commodi autem expedita quidem odit?
                Repellendus iste fugiat rerum aspernatur ea fugit veritatis,
                sapiente architecto et voluptates iure, asperiores illum? Iure
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione`}
            </p>
          </div>
          <div className=" font-serif">
            <h2
              className={`text-2xl lg:text-4xl font-serif ${
                lockreport && "select-none"
              }`}
            >
              {lockreport ? "lorem erjeere " : " Venus in Capricorn"}
            </h2>
            <p className={` ${lockreport && "select-none"}`}>
              {lockreport
                ? ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
                in ducimus. Aliquam est vel commodi autem expedita quidem odit?
                Repellendus iste fugiat rerum aspernatur ea fugit veritatis,
                sapiente architecto et voluptates iure, asperiores illum? Iure
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione`
                : `real report  Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
                in ducimus. Aliquam est vel commodi autem expedita quidem odit?
                Repellendus iste fugiat rerum aspernatur ea fugit veritatis,
                sapiente architecto et voluptates iure, asperiores illum? Iure
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione
                eius doloremque ex ratione cumque quia, tenetur laboriosam ea,
                neque laudantium saepe. Et, quam adipisci. Repellendus iste fugiat
                rerum aspernatur ea fugit veritatis, sapiente architecto et
                voluptates iure, asperiores illum? Iure eius doloremque ex ratione`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SrReport;
