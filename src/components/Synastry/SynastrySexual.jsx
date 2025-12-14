import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastrySexual = () => {
    const { synastryData } = useSynastryData();

    const sexualTexts = useMemo(() => [
        "No Sexual Aspect Reading data available.",
        "Sexual Aspect Reading highlights the intimate and physical compatibility between two individuals' charts.",
        "Sexual Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noSexualText, sexualDescriptionText, sexualAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(sexualTexts);

    console.log("Synastry Data in SynastrySexual:", synastryData);

    const { sexualContent, sexualMessage } = useMemo(() => {
        const sexualData = synastryData?.compatibilityReadings?.sexual || {};
        return {
            sexualContent: sexualData.content || [],
            sexualMessage: sexualData.message?.[0] || null,
        };
    }, [synastryData]);

    console.log("Sexual Content:", sexualContent);
    console.log("Sexual Message:", sexualMessage);

    if (!sexualContent.length && !sexualMessage) {
        console.log("No Sexual Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noSexualText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">
            <Text fontSize="lg" mb={4}>
                {sexualDescriptionText}
            </Text>

            {sexualContent.length === 0 && sexualMessage && (
                <div className="bg-[#33175b] p-4 rounded-md text-lg">
                    <p>{sexualMessage}</p>
                </div>
            )}

            {sexualContent.length > 0 && (
                <div>
                    <h2 className="text-2xl text-center mb-4">{sexualAspectsText}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sexualContent.map((aspect, index) => (
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

export default SynastrySexual;