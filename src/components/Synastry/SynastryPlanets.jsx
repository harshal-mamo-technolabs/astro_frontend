import { Box, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryPlanets = () => {
  const { synastryData } = useSynastryData();

  const planetsTexts = useMemo(() => [
    "No planetary data available.",
    "Synastry compares the planetary positions of two individuals to analyze their compatibility and relationship dynamics.",
    "'s Planetary Positions",
    "in",
    "house"
  ], []);

  const [noPlanetaryDataText, synastryDescriptionText, planetaryPositionsText, inText, houseText] = useTranslatedTexts(planetsTexts);

  if (
    !synastryData?.planetaryPositions?.p1_data ||
    !synastryData?.planetaryPositions?.p2_data ||
    !synastryData?.profiles?.mainUser ||
    !synastryData?.profiles?.partner
  ) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Box fontSize="2xl" color="white">
          {noPlanetaryDataText}
        </Box>
      </Flex>
    );
  }

  const { p1_data, p2_data } = synastryData.planetaryPositions;
  const mainUserName = synastryData.profiles.mainUser.name || "Main User";
  const partnerName = synastryData.profiles.partner.name || "Partner";


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

      <p className="text-lg">
        {synastryDescriptionText}
      </p>


      <div>
        <h2 className="text-2xl text-center mb-4">{mainUserName}{planetaryPositionsText}</h2>
        <div className="grid grid-cols-2 gap-4">
          {p1_data.map((planet, index) => (
            <div key={index} className="text-lg">
              <p>
                • <span className="font-semibold">{planet.name}</span> {inText} {planet.longitude}° {planet.sign}{" "}
                <span className="font-semibold">({getOrdinal(planet.house)} {houseText})</span>
              </p>
            </div>
          ))}
        </div>
      </div>


      <div>
        <h2 className="text-2xl text-center mb-4">{partnerName}{planetaryPositionsText}</h2>
        <div className="grid grid-cols-2 gap-4">
          {p2_data.map((planet, index) => (
            <div key={index} className="text-lg">
              <p>
                • <span className="font-semibold">{planet.name}</span> {inText} {planet.longitude}° {planet.sign}{" "}
                <span className="font-semibold">({getOrdinal(planet.house)} {houseText})</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SynastryPlanets;