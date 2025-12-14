import { Box, Flex, Text } from "@chakra-ui/react";
import { useDivineData } from "../../context/DivineDataContext";
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const Aspects = () => {
  const { divineData } = useDivineData();

  const partnerData = useMemo(() => {
    if (!divineData?.astrologyData?.aspectTable) return { aspects: [] };
    return {
      aspects: divineData.astrologyData.aspectTable.map(
        ({ planetOne, planetTwo, aspect, orb }) => ({
          planetOne,
          planetTwo,
          aspect,
          orb,
        })
      ),
    };
  }, [divineData]);

  const staticTexts = useMemo(
    () => [
      "No data available for the selected user.",
      "The aspects describe the geometric angles between the planets. Each shape they produce has a different meaning.",
    ],
    []
  );
  const [noDataText, aspectsIntroText] = useTranslatedTexts(staticTexts);

  if (!partnerData.aspects.length) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {noDataText}
        </Box>
      </Flex>
    );
  }

  return (
    <div className="flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
      {/* Introductory Text */}
      <p className="text-lg">
        {aspectsIntroText}
      </p>

      {/* Aspects Section */}
      <div className="grid grid-cols-2 gap-4">
        {partnerData.aspects.map((aspect, index) => (
          <div key={index} className="text-lg">
            <p>
              • <span className="font-semibold">{aspect.planetOne}</span> {aspect.aspect}{" "}
              <span className="font-semibold">{aspect.planetTwo}</span> (orb: {aspect.orb}°)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aspects;