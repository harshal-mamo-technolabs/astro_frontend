import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryConflicting = () => {
    const { synastryData } = useSynastryData();

    const conflictingTexts = useMemo(() => [
        "No Conflicting Aspect Reading data available.",
        "Conflicting Aspect Reading highlights the challenging and difficult aspects between two individuals' charts.",
        "Conflicting Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noConflictingText, conflictingDescriptionText, conflictingAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(conflictingTexts);

    console.log("Synastry Data in SynastryConflicting:", synastryData);

    const conflictingAspects = useMemo(() => {
        if (!synastryData?.aspectReadings?.conflicting) {
            console.log("Conflicting Aspect Reading data not found.");
            return [];
        }
        return synastryData.aspectReadings.conflicting;
    }, [synastryData]);

    if (!conflictingAspects.length) {
        console.log("No Conflicting Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noConflictingText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
            <Text fontSize="lg" mb={4}>
                {conflictingDescriptionText}
            </Text>

            <div>
                <h2 className="text-2xl text-center mb-4">{conflictingAspectsText}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conflictingAspects.map((aspect, index) => (
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

export default SynastryConflicting;