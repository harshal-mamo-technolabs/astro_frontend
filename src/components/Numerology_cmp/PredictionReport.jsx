import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Button, Text, Center, Badge } from "@chakra-ui/react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useEffect, useState, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";

const PredictionReport = () => {
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [lockHover, setLockHover] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTrialActive, setIsTrialActive] = useState(false);

  const loadingText = useTranslatedText("Loading...");
  const unlockReportText = useTranslatedText("Unlock This Report");
  const unlockNumerologyReportText = useTranslatedText("Unlock this Numerology Report");
  const asPremiumUserText = useTranslatedText("As a Premium user");
  const freeDetailedReportsText = useTranslatedText("you get FREE detailed Numerology reports");
  const upgradeToAccessText = useTranslatedText("Upgrade to access this section. The following remain available on Trial:");
  const upgradeNowText = useTranslatedText("Upgrade Now");
  const continueTrialText = useTranslatedText("Continue with trial sections");
  const numerologyPremiumReportText = useTranslatedText("Numerology Premium Report");

  const badgeTexts = useMemo(() => [
    "Numerology",
    "Life Path",
    "Personality",
    "Expression",
    "Soul Urge",
    "Subconscious Self"
  ], []);
  const translatedBadgeTexts = useTranslatedTexts(badgeTexts);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_BASE_URL}subscriptions/v2`;
        const res = await fetch(endpoint, { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" });
        const result = await res.json();
        const sub = result?.data?.subscriptions?.[0] || null;
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
        setIsTrialActive(detectedTrial);
      } catch (e) {
        setIsTrialActive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  if (loading) {
    return <Box className="min-h-[60vh] flex items-center justify-center text-white">{loadingText}</Box>;
  }

  if (isTrialActive) {
    console.log("[NumerologyReport] Trial detected; blocking content.");
    return (
      <div style={{ position: "relative", minHeight: "80vh" }}>
        <Box
          as="span"
          onMouseOver={() => setLockHover(true)}
          onMouseOut={() => setLockHover(false)}
          onClick={() => setUpsellOpen(true)}
          className="bg-[#6255d9] flex rounded-full h-fit absolute cursor-pointer transition-transform"
          px={{ base: 3, md: 4 }}
          py={{ base: 2, md: 2 }}
          style={{ position: "fixed", zIndex: 5, left: "50%", bottom: "5rem", transform: `translate(-50%, ${lockHover ? "-10px" : "0"})`, boxShadow: "0 10px 20px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}
        >
          <Text color="white" fontSize={{ base: "md", md: "xl" }} pr={{ base: 2, md: 3 }}>{unlockReportText}</Text>
          <Box className="flex justify-center items-center text-white">{lockHover ? <CiUnlock size={28} /> : <CiLock size={28} />}</Box>
        </Box>

        <Modal isOpen={upsellOpen} onClose={() => setUpsellOpen(false)} isCentered closeOnOverlayClick={false} closeOnEsc={false} size={{ base: "sm", md: "lg" }}>
          <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
          <ModalContent bgGradient="linear(to-b, #201336, #190C26)" borderWidth="1px" borderColor="purple.700" boxShadow="0 0 0 1px rgba(147,38,219,0.25), 0 20px 40px rgba(0,0,0,0.4)" rounded="xl" mx={{ base: 3, md: 0 }} maxW={{ base: "calc(100% - 24px)", md: "lg" }}>
            <ModalCloseButton color="white" _hover={{ color: "white", bg: "transparent" }} _focus={{ boxShadow: "none" }} />
            <ModalBody pt={8} pb={2}>
              <Center>
                <Box bgGradient="linear(to-b, purple.500, purple.300)" rounded="full" p={1.5} boxShadow="0 10px 30px rgba(147,38,219,0.45)">
                  <Center bg="#2a1846" rounded="full" boxSize={{ base: "60px", md: "72px" }}>
                    <CiLock size={32} color="#ffffff" />
                  </Center>
                </Box>
              </Center>
              <Text textAlign="center" mt={5} fontSize={{ base: "xl", md: "2xl" }} fontWeight="extrabold" bgGradient="linear(to-r, #b794f4, #e9d8fd)" bgClip="text">{unlockNumerologyReportText}</Text>
              <Text textAlign="center" mt={3} color="white" fontSize={{ base: "md", md: "lg" }}>{asPremiumUserText}</Text>
              <Text textAlign="center" color="purple.200" fontSize={{ base: "md", md: "lg" }}>{freeDetailedReportsText}</Text>
              <Box mt={5}>
                <Text textAlign="center" color="whiteAlpha.900" fontSize="sm">{upgradeToAccessText}</Text>
                <Center mt={3}>
                  <Box>
                    <Badge colorScheme="purple" variant="subtle" mr={2} mb={2}>{translatedBadgeTexts[0]}</Badge>
                    <Badge colorScheme="purple" variant="subtle" mr={2} mb={2}>{translatedBadgeTexts[1]}</Badge>
                    <Badge colorScheme="purple" variant="subtle" mr={2} mb={2}>{translatedBadgeTexts[2]}</Badge>
                    <Badge colorScheme="purple" variant="subtle" mr={2} mb={2}>{translatedBadgeTexts[3]}</Badge>
                    <Badge colorScheme="purple" variant="subtle" mr={2} mb={2}>{translatedBadgeTexts[4]}</Badge>
                    <Badge colorScheme="purple" variant="subtle" mr={2} mb={2}>{translatedBadgeTexts[5]}</Badge>
                  </Box>
                </Center>
              </Box>
            </ModalBody>
            <ModalFooter flexDir="column" gap={3} pt={0} pb={6}>
              <Button w="full" maxW="360px" size="lg" rounded="full" bgGradient="linear(to-r, #7F1BD0, #9b34f0)" _hover={{ bgGradient: "linear(to-r, #6b13bb, #8e2be6)" }} color="white" onClick={() => (window.location.href = "/settings/plans/premiumplanStatus/changeplan?upgrade=true&plan=TRIAL")}>{upgradeNowText}</Button>
              <Button variant="ghost" colorScheme="purple" onClick={() => (window.location.href = "/numerology/numerology")}>{continueTrialText}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex justify-center text-white ">
      <Box className="m-10">{numerologyPremiumReportText}</Box>
    </div>
  );
};

export default PredictionReport;
