import { Box, Flex, Text } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry"; // Import SynastryDataContext
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryAspescts = () => {
  const { synastryData } = useSynastryData(); // Fetch data from Synastry context

  const aspectsTexts = useMemo(() => [
    "No aspect data available.",
    "The aspects describe the geometric angles between the planets of",
    "and",
    ". Each shape they produce has a different meaning.",
    "Aspects from",
    "to"
  ], []);

  const [noAspectDataText, aspectsDescriptionText1, aspectsDescriptionText2, aspectsDescriptionText3, aspectsFromText, aspectsToText] = useTranslatedTexts(aspectsTexts);

  // Log the entire synastryData for debugging
  console.log("Synastry Data in SynastryAspescts:", synastryData);

  // Extract and format aspects data
  const aspectData = useMemo(() => {
    if (!synastryData?.aspectTable) {
      console.log("Aspect table not found in synastryData.");
      return { p1ToP2: [], p2ToP1: [], p1Name: "", p2Name: "" };
    }

    const { p1_p2_aspect, p2_p1_aspect } = synastryData.aspectTable;

    console.log("p1_p2_aspect:", p1_p2_aspect);
    console.log("p2_p1_aspect:", p2_p1_aspect);

    return {
      p1ToP2: p1_p2_aspect.aspects || [], // Extract the actual aspect data array
      p2ToP1: p2_p1_aspect.aspects || [], // Extract the actual aspect data array
      p1Name: p1_p2_aspect.planetOne || "Main User", // Name of the first entity
      p2Name: p1_p2_aspect.planetTwo || "Partner", // Name of the second entity
    };
  }, [synastryData]);

  // Log the processed aspect data
  console.log("Processed Aspect Data:", aspectData);

  if (!aspectData.p1ToP2.length && !aspectData.p2ToP1.length) {
    console.log("No aspect data available.");
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {noAspectDataText}
        </Box>
      </Flex>
    );
  }

  return (
    <div className="flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
      {/* Introductory Text */}
      <Text fontSize="lg" mb={4}>
        {aspectsDescriptionText1} {aspectData.p1Name} {aspectsDescriptionText2} {aspectData.p2Name}{aspectsDescriptionText3}
      </Text>

      {/* Aspects from Main User to Partner */}
      <div>
        <h2 className="text-2xl text-center mb-4">{aspectsFromText} {aspectData.p1Name} {aspectsToText} {aspectData.p2Name}</h2>
        <div className="grid grid-cols-2 gap-4">
          {aspectData.p1ToP2.map((aspect, index) => (
            <div key={index} className="text-lg">
              <p>
                • <span className="font-semibold">{aspect.planetOne}</span> {aspect.aspect}{" "}
                <span className="font-semibold">{aspect.planetTwo}</span> (orb: {aspect.orb}°)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Aspects from Partner to Main User */}
      <div>
        <h2 className="text-2xl text-center mb-4">{aspectsFromText} {aspectData.p2Name} {aspectsToText} {aspectData.p1Name}</h2>
        <div className="grid grid-cols-2 gap-4">
          {aspectData.p2ToP1.map((aspect, index) => (
            <div key={index} className="text-lg">
              <p>
                • <span className="font-semibold">{aspect.planetOne}</span> {aspect.aspect}{" "}
                <span className="font-semibold">{aspect.planetTwo}</span> (orb: {aspect.orb}°)
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SynastryAspescts;