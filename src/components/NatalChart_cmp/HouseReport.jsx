import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Modal, ModalOverlay, ModalCloseButton, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Center, Badge } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDivineData } from "../../context/DivineDataContext";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useTranslatedTexts, useTranslatedText } from "../../hooks/useTranslatedText";

const HouseReport = () => {
    const { divineData } = useDivineData();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscriptionLoading, setSubscriptionLoading] = useState(true);
    const [isTrialActive, setIsTrialActive] = useState(false);
    const navigate = useNavigate();
    const [upsellOpen, setUpsellOpen] = useState(false);
    const [lockHover, setLockHover] = useState(false);

    const staticTexts = useMemo(
        () => [
            "No data available for the house reports.",
            "House Report",
            "Below you will find a list of the main characteristics that you possess as per your birth chart. This is a summary based on the planet positions, aspects, and patterns that were found in your chart.",
            "Unlock this House Report",
            "As a Premium user",
            "you get FREE detailed Natal House reports",
            "Upgrade to access this section. The following remain available on Trial:",
            "Natal Chart",
            "Personality",
            "Planet Position",
            "House Cups",
            "Aspects",
            "Sign Report",
            "Upgrade Now",
            "Continue with trial sections",
            "No data available for the selected user.",
        ],
        []
    );

    const [
        noHouseDataText,
        houseReportText,
        houseReportIntroText,
        unlockReportText,
        premiumUserText,
        freeDetailedText,
        upgradeAccessText,
        natalChartText,
        personalityText,
        planetPositionText,
        houseCupsText,
        aspectsText,
        signReportText,
        upgradeNowText,
        continueTrialText,
        noUserDataText,
    ] = useTranslatedTexts(staticTexts);

    const loadingText = useTranslatedText("Loading...");


    const getOrdinal = (num) => {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return `${num}st`;
        if (j === 2 && k !== 12) return `${num}nd`;
        if (j === 3 && k !== 13) return `${num}rd`;
        return `${num}th`;
    };

    useEffect(() => {
        const fetchReports = () => {
            try {

                const fetchedReports = divineData?.astrologyData?.houseReports || {};
                console.log("[HouseReport] Fetched House Reports:", fetchedReports);


                const reportsArray = Object.values(fetchedReports);
                setReports(reportsArray);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching house reports data:", error);
                setLoading(false);
            }
        };

        fetchReports();
    }, [divineData]);

    // Fetch subscription status to determine if user is on active trial (STARTER)
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const endpoint = `${import.meta.env.VITE_BASE_URL}subscriptions/v2`;
                console.log("[HouseReport] About to fetch subscription status from:", endpoint);
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                console.log("[HouseReport] Subscription fetch status:", response.status);
                const result = await response.json();
                console.log("[HouseReport] Subscription fetch result:", result);
                const sub = result?.data?.subscriptions?.[0] || null;
                console.log("[HouseReport] Resolved subscription object:", sub);
                // Consider trial active if plan name equals STARTER, code/lookup indicates trial, or explicit type flag
                const planName = sub?.planName;
                const code = sub?.code; // informational only; DO NOT use for trial detection
                const status = sub?.status;
                const type = sub?.type;
                const lookupKey = sub?.lookup_key || sub?.lookupKey;
                const detectedTrial = Boolean(
                    sub && (
                        status === "trialing" ||
                        type === "TRIAL" ||
                        (typeof planName === "string" && planName.toLowerCase().includes("trial")) ||
                        (typeof lookupKey === "string" && lookupKey.toLowerCase().includes("trial"))
                    )
                );
                console.log("[HouseReport] Computed flags:", { planName, code, status, type, lookupKey, detectedTrial });
                if (detectedTrial) {
                    setIsTrialActive(true);
                } else {
                    setIsTrialActive(false);
                }
            } catch (error) {
                console.error("[HouseReport] Error fetching subscription status:", error);
                // In case of error assume not trial to avoid blocking legitimate users
                setIsTrialActive(false);
            } finally {
                console.log("[HouseReport] Subscription loading complete");
                setSubscriptionLoading(false);
            }
        };
        fetchSubscription();
    }, []);

    if (loading || subscriptionLoading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner label={loadingText} size="xl" color="white" />
            </Flex>
        );
    }

    // If user is on trial, do not render the report content at all. Show lock CTA + upsell modal only.
    if (isTrialActive) {
        return (
            <div style={{ position: "relative", minHeight: "80vh" }}>
                {/* Floating lock CTA */}
                <Box
                    as="span"
                    onMouseOver={() => setLockHover(true)}
                    onMouseOut={() => setLockHover(false)}
                    onClick={() => setUpsellOpen(true)}
                    className="bg-[#6255d9] flex rounded-full h-fit absolute cursor-pointer transition-transform"
                    px={{ base: 3, md: 4 }}
                    py={{ base: 2, md: 2 }}
                    style={{
                        position: "fixed",
                        zIndex: 5,
                        left: "50%",
                        bottom: "5rem",
                        transform: `translate(-50%, ${lockHover ? "-10px" : "0"})`,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                        whiteSpace: "nowrap",
                    }}
                >
                    <Text color="white" fontSize={{ base: "md", md: "xl" }} pr={{ base: 2, md: 3 }}>
                        Unlock This Report
                    </Text>
                    <Box className="flex justify-center items-center text-white">
                        {lockHover ? (
                            <CiUnlock size={28} />
                        ) : (
                            <CiLock size={28} />
                        )}
                    </Box>
                </Box>

                {/* Upsell modal */}
                <Modal
                    isOpen={isTrialActive && upsellOpen}
                    onClose={() => navigate("/natalchart/natal-chart")}
                    isCentered
                    closeOnOverlayClick={false}
                    closeOnEsc={false}
                    size={{ base: "sm", md: "lg" }}
                >
                    <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
                    <ModalContent
                        bgGradient="linear(to-b, #201336, #190C26)"
                        borderWidth="1px"
                        borderColor="purple.700"
                        boxShadow="0 0 0 1px rgba(147,38,219,0.25), 0 20px 40px rgba(0,0,0,0.4)"
                        rounded="xl"
                        mx={{ base: 3, md: 0 }}
                        maxW={{ base: "calc(100% - 24px)", md: "lg" }}
                    >
                        <ModalCloseButton color="white" _hover={{ color: "white", bg: "transparent" }} _focus={{ boxShadow: "none" }} />
                        <ModalBody pt={8} pb={2}>
                            <Center>
                                <Box bgGradient="linear(to-b, purple.500, purple.300)" rounded="full" p={1.5} boxShadow="0 10px 30px rgba(147,38,219,0.45)">
                                    <Center bg="#2a1846" rounded="full" boxSize={{ base: "60px", md: "72px" }}>
                                        <CiLock size={32} color="#ffffff" />
                                    </Center>
                                </Box>
                            </Center>
                            <Text textAlign="center" mt={5} fontSize={{ base: "xl", md: "2xl" }} fontWeight="extrabold" bgGradient="linear(to-r, #b794f4, #e9d8fd)" bgClip="text">
                                {unlockReportText}
                            </Text>
                            <Text textAlign="center" mt={3} color="white" fontSize={{ base: "md", md: "lg" }}>{premiumUserText}</Text>
                            <Text textAlign="center" color="purple.200" fontSize={{ base: "md", md: "lg" }}>{freeDetailedText}</Text>
                            <Box mt={5}>
                                <Text textAlign="center" color="whiteAlpha.900" fontSize="sm">{upgradeAccessText}</Text>
                                <Flex mt={3} wrap="wrap" gap={2} justify="center">
                                    <Badge colorScheme="purple" variant="subtle">{natalChartText}</Badge>
                                    <Badge colorScheme="purple" variant="subtle">{personalityText}</Badge>
                                    <Badge colorScheme="purple" variant="subtle">{planetPositionText}</Badge>
                                    <Badge colorScheme="purple" variant="subtle">{houseCupsText}</Badge>
                                    <Badge colorScheme="purple" variant="subtle">{aspectsText}</Badge>
                                    <Badge colorScheme="purple" variant="subtle">{signReportText}</Badge>
                                </Flex>
                            </Box>
                        </ModalBody>
                        <ModalFooter flexDir="column" gap={3} pt={0} pb={6}>
                            <Button
                                w="full"
                                maxW="360px"
                                size="lg"
                                rounded="full"
                                bgGradient="linear(to-r, #7F1BD0, #9b34f0)"
                                _hover={{ bgGradient: "linear(to-r, #6b13bb, #8e2be6)" }}
                                color="white"
                                onClick={() => navigate("/settings/plans/premiumplanStatus/changeplan?upgrade=true&plan=TRIAL")}
                            >
                                {upgradeNowText}
                            </Button>
                            <Button variant="ghost" colorScheme="purple" onClick={() => navigate("/natalchart/natal-chart")}>
                                {continueTrialText}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Box fontSize="2xl" color="white">
                    {noHouseDataText}
                </Box>
            </Flex>
        );
    }

    console.log("[HouseReport] Render with state:", { loading, subscriptionLoading, isTrialActive, reportsCount: reports?.length });
    return (
        <div style={{ position: "relative" }}>
            <Flex justify="center" textColor="white">
                <Box mt={5} w="90%">
                    <Text fontSize="4xl" textAlign="center" fontWeight="light">
                        {houseReportText}
                    </Text>

                    <Box mt={10}>
                        <Text fontSize="lg" mb={6}>
                            {houseReportIntroText}
                        </Text>


                        <Tabs variant="enclosed" colorScheme="purple">
                            <TabList>
                                {reports.map((report) => (
                                    <Tab key={report.planet_name}>{report.planet_name}</Tab>
                                ))}
                            </TabList>

                            <TabPanels>
                                {reports.map((report) => (
                                    <TabPanel key={report.planet_name}>
                                        <Text fontSize="2xl" fontWeight="semibold" mb={4}>
                                            {report.planet_name} is in {getOrdinal(report.house)} house
                                        </Text>
                                        <ul className="list-disc ml-6 mb-4">
                                            {report.report.split(/[\r\n]+/).map((item, index) => (
                                                <li key={index}>
                                                    <Text>{item}</Text>
                                                </li>
                                            ))}
                                        </ul>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Flex>

            
        </div>
    );
};

export default HouseReport;