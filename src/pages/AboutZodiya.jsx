import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const AboutZodiya = () => {
  const navigate = useNavigate();

  const aboutTexts = useMemo(() => [
    "About Zodiya",
    "Zodiya is your personalized guide to the stars — a modern astrology and self-discovery platform designed to help you understand yourself and the people around you on a deeper, more meaningful level.",
    "We combine ancient wisdom with modern technology to deliver a seamless and insightful experience through a wide range of spiritual and astrological services.",
    "✨ What We Offer",
    "Zodiya provides a rich suite of personalized tools and reports to guide your daily life, enhance your self-awareness, and deepen your relationships:",
    "Daily Horoscope Insight – Tailored daily guidance based on your birth chart",
    "General Zodiac Sign Insight – Explore your sun sign traits, strengths, and growth tips",
    "Natal Chart – A detailed map of your personality, destiny, and potential",
    "Moon Phase Report – Understand the moon's influence on your emotions and energy",
    "Synastry (Compatibility Report) – Discover how your chart aligns with others' for love, friendship, or partnership",
    "Numerology – Insights based on your birth date and name vibration",
    "Transit Chart – See how current planetary movements affect you",
    "Daily Tarot Reading – Draw guidance and reflection through tarot symbolism",
    "You can also create and manage multiple profiles, allowing you to explore not only your own cosmic blueprint, but also those of your loved ones.",
    "💫 Our Philosophy",
    "Zodiya was built with one mission:",
    "To help people reconnect with themselves and others through the power of astrology, numerology, and spiritual insight — in a beautiful, mobile-first experience.",
    "We believe in making ancient systems intuitive, trustworthy, and meaningful for the modern world."
  ], []);

  const translatedAboutTexts = useTranslatedTexts(aboutTexts);

  return (
    <div className="relative min-h-screen text-white">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full h-full fixed top-0 left-0 -z-10"
      >
        <source src={bg} type="video/mp4" />
      </video>

      <Box className="lg:p-3">
        <Navbar />
      </Box>

      <div className="lg:hidden md:hidden">
        <ZodiacNav />
      </div>
      <div className="lg:hidden">
        <ZodiacAvatar />
      </div>

      <div className="flex flex-col items-center px-4 py-6">
        <div className="flex items-center gap-3 w-full max-w-4xl text-2xl lg:text-3xl mb-6 font-sans cursor-pointer">
          <ArrowLeftOutlined
            className="lg:mt-1 mt-2"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full me-4 lg:me-10">
            <h2 className="text-3xl text-center">{translatedAboutTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          <div className="mb-8">
            <p className="mb-6">
              {translatedAboutTexts[1]}
            </p>
            <p>
              {translatedAboutTexts[2]}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedAboutTexts[3]}</h3>
            <p className="mb-4">
              {translatedAboutTexts[4]}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>{translatedAboutTexts[5]}</li>
              <li>{translatedAboutTexts[6]}</li>
              <li>{translatedAboutTexts[7]}</li>
              <li>{translatedAboutTexts[8]}</li>
              <li>{translatedAboutTexts[9]}</li>
              <li>{translatedAboutTexts[10]}</li>
              <li>{translatedAboutTexts[11]}</li>
              <li>{translatedAboutTexts[12]}</li>
            </ul>
            <p>
              {translatedAboutTexts[13]}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedAboutTexts[14]}</h3>
            <p className="mb-4">
              <span className="italic">{translatedAboutTexts[15]}</span>
            </p>
            <p className="mb-4 italic">
              {translatedAboutTexts[16]}
            </p>
            <p>
              {translatedAboutTexts[17]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutZodiya;
