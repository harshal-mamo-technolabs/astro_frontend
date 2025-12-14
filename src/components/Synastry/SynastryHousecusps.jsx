import React, { useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryHousecusps = () => {
    const { synastryData } = useSynastryData();

    const houseCuspsTexts = useMemo(() => [
        "No house cusps data available.",
        "House cusps describe the division of the astrological chart into twelve houses, representing different areas of life for",
        "and",
        ".",
        "'s House Cusps",
        "House",
        ":",
        "in"
    ], []);

    const [noHouseCuspsText, houseCuspsDescriptionText1, houseCuspsDescriptionText2, houseCuspsDescriptionText3, houseCuspsTitleText, houseText, colonText, inText] = useTranslatedTexts(houseCuspsTexts);

    console.log("Synastry Data in SynastryHousecusps:", synastryData);


    const houseCuspsData = useMemo(() => {
        if (!synastryData?.houseCusps) {
            console.log("House cusps data not found in synastryData.");
            return { p1HouseCusps: [], p2HouseCusps: [], p1Name: "", p2Name: "" };
        }

        const { p1_data, p2_data } = synastryData.houseCusps;

        return {
            p1HouseCusps: p1_data?.houses || [],
            p2HouseCusps: p2_data?.houses || [],
            p1Name: synastryData.profiles?.mainUser?.name || "Main User",
            p2Name: synastryData.profiles?.partner?.name || "Partner",
        };
    }, [synastryData]);


    console.log("Processed House Cusps Data:", houseCuspsData);

    if (!houseCuspsData.p1HouseCusps.length && !houseCuspsData.p2HouseCusps.length) {
        console.log("No house cusps data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <Box fontSize="2xl" color="white">
                    {noHouseCuspsText}
                </Box>
            </Flex>
        );
    }

    return (
        <div className="flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {houseCuspsDescriptionText1} {houseCuspsData.p1Name} {houseCuspsDescriptionText2} {houseCuspsData.p2Name}{houseCuspsDescriptionText3}
            </Text>


            <div>
                <h2 className="text-2xl text-center mb-4">{houseCuspsData.p1Name}{houseCuspsTitleText}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {houseCuspsData.p1HouseCusps.map((house, index) => (
                        <div key={index} className="text-lg">
                            <p>
                                • <span className="font-semibold">{houseText} {index + 1}{colonText}</span> {house.degree}° {inText} {house.sign}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <h2 className="text-2xl text-center mb-4">{houseCuspsData.p2Name}{houseCuspsTitleText}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {houseCuspsData.p2HouseCusps.map((house, index) => (
                        <div key={index} className="text-lg">
                            <p>
                                • <span className="font-semibold">{houseText} {index + 1}{colonText}</span> {house.degree}° {inText} {house.sign}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SynastryHousecusps;