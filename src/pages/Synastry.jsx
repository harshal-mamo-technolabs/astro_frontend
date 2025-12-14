import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Box, Image, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, Text, Flex, Center, Badge } from "@chakra-ui/react";
import SynastryHeader from "../components/Synastry/SynastryHeader";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import { useEffect, useContext, useMemo, useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useProfile } from "../context/Profile";
import { useSynastryData } from "../context/DivineSynastry";
import { CardContext } from "../context/CardsDataContext";
import bg from "../assets/bg.mp4";
import axios from "axios";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const Synastry = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const {
    getZodiacImage,
    synastryFriends,
    setSynastryFriends,
    loadingprofile,
    deletefriendloader,
  } = useProfile();

  const { fullprofile } = useContext(CardContext);
  const { synastryData, fetchSynastryData, loading, error } = useSynastryData();

  // --- Trial gating state ---
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [isTrialActive, setIsTrialActive] = useState(false);

  // Determine current subroute under /synastrypage/partner/:id
  const currentSubPath = useMemo(() => {
    const base = `/synastrypage/partner/${id}/`;
    if (pathname.startsWith(base)) {
      const remainder = pathname.slice(base.length);
      const first = remainder.split("/")[0];
      return first || "";
    }
    return "";
  }, [pathname, id]);

  const allowedOnTrial = useMemo(() => ["chart", "planets", "housecusps", "aspects"], []);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [lockHover, setLockHover] = useState(false);

  const getSingleProfile = synastryFriends?.find((profile) => profile?._id === id);

  useEffect(() => {
    if (!synastryFriends) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}friend/my/synastry`, {
          withCredentials: true,
        })
        .then((res) => {
          setSynastryFriends(res.data.friends);
        })
        .catch((err) => console.error("Error fetching synastry friends:", err));
    }
  }, [synastryFriends, setSynastryFriends, loadingprofile, deletefriendloader]);

  useEffect(() => {
    if (getSingleProfile) {
      if (!synastryData) {
        fetchSynastryData(getSingleProfile);
      }
    }
  }, [getSingleProfile, synastryData, fetchSynastryData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fetch subscription status to determine if user is trial
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_BASE_URL}subscriptions/v2`;
        console.log("[Synastry] Fetching subscription from:", endpoint);
        const response = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        console.log("[Synastry] Subscription fetch status:", response.status);
        const result = await response.json();
        console.log("[Synastry] Subscription fetch result:", result);
        const sub = result?.data?.subscriptions?.[0] || null;
        console.log("[Synastry] Resolved subscription object:", sub);
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
        console.log("[Synastry] Computed flags:", { planName, code, status, type, lookupKey, detectedTrial });
        setIsTrialActive(detectedTrial);
      } catch (error) {
        console.error("[Synastry] Error fetching subscription:", error);
        setIsTrialActive(false);
      } finally {
        console.log("[Synastry] Subscription loading complete");
        setSubscriptionLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  const isRestricted = isTrialActive && currentSubPath && !allowedOnTrial.includes(currentSubPath);
  console.log("[Synastry] Render with state:", { subscriptionLoading, isTrialActive, currentSubPath, isRestricted });

  const synastryTexts = useMemo(() => [
    "Compatibility",
    "You",
    "Unlock This Report",
    "Unlock this Synastry report",
    "As a Premium user",
    "you get FREE detailed Synastry reports",
    "Upgrade to access this section. The following remain available on Trial:",
    "Planetary Positions",
    "Aspect Table",
    "House Cusps",
    "Natal Wheel Chart",
    "Full compatibility breakdowns",
    "Advanced insights and guidance",
    "Upgrade Now",
    "Continue with trial sections"
  ], []);

  const [compatibilityText, youText, unlockReportText, unlockSynastryText, premiumUserText, freeReportsText, upgradeText, planetaryPositionsText, aspectTableText, houseCuspsText, natalWheelChartText, compatibilityBreakdownsText, advancedInsightsText, upgradeNowText, continueTrialText] = useTranslatedTexts(synastryTexts);

  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full min-h-screen h-full fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <Box className="lg:p-3">
        <Navbar />
      </Box>

      <span className="lg:hidden md:hidden">
        <ZodiacNav />
      </span>

      <div className="flex gap-3 text-2xl lg:text-3xl p-3 cursor-pointer text-white ">
        <ArrowLeftOutlined className="mt-1" onClick={() => navigate("/synastrypage/partner")} />
        <div className="w-full flex justify-center me-6">
          <h2>{compatibilityText}</h2>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 text-white font-semibold text-xl">
        <div>
          <div>
            <Image
              src={getZodiacImage(fullprofile?.zodiacSign)}
              borderRadius="full"
              boxSize="100px"
              border={"2px solid blue"}
              objectFit="cover"
              alt={fullprofile?.zodiacSign}
            />
          </div>
          <div>
            <h2 className="text-center mt-2">{youText}</h2>
          </div>
        </div>

        <AddIcon className="text-white " />
        <div>
          <div>
            <Image
              src={getZodiacImage(getSingleProfile?.zodiacSign)}
              borderRadius="full"
              boxSize="100px"
              border={"2px solid blue"}
              objectFit="cover"
              alt={getSingleProfile?.zodiacSign}
            />
          </div>
          <div>
            <h2 className="text-center mt-2">{getSingleProfile?.name}</h2>
          </div>
        </div>
      </div>

      <Box className="m-10">
        <SynastryHeader />
      </Box>

      <div style={isRestricted ? { filter: "blur(4px)", pointerEvents: "none" } : undefined}>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="xl" color="white" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : synastryData ? (
          <div className="text-white" />
        ) : null}

        <Outlet />
      </div>

      {isRestricted && (
        <>
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
              {unlockReportText}
            </Text>
            <Box className="flex justify-center items-center text-white">
              {lockHover ? (
                <CiUnlock size={28} />
              ) : (
                <CiLock size={28} />
              )}
            </Box>
          </Box>

          <Modal
            isOpen={upsellOpen}
            onClose={() => navigate(`/synastrypage/partner/${id}/planets`)}
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
                  <Box
                    bgGradient="linear(to-b, purple.500, purple.300)"
                    rounded="full"
                    p={1.5}
                    boxShadow="0 10px 30px rgba(147,38,219,0.45)"
                  >
                    <Center bg="#2a1846" rounded="full" boxSize={{ base: "60px", md: "72px" }}>
                      <CiLock size={32} color="#ffffff" />
                    </Center>
                  </Box>
                </Center>

                <Text
                  textAlign="center"
                  mt={5}
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="extrabold"
                  bgGradient="linear(to-r, #b794f4, #e9d8fd)"
                  bgClip="text"
                >
                  {unlockSynastryText}
                </Text>

                <Text textAlign="center" mt={3} color="white" fontSize={{ base: "md", md: "lg" }}>
                  {premiumUserText}
                </Text>
                <Text textAlign="center" color="purple.200" fontSize={{ base: "md", md: "lg" }}>
                  {freeReportsText}
                </Text>

                <Box mt={5}>
                  <Text textAlign="center" color="whiteAlpha.900" fontSize="sm">
                    {upgradeText}
                  </Text>
                  <Flex mt={3} wrap="wrap" gap={2} justify="center">
                    <Badge colorScheme="purple" variant="subtle">{planetaryPositionsText}</Badge>
                    <Badge colorScheme="purple" variant="subtle">{aspectTableText}</Badge>
                    <Badge colorScheme="purple" variant="subtle">{houseCuspsText}</Badge>
                    <Badge colorScheme="purple" variant="subtle">{natalWheelChartText}</Badge>
                  </Flex>
                </Box>

                <Box mt={5} color="purple.200" fontSize="sm">
                  <Flex align="center" gap={2} justify="center">
                    <CheckIcon color="purple.300" />
                    <Text>{compatibilityBreakdownsText}</Text>
                  </Flex>
                  <Flex align="center" gap={2} justify="center" mt={1}>
                    <CheckIcon color="purple.300" />
                    <Text>{advancedInsightsText}</Text>
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
                <Button
                  variant="ghost"
                  colorScheme="purple"
                  onClick={() => navigate(`/synastrypage/partner/${id}/planets`)}
                >
                  {continueTrialText}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Synastry;