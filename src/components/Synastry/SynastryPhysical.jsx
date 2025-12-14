import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryPhysical = () => {
    const { synastryData } = useSynastryData();

    const physicalTexts = useMemo(() => [
        "No Physical Aspect Reading data available.",
        "Physical Aspect Reading highlights the physical and tangible connections between two individuals' charts.",
        "Physical Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noPhysicalText, physicalDescriptionText, physicalAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(physicalTexts);

    console.log("Synastry Data in SynastryPhysical:", synastryData);


    const { physicalContent, physicalMessage } = useMemo(() => {
        const physicalData = synastryData?.compatibilityReadings?.physical || {};
        return {
            physicalContent: physicalData.content || [],
            physicalMessage: physicalData.message?.[0] || null,
        };
    }, [synastryData]);


    console.log("Physical Content:", physicalContent);
    console.log("Physical Message:", physicalMessage);

    if (!physicalContent.length && !physicalMessage) {
        console.log("No Physical Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noPhysicalText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {physicalDescriptionText}
            </Text>


            {physicalContent.length === 0 && physicalMessage && (
                <div className="bg-[#33175b] p-4 rounded-md text-lg">
                    <p>{physicalMessage}</p>
                </div>
            )}


            {physicalContent.length > 0 && (
                <div>
                    <h2 className="text-2xl text-center mb-4">{physicalAspectsText}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {physicalContent.map((aspect, index) => (
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
            )}
        </div>
    );
};

export default SynastryPhysical;