import { Box, Divider, Text } from "@chakra-ui/react";
import "../Horoscope/HoroScope.css";
import { useDivineData } from "../../context/DivineDataContext";
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const NatalPersonality = () => {
  const { divineData } = useDivineData();
  console.log(divineData, "Divine Data");

  const personalityReport = useMemo(() => {
    return divineData?.astrologyData?.personality?.report || [];
  }, [divineData]);

  const risingSign = useMemo(() => {
    return divineData?.astrologyData?.ascendantReport?.sign || "Unknown";
  }, [divineData]);

  const degreeInfo = useMemo(() => {
    const fullDegree = parseFloat(divineData?.astrologyData?.ascendantReport?.full_degree || 0);
    const degree = Math.floor(fullDegree);
    const longitude = Math.round((fullDegree - degree) * 60);
    return { degree, longitude };
  }, [divineData]);

  const reportParagraphs = useMemo(() => {
    if (!divineData?.astrologyData?.ascendantReport?.result) return [];
    return divineData.astrologyData.ascendantReport.result.split("\n\n");
  }, [divineData]);

  const staticTexts = useMemo(
    () => [
      "Personality",
      "Rising Sign:",
      "Degree:",
      "No personality data available.",
    ],
    []
  );

  const [personalityText, risingSignText, degreeText, noDataText] = useTranslatedTexts(staticTexts);

  return (
    <div className="flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
      <Text className="text-2xl lg:text-4xl font-nunito-light text-center">
        {personalityText}
      </Text>

      <Divider />

      <div className="text-white text-lg mt-5">
        <p>
          <span className="font-bold">{risingSignText}</span> {risingSign}
        </p>
        <p>
          <span className="font-bold">{degreeText}</span> {degreeInfo.degree}° {degreeInfo.longitude}′
        </p>
      </div>

      <div className="p-4">
        <ul className="list-disc list-inside text-justify">
          {reportParagraphs.length > 0 ? (
            reportParagraphs.map((paragraph, index) => (
              <li key={index} className="mb-2">{paragraph}</li>
            ))
          ) : (
            <p>{noDataText}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NatalPersonality;