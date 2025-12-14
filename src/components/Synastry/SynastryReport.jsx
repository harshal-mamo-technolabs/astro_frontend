import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryReport = () => {
  const { synastryData } = useSynastryData();

  const reportTexts = useMemo(() => [
    "No Harmonious Aspect Reading data available.",
    "Harmonious Aspect Reading provides insights into the positive and supportive aspects between two individuals' charts.",
    "Harmonious Aspects",
    "Aspect:",
    "Type:",
    "Orb:",
    "Between:",
    "Unknown",
    "and"
  ], []);

  const [noHarmoniousText, harmoniousDescriptionText, harmoniousAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(reportTexts);

  const harmoniousAspects = useMemo(() => {
    if (!synastryData?.aspectReadings?.harmonious) {
      console.log("Harmonious Aspect Reading data not found.");
      return [];
    }
    return synastryData.aspectReadings.harmonious;
  }, [synastryData]);

  console.log("Harmonious Aspect Reading Data:", harmoniousAspects);

  if (!harmoniousAspects.length) {
    console.log("No Harmonious Aspect Reading data available.");
    return (
      <Flex justify="center" align="center" height="100vh">
        <div style={{ fontSize: "1.5rem", color: "white" }}>
          {noHarmoniousText}
        </div>
      </Flex>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
      <Text fontSize="lg" mb={4}>
        {harmoniousDescriptionText}
      </Text>

      <div>
        <h2 className="text-2xl text-center mb-4">{harmoniousAspectsText}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {harmoniousAspects.map((aspect, index) => (
            <div key={index} className="text-lg bg-[#33175b] p-4 rounded-md">
              <p>
                • <span className="font-semibold">{aspectText}</span> {aspect.aspect}
              </p>
              <p>
                • <span className="font-semibold">{typeText}</span> {aspect.aspect_type}
              </p>
              <p>
                • <span className="font-semibold">{orbText}</span> {aspect.orb.toFixed(2)}°
              </p>
              <p>
                • <span className="font-semibold">{betweenText}</span>{" "}
                {aspect.p1?.planet || unknownText} {andText} {aspect.p2?.planet || unknownText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SynastryReport;