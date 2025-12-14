import {
  Box,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import Residance from "./Residance";
import { useContext, useEffect, useMemo } from "react";
import { CardContext } from "../../context/CardsDataContext";
import axios from "axios";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SrPlanets = () => {
  const { solardatas,setSolarDatas } = useContext(CardContext);
  console.log(solardatas?.planets, "asasasa");
  useEffect(() => {
    axios
      .get("https://paste.soulharsh007.dev/e709871.json")
      .then((res) => setSolarDatas({ ...solardatas, planets: res.data.data }))
      .catch((err) => console.log(err));
  }, []);

  const staticTexts = useMemo(() => ["SR Planets", "Name", "Retro", "Sign"], []);
  const translatedStaticTexts = useTranslatedTexts(staticTexts);

  return (
    <div className="flex justify-center">
      <Box className="text-xl lg:text-2xl w-4/5 font-nunito-light">
        <Residance />

        <Box>
          <h2 className="text-center  text-2xl lg:text-3xl text-white  mt-5 font-nunito-light">
            {translatedStaticTexts[0]}
          </h2>
          <Flex justify={"center"}>
            <div className="w-2/4">
              <Divider />
            </div>
          </Flex>
        </Box>
        {/* <div className="mt-4">
          <div className=" flex justify-center text-xl  lg:m-0">
            <TableContainer
              w={{ base: "100%", lg: "50%", md: "50%", xs: "50%", xl: "50%" }}
              className="bg-[#33175b] text-white rounded-md mb-4"
            >
              <Table variant="striped" colorScheme="">
                <Tbody>
                  <Tr className="mb-4">
                    <Td>sun</Td>
                    <Td>12`55`</Td>
                    <Td className="">
                      <span className="flex">
                        <GiSagittarius />
                        <p>sag</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>
                  <Tr className="mb-4">
                    <Td>moo</Td>
                    <Td>12`55`</Td>
                    <Td>
                      <span className="flex">
                        <GiLeo />
                        <p>leo</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#e1fbe5] text-black rounded-full p-2">
                        Fixed
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>
                  <Tr>
                    <Td>mer</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <GiSagittarius />
                        <p>sag</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Earth
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#f1deff] text-black rounded-full p-2">
                        Cardinal
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>
                  <Tr>
                    <Td>Ven</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#e1fbe5] text-black rounded-full p-2">
                        Fixed
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Mar</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Jup</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Sat</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Ura</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <GiSagittarius />
                        <p>sag</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Nep</Td>
                    <Td>12`55`</Td>
                    <Td>
                      <span className="flex">
                        <GiSagittarius />
                        <p>sag</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Plu</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>Lib</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Nad</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Chi</Td>
                    <Td>12`55`</Td>
                    <Td>
                      {" "}
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                  <Tr>
                    <Td>Par</Td>
                    <Td>12`55`</Td>
                    <Td>
                      <span className="flex">
                        <TbZodiacCapricorn />
                        <p>cap</p>
                      </span>
                    </Td>
                    <Td className="">
                      <p className="bg-[#ffcccf] text-black rounded-full p-2">
                        Fire
                      </p>
                    </Td>{" "}
                    <Td className="">
                      <p className="bg-[#fff5d3] text-black rounded-full p-2">
                        Mutable
                      </p>
                    </Td>
                    <Td>4th H.</Td>
                  </Tr>{" "}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div> */}
        <div className="mt-4">
          <div className="flex justify-center text-xl m-2 lg:m-0">
            <TableContainer className="bg-[#33175b] border-2 text-white rounded-md mb-4 lg:w-[70%]">
              <Table colorScheme="">
                <Tbody>
                  <Tr className="mb-4 border-b-[2px] font-bold">
                    <Td>{translatedStaticTexts[1]}</Td>
                    <Td>{translatedStaticTexts[2]}</Td>
                    <Td>{translatedStaticTexts[3]}</Td>
                  </Tr>
                  {solardatas?.planets?.map((cusps, index) => (
                    <Tr key={index} className="mb-4 border-b-[1px]">
                      {/* <Td className="flex">
                        {" "}
                        {getPlanetIcon(cusps.name)} {cusps.name}
                      </Td> */}
                      <Td>{cusps.name}</Td>
                      <Td>{cusps.isRetro}</Td>
                      <Td>{cusps.sign}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default SrPlanets;
