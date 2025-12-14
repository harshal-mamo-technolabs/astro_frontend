import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const ZodiyaFeatures = () => {
  const navigate = useNavigate();

  const featuresTexts = useMemo(() => [
    "✨ Zodiya Features",
    "Explore the full power of Zodiya. From daily guidance to deep astrological insights, Zodiya offers everything you need for self-discovery, relationship clarity, and spiritual connection.",
    "🔮 Daily Horoscope Insight",
    "Start each day with personalized astrological guidance based on your full birth chart.",
    "Love, career, health, emotions — updated every morning",
    "Aligned with real-time planetary transits",
    "🌞 Zodiac Sign Insight",
    "Unlock the secrets of your Sun sign.",
    "Understand your core traits, challenges, and strengths",
    "Tips for self-growth and alignment",
    "🌌 Natal Chart",
    "A complete astrological blueprint of your personality and life potential.",
    "Includes all planetary placements and houses",
    "Clear interpretations for beginners and advanced users alike",
    "🌙 Moon Phase Report",
    "Track how lunar cycles influence your moods, energy, and intuition.",
    "Daily and monthly moon updates",
    "Ideal for emotional awareness and planning",
    "💞 Synastry (Compatibility Reports)",
    "Understand the dynamics between you and someone else.",
    "Compare two birth charts",
    "Love, friendship, work, or family compatibility",
    "🔢 Numerology",
    "Get deeper insights based on your birth date and full name.",
    "Life Path, Expression, and Destiny numbers",
    "Hidden patterns and spiritual lessons",
    "🪐 Transit Chart",
    "Stay aligned with the cosmos.",
    "Real-time planetary movements and how they affect you",
    "Ideal for timing decisions and understanding current moods",
    "🃏 Daily Tarot Reading",
    "A dose of spiritual insight through symbolic tarot messages.",
    "One-card draw with clear, uplifting interpretation",
    "Great for reflection, intuition, and perspective",
    "👥 Multi-Profile Support",
    "Add your partner, family, or friends — and get insights for them too.",
    "Manage multiple profiles from a single account",
    "All features personalized per profile",
    "🧭 Intuitive & Beautiful Experience",
    "Zodiya is designed for clarity and calm.",
    "Clean design, smooth navigation",
    "Mobile-first experience with deep functionality",
    "🔐 Privacy First",
    "We protect your data like it's sacred.",
    "Encrypted storage",
    "No sharing of personal info, ever"
  ], []);

  const translatedFeaturesTexts = useTranslatedTexts(featuresTexts);

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
            <h2 className="text-3xl text-center">{translatedFeaturesTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          <p className="text-center mb-8">{translatedFeaturesTexts[1]}</p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[2]}</h3>
              <p>{translatedFeaturesTexts[3]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[4]}</li>
                <li>{translatedFeaturesTexts[5]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[6]}</h3>
              <p>{translatedFeaturesTexts[7]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[8]}</li>
                <li>{translatedFeaturesTexts[9]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[10]}</h3>
              <p>{translatedFeaturesTexts[11]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[12]}</li>
                <li>{translatedFeaturesTexts[13]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[14]}</h3>
              <p>{translatedFeaturesTexts[15]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[16]}</li>
                <li>{translatedFeaturesTexts[17]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[18]}</h3>
              <p>{translatedFeaturesTexts[19]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[20]}</li>
                <li>{translatedFeaturesTexts[21]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[22]}</h3>
              <p>{translatedFeaturesTexts[23]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[24]}</li>
                <li>{translatedFeaturesTexts[25]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[26]}</h3>
              <p>{translatedFeaturesTexts[27]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[28]}</li>
                <li>{translatedFeaturesTexts[29]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[30]}</h3>
              <p>{translatedFeaturesTexts[31]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[32]}</li>
                <li>{translatedFeaturesTexts[33]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[34]}</h3>
              <p>{translatedFeaturesTexts[35]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[36]}</li>
                <li>{translatedFeaturesTexts[37]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[38]}</h3>
              <p>{translatedFeaturesTexts[39]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[40]}</li>
                <li>{translatedFeaturesTexts[41]}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedFeaturesTexts[42]}</h3>
              <p>{translatedFeaturesTexts[43]}</p>
              <ul className="list-inside list-disc mt-2 pl-4">
                <li>{translatedFeaturesTexts[44]}</li>
                <li>{translatedFeaturesTexts[45]}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiyaFeatures; 