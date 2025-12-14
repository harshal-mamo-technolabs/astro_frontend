import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryContrasting = () => {
    const { synastryData } = useSynastryData();

    const contrastingTexts = useMemo(() => [
        "No Contrasting Aspect Reading data available.",
        "Contrasting Aspect Reading highlights the unique and differing aspects between two individuals' charts.",
        "Contrasting Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noContrastingText, contrastingDescriptionText, contrastingAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(contrastingTexts);

    const contrastingAspects = useMemo(() => {
        if (!synastryData?.aspectReadings?.contrasting) {
            console.log("Contrasting Aspect Reading data not found.");
            return [];
        }
        return synastryData.aspectReadings.contrasting;
    }, [synastryData]);

    console.log("Contrasting Aspect Reading Data:", contrastingAspects);

    if (!contrastingAspects.length) {
        console.log("No Contrasting Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noContrastingText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {contrastingDescriptionText}
            </Text>

            <div>
                <h2 className="text-2xl text-center mb-4">{contrastingAspectsText}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contrastingAspects.map((aspect, index) => (
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

export default SynastryContrasting;