import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { useDivineData } from "../../context/DivineDataContext";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const SrChart = () => {
  const { divineData, fetchDivineData, loading, error } = useDivineData();
  const [moonPhaseData, setMoonPhaseData] = useState(null);

  useEffect(() => {
    if (!divineData) {
      fetchDivineData();
    } else {
      console.log("Data already available in context:", divineData);
      const moonPhases = divineData?.astrologyData?.moonPhases || null;
      setMoonPhaseData(moonPhases);
    }
  }, [divineData, fetchDivineData]);

  const loadingText = useTranslatedText("Loading...");
  const errorText = useTranslatedText("Error fetching data");
  const noDataText = useTranslatedText("No data available for the moon phase.");
  const moonPhaseText = useTranslatedText("Moon Phase");
  const descriptionText = useTranslatedText("This section provides an overview of the phase of the moon at the time of your birth and what impact it has on you as an individual.");
  
  const staticTexts = useMemo(() => [
    "Sign:",
    "Degree:",
    "House:",
    "No phase name available",
    "No sign available",
    "No degree available",
    "No house available",
    "No feature available",
    "No details available"
  ], []);
  
  const translatedStaticTexts = useTranslatedTexts(staticTexts);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {loadingText}
        </Box>
      </Flex>
    );
  }

  if (error || !moonPhaseData) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {error ? errorText : noDataText}
        </Box>
      </Flex>
    );
  }

  const [degree, longitude] = moonPhaseData.natal_moon?.longitude
    ? moonPhaseData.natal_moon.longitude.split(":").map(Number)
    : [null, null];

  return (
    <Flex direction="column" gap={10} p={6}>

      <div>
        <h2
          style={{
            fontSize: "2xl",
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "white",
          }}
        >
          {moonPhaseText}
        </h2>
      </div>

      <p className="text-lg" style={{ color: "white" }}>
        {descriptionText}
      </p>

      <div className="text-lg" style={{ color: "white" }}>
        <p>
          • <span className="font-semibold">{moonPhaseData.phase_name || translatedStaticTexts[3]}</span>
        </p>
        <p>
          • <span className="font-semibold">{translatedStaticTexts[0]}</span> {moonPhaseData.natal_moon?.sign || translatedStaticTexts[4]}
        </p>
        <p>
          • <span className="font-semibold">{translatedStaticTexts[1]}</span>{" "}
          {degree !== null ? `${degree}°` : translatedStaticTexts[5]}{" "}
          {longitude !== null ? `${longitude}′` : ""}
        </p>
        <p>
          • <span className="font-semibold">{translatedStaticTexts[2]}</span>{" "}
          {moonPhaseData.natal_moon?.house || translatedStaticTexts[6]}
        </p>
      </div>

      <div className="text-lg" style={{ color: "white" }}>
        <p>{moonPhaseData.content?.feature || translatedStaticTexts[7]}</p>
        <ul className="list-disc list-inside text-justify">
          {moonPhaseData.content?.details?.length > 0
            ? moonPhaseData.content.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))
            : translatedStaticTexts[8]}
        </ul>
      </div>
    </Flex>
  );
};

export default SrChart;