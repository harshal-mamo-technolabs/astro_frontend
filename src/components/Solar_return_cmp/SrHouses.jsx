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
import Residance from "./Residance";
import { useContext, useEffect, useMemo } from "react";
import { CardContext } from "../../context/CardsDataContext";
import axios from "axios";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SrHouses = () => {
  const { solardatas, setSolarDatas } = useContext(CardContext);
  console.log(solardatas, "solar datas");

  useEffect(() => {
    axios
      .get("https://paste.soulharsh007.dev/6645129.json")
      .then((res) => setSolarDatas({ ...solardatas, houses: res.data.data }))
      .catch((err) => console.log(err));
  }, []);

  const staticTexts = useMemo(() => ["SR Houses", "House", "Sign", "Degree"], []);
  const translatedStaticTexts = useTranslatedTexts(staticTexts);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <Box className="text-xl lg:text-2xl w-4/5 font-nunito-light">
          <Residance />
        </Box>
      </div>

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
                  </Tr>
                  {solardatas?.houses?.houses?.map((data, index) => {
                    return (
                      <Tr className="mb-4 border-b-[1px]" key={index}>
                        <Td>{data.house}</Td>
                        <Td>{data.sign}</Td>
                        <Td>{data.degree.toFixed(3)}</Td>
                      </Tr>
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

export default SrHouses;
