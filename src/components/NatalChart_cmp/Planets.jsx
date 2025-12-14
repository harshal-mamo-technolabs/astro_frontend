import { Box, Flex } from "@chakra-ui/react";
import { useDivineData } from "../../context/DivineDataContext";
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const Planets = () => {
  const { divineData } = useDivineData();

  const formattedPlanets = useMemo(() => {
    if (!divineData?.astrologyData?.planetaryPositions) return [];

    return divineData.astrologyData.planetaryPositions.map((planet) => {
      const [degree, minutes] = planet.longitude.split(":").map(Number);

      return {
        name: planet.name,
        sign: planet.sign,
        degree,
        longitude: minutes,
        house: planet.house,
      };
    });
  }, [divineData]);

  const staticTexts = useMemo(
    () => [
      "No data available for the selected user.",
      "You can think of the planets as symbolizing core parts of the human personality, and the signs as different colors of consciousness through which they filter.",
    ],
    []
  );
  const [noDataText, planetsIntroText] = useTranslatedTexts(staticTexts);

  if (!divineData || !divineData.astrologyData?.planetaryPositions?.length) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {noDataText}
        </Box>
      </Flex>
    );
  }

  // Helper function to get ordinal suffix
  const getOrdinal = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + "st";
    if (j === 2 && k !== 12) return num + "nd";
    if (j === 3 && k !== 13) return num + "rd";
    return num + "th";
  };

  return (
    <div className="flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
      <p className="text-lg">{planetsIntroText}</p>

      <div className="grid grid-cols-2 gap-4">
        {formattedPlanets.map((planet, index) => (
          <div key={index} className="text-lg">
            <p>
              • <span className="font-semibold">{planet.name}</span> in {planet.degree}° {planet.longitude}′ {planet.sign}{" "}
              <span className="font-semibold">({getOrdinal(planet.house)} house)</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;