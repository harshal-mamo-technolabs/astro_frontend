import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import { useEffect, useState, useMemo } from "react";
import { Box, Modal, ModalOverlay, ModalContent, ModalBody, Button, Text } from "@chakra-ui/react";
import bg from "../assets/bg.mp4";
import tarotCardBack from "../assets/tarotcard.png";
import axios from "axios";
import { useProfile } from "../context/Profile";
import PurchaseProfileModal from "../components/PurchaseProfileModal";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const Tarot = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { selectedUser, Payprofile, setPayprofile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isOpen: isPurchaseOpen,
    onOpen: onPurchaseOpen,
    onClose: onPurchaseClose
  } = useDisclosure();

  const [cardOptions, setCardOptions] = useState(null);
  const [dailyTarotData, setDailyTarotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCards, setSelectedCards] = useState([]);
  const [readingRequested, setReadingRequested] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);

  const unlockFullInsightsText = useTranslatedText("Unlock full insights for this profile");
  const unlockText = useTranslatedText("Unlock");
  const goBackText = useTranslatedText("Go Back");
  const loadingCardsText = useTranslatedText("Loading your cards...");
  const tryAgainText = useTranslatedText("Try Again");
  const tarotText = useTranslatedText("Tarot");
  const understandJourneyText = useTranslatedText("Understand Your Journey");
  const readingDescriptionText = useTranslatedText("This reading provides insights into your past, present, and future. Discover how your past experiences shape your current reality and what the future holds.");
  const selectCardsText = useTranslatedText("Select Your Cards");
  const getReadingText = useTranslatedText("Get Your Reading");
  const selectAllThreeText = useTranslatedText("Please select all three cards first");
  const yourReadingText = useTranslatedText("Your Reading");
  const newReadingText = useTranslatedText("New Reading");
  const failedToFetchText = useTranslatedText("Failed to fetch tarot card options");

  const positionTexts = useMemo(() => ["Past", "Present", "Future", "Advice:"], []);
  const translatedPositionTexts = useTranslatedTexts(positionTexts);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Open modal if user has a free profile
  useEffect(() => {
    if (!!selectedUser?.free) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [selectedUser]);

  const flipCardContainerStyle = {
    perspective: "1000px",
  };

  const flipCardStyle = (isFlipped) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  });

  const cardFaceStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  const cardBackStyle = {
    ...cardFaceStyle,
  };

  const cardFrontStyle = {
    ...cardFaceStyle,
    transform: "rotateY(180deg)",
  };

  const fetchCardOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      setFlippedCards([]);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}divine/daily-tarot`,
        {
          withCredentials: true,
        }
      );

      const predictionData = response.data.data.prediction;

      const options = [
        { id: 1, position: "past", ...predictionData.past },
        { id: 2, position: "present", ...predictionData.present },
        { id: 3, position: "future", ...predictionData.future },
      ];

      setCardOptions(options);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tarot card options:", err);
      setError(err.response?.data?.msg || failedToFetchText);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if user is not on a free profile
    if (!selectedUser?.free) {
      fetchCardOptions();
    }
  }, [selectedUser]);

  const handleCardSelect = (cardId) => {
    if (!flippedCards.includes(cardId)) {
      setFlippedCards([...flippedCards, cardId]);
    }

    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      if (selectedCards.length < 3) {
        setSelectedCards([...selectedCards, cardId]);
      }
    }
  };

  const getReading = () => {
    if (selectedCards.length !== 3) {
      setError(selectAllThreeText);
      return;
    }

    setReadingRequested(true);

    setDailyTarotData({
      past: cardOptions.find((card) => card.position === "past"),
      present: cardOptions.find((card) => card.position === "present"),
      future: cardOptions.find((card) => card.position === "future"),
    });
  };

  const handleNewReading = async () => {
    setSelectedCards([]);
    setReadingRequested(false);
    setDailyTarotData(null);
    setFlippedCards([]);
    await fetchCardOptions();
  };

  return (
    <Box className="mx-auto min-h-screen font-nunito-light">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full min-h-screen h-full fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {}}
          isCentered
          closeOnOverlayClick={false}
          closeOnEsc={false}
        >
          <ModalOverlay />
          <ModalContent
            bg="#23123a"
            borderRadius="2xl"
            boxShadow="2xl"
            p={{ base: 6, md: 8 }}
            maxW="sm"
            mx="auto"
          >
            <ModalBody>
              <Text fontSize="lg" color="white" textAlign="center" mb={7}>
                {unlockFullInsightsText}
              </Text>
              <Button
                colorScheme="purple"
                bg="#4b50c2"
                color="white"
                borderRadius="2xl"
                w="full"
                fontWeight="medium"
                fontSize="md"
                mb={3}
                py={3}
                onClick={() => {
                  setPayprofile(true);
                  onPurchaseOpen();
                }}
              >
                {unlockText}
              </Button>
              <Button
                variant="ghost"
                color="white"
                w="full"
                fontWeight="medium"
                fontSize="md"
                onClick={() => {
                  setIsModalOpen(false);
                  navigate(-1);
                }}
                _hover={{ bg: "#2d1a3a" }}
              >
                {goBackText}
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {!isModalOpen && (
        <>
          {loading && !readingRequested && (
            <Box className="mx-auto min-h-screen font-nunito-light">
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
              <span className="lg:hidden">
                <ZodiacAvatar />
              </span>
              <Box className="text-white text-center mt-20 flex flex-col items-center">
                <Box className="w-12 h-12 border-4 border-[#c3a455] border-t-transparent rounded-full animate-spin mb-4"></Box>
                <Text>{loadingCardsText}</Text>
              </Box>
            </Box>
          )}

          {error && !readingRequested && (
            <Box className="mx-auto min-h-screen font-nunito-light">
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
              <span className="lg:hidden">
                <ZodiacAvatar />
              </span>
              <Box className="text-red-500 text-center mt-20">
                {error}
                <Box className="mt-4">
                  <Button
                    className="px-6 py-2 bg-[#686256] text-white rounded hover:bg-[#827a6c] transition"
                    onClick={() => window.location.reload()}
                  >
                    {tryAgainText}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {(readingRequested || (!loading && !error)) && (
            <Box className="mx-auto min-h-screen font-nunito-light">
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
              <span className="lg:hidden">
                <ZodiacAvatar />
              </span>
              <Box>
                <Box className="flex gap-3 w-full text-2xl lg:text-3xl p-3 cursor-pointer font-sans text-white">
                  <ArrowLeftOutlined
                    className="lg:mt-1 mt-2"
                    onClick={() => navigate("/home")}
                  />
                  <Box className="flex justify-center w-full">
                    <Text className="me-4 lg:me-8">{tarotText}</Text>
                  </Box>
                </Box>

                <Box className="text-white px-4 py-2">
                  <Text className="text-3xl text-center font-medium text-[#5f53d4] mb-6">
                    {understandJourneyText}
                  </Text>

                  <Text className="text-center mb-10">
                    {readingDescriptionText}
                  </Text>

                  {!readingRequested && cardOptions && (
                    <>
                      <Text className="text-2xl text-center font-medium text-[#5f53d4] mb-8">
                        {selectCardsText}
                      </Text>

                      <Box className="flex justify-center gap-4 mb-10 flex-wrap">
                        {cardOptions.map((card) => (
                          <Box
                            key={card.id}
                            className={`w-24 h-36 md:w-32 md:h-48 lg:w-40 lg:h-60 rounded-lg cursor-pointer border-2 overflow-hidden
                              ${
                                selectedCards.includes(card.id)
                                  ? "border-[white]"
                                  : "border-transparent"
                              }`}
                            style={flipCardContainerStyle}
                            onClick={() => handleCardSelect(card.id)}
                          >
                            <Box style={flipCardStyle(flippedCards.includes(card.id))}>
                              {/* Card Back */}
                              <Box style={cardBackStyle}>
                                <img
                                  src={tarotCardBack}
                                  alt="Card Back"
                                  className="w-full h-full object-cover"
                                />
                              </Box>

                              {/* Card Front */}
                              <Box style={cardFrontStyle}>
                                <img
                                  src={card.image}
                                  alt={card.position}
                                  className="w-full h-full object-cover"
                                />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>

                      <Box className="flex justify-center mb-10">
                        <Button
                          className={`px-8 py-3 uppercase tracking-wider bg-[#5f53d4] text-white rounded hover:bg-[#423a9e] transition
                            ${
                              selectedCards.length !== 3 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          onClick={getReading}
                          disabled={selectedCards.length !== 3}
                        >
                          {getReadingText}
                        </Button>
                      </Box>

                      {error && (
                        <Box className="text-red-500 text-center mt-4">{error}</Box>
                      )}
                    </>
                  )}

                  {/* Show reading results only after requesting */}
                  {readingRequested && dailyTarotData && (
                    <Box className="mt-8">
                      <Text className="text-2xl text-center font-medium text-[white] mb-6">
                        {yourReadingText}
                      </Text>

                      <Box className="mb-12">
                        <Box className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                          <Box className="md:w-1/3 flex justify-center">
                            {dailyTarotData.past.image && (
                              <img
                                src={dailyTarotData.past.image}
                                alt={dailyTarotData.past.card}
                                className="h-64 object-contain"
                              />
                            )}
                          </Box>
                          <Box className="md:w-2/3">
                            <Text className="text-xl font-medium text-[#5f53d4] mb-2">
                              {translatedPositionTexts[0]} ({dailyTarotData.past.card})
                            </Text>
                            <Text className="mb-4">{dailyTarotData.past.summary}</Text>
                            <Text>
                              <strong>{translatedPositionTexts[3]}</strong> {dailyTarotData.past.advice}
                            </Text>
                          </Box>
                        </Box>

                        <Box className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                          <Box className="md:w-1/3 flex justify-center">
                            {dailyTarotData.present.image && (
                              <img
                                src={dailyTarotData.present.image}
                                alt={dailyTarotData.present.card}
                                className="h-64 object-contain"
                              />
                            )}
                          </Box>
                          <Box className="md:w-2/3">
                            <Text className="text-xl font-medium text-[#5f53d4] mb-2">
                              {translatedPositionTexts[1]} ({dailyTarotData.present.card})
                            </Text>
                            <Text className="mb-4">{dailyTarotData.present.summary}</Text>
                            <Text>
                              <strong>{translatedPositionTexts[3]}</strong> {dailyTarotData.present.advice}
                            </Text>
                          </Box>
                        </Box>

                        <Box className="flex flex-col md:flex-row md:items-start gap-6">
                          <Box className="md:w-1/3 flex justify-center">
                            {dailyTarotData.future.image && (
                              <img
                                src={dailyTarotData.future.image}
                                alt={dailyTarotData.future.card}
                                className="h-64 object-contain"
                              />
                            )}
                          </Box>
                          <Box className="md:w-2/3">
                            <Text className="text-xl font-medium text-[#5f53d4] mb-2">
                              {translatedPositionTexts[2]} ({dailyTarotData.future.card})
                            </Text>
                            <Text className="mb-4">{dailyTarotData.future.summary}</Text>
                            <Text>
                              <strong>{translatedPositionTexts[3]}</strong> {dailyTarotData.future.advice}
                            </Text>
                          </Box>
                        </Box>
                      </Box>

                      <Box className="flex justify-center mb-10">
                        <Button
                          className="px-8 py-3 uppercase tracking-wider bg-[#5f53d4] text-white rounded hover:bg-[#423a9e] transition"
                          onClick={handleNewReading}
                        >
                          {newReadingText}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}

      <Modal isOpen={isPurchaseOpen} onClose={onPurchaseClose} isCentered>
        <PurchaseProfileModal onClose={onPurchaseClose} />
      </Modal>
    </Box>
  );
};

export default Tarot;
