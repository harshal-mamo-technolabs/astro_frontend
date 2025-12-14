import { Box, Flex, Text } from "@chakra-ui/react";
import { useDivineData } from "../../context/DivineDataContext";
import { useMemo } from "react";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const Houses = () => {
  const { divineData } = useDivineData();

  const getOrdinal = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return `${num}st`;
    if (j === 2 && k !== 12) return `${num}nd`;
    if (j === 3 && k !== 13) return `${num}rd`;
    return `${num}th`;
  };


  const houseCusps = useMemo(() => {
    if (!divineData?.astrologyData?.houseCusps?.houses) return [];
    return divineData.astrologyData.houseCusps.houses.map((house) => {
      const [degree, longitude, seconds] = house.longitude.split(":").map(Number); // Split longitude into degree, minutes, and seconds
      return {
        house: house.house,
        sign: house.sign,
        degree,
        longitude,
        seconds,
      };
    });
  }, [divineData]);

  const staticTexts = useMemo(
    () => [
      "No data available for the selected user.",
      "Chart houses split the chart into twelve realms, beginning from the Ascendant, which add another dimension of themes corresponding to the signs starting from Aries.",
    ],
    []
  );

  const [noDataText, introText] = useTranslatedTexts(staticTexts);

  if (!divineData || !divineData.astrologyData?.houseCusps?.houses?.length) {
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
        {introText}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {houseCusps.map((house, index) => (
          <div key={index} className="text-lg">
            <p>
              • <span className="font-semibold">{getOrdinal(house.house)} house</span> starts at {house.degree}° {house.longitude}′ {house.seconds}″{" "}
              <span className="font-semibold">{house.sign}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;