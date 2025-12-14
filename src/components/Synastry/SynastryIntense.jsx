import React, { useMemo } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useSynastryData } from "../../context/DivineSynastry";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";

const SynastryIntense = () => {
    const { synastryData } = useSynastryData();

    const intenseTexts = useMemo(() => [
        "No Intense Aspect Reading data available.",
        "Intense Aspect Reading highlights the powerful and transformative aspects between two individuals' charts.",
        "Intense Aspects",
        "Aspect:",
        "Type:",
        "Orb:",
        "Between:",
        "Unknown",
        "and"
    ], []);

    const [noIntenseText, intenseDescriptionText, intenseAspectsText, aspectText, typeText, orbText, betweenText, unknownText, andText] = useTranslatedTexts(intenseTexts);

    console.log("Synastry Data in SynastryIntense:", synastryData);


    const intenseAspects = useMemo(() => {
        if (!synastryData?.aspectReadings?.intense) {
            console.log("Intense Aspect Reading data not found.");
            return [];
        }
        return synastryData.aspectReadings.intense;
    }, [synastryData]);


    console.log("Intense Aspect Reading Data:", intenseAspects);

    if (!intenseAspects.length) {
        console.log("No Intense Aspect Reading data available.");
        return (
            <Flex justify="center" align="center" height="100vh">
                <div style={{ fontSize: "1.5rem", color: "white" }}>
                    {noIntenseText}
                </div>
            </Flex>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full container mx-auto p-4 gap-y-4 text-white">

            <Text fontSize="lg" mb={4}>
                {intenseDescriptionText}
            </Text>


            <div>
                <h2 className="text-2xl text-center mb-4">{intenseAspectsText}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {intenseAspects.map((aspect, index) => (
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

export default SynastryIntense;