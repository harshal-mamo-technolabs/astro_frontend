import Residance from "./Residance";
import {
  Box,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useMemo } from "react";
import { CardContext } from "../../context/CardsDataContext";
import axios from "axios";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SrAspescts = () => {
  const { solardatas, setSolarDatas } = useContext(CardContext);
  useEffect(() => {
    axios
      .get("https://paste.soulharsh007.dev/4b2cd0b.json")
      .then((res) => setSolarDatas({ ...solardatas, aspects: res.data.data }))
      .catch((err) => console.log(err));
  }, []);

  const staticTexts = useMemo(() => ["SR Aspects", "Planet", "Aspecting planet", "Type", "Orb"], []);
  const translatedStaticTexts = useTranslatedTexts(staticTexts);

  return (
    <div className="flex flex-col justify-center">
      <Box className="flex justify-center">
        <Box className="text-xl lg:text-2xl w-4/5 font-nunito-light ">
          <Residance />
        </Box>
      </Box>

      <Box className="mt-10">
        <Text className="text-center text-2xl lg:text-3xl font-semibold text-white">
          {translatedStaticTexts[0]}
        </Text>

        <div className="flex justify-center">
          <Box w={550}>
            <Divider />
          </Box>
        </div>
        <div className="mt-4">
          <div className=" flex justify-center text-xl m-2 lg:m-0 ">
            <TableContainer className="bg-[#33175b] text-white rounded-md mb-4 lg:w-[50%] ">
              <Table colorScheme="" variant={"ustyle"}>
                <Tbody>
                  <Tr className="mb-4 border-b-[2px]">
                    <Td>{translatedStaticTexts[1]}</Td>
                    <Td>{translatedStaticTexts[2]}</Td>
                    <Td>{translatedStaticTexts[3]}</Td>
                    <Td>{translatedStaticTexts[4]}</Td>
                  </Tr>
                  {solardatas?.aspects?.map((data, index) => {
                    return (
                      <>
                        <Tr className="mb-4 border-b-[1px]" key={index}>
                          <Td>{data.solar_return_planet}</Td>
                          <Td>{data.natal_planet}</Td>
                          <Td>{data.type}</Td>
                          <Td className="">{data.orb}</Td>{" "}
                        </Tr>
                      </>
                    );
                  })}

                  {/* <Tr className="mb-4 border-b-[1px]">
                    <Td>Sun</Td>
                    <Td>rSquare</Td>
                    <Td>yJupiter</Td>
                    <Td className="">4.9</Td>{" "}
                  </Tr>
                  <Tr className="mb-4 border-b-[1px]">
                    <Td>moon</Td>
                    <Td>rSquare</Td>
                    <Td>yJupiter</Td>
                    <Td className="">4.9</Td>{" "}
                  </Tr>{" "}
                  <Tr className="mb-4 border-b-[1px]">
                    <Td>Sun</Td>
                    <Td>rSquare</Td>
                    <Td>yJupiter</Td>
                    <Td className="">4.9</Td>{" "}
                  </Tr> */}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default SrAspescts;
