import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const HowToUse = () => {
  const navigate = useNavigate();

  const howToUseTexts = useMemo(() => [
    "🌠 How to Use Zodiya",
    "Zodiya is a web-based astrology platform designed to help you understand yourself and others through powerful spiritual tools like personalized horoscopes, natal charts, compatibility analysis, and more.",
    "Follow these simple steps to activate your access and begin your journey.",
    "1. ✍️ Start on the Landing Page",
    "Go to",
    "astro.zodiya.net",
    "and begin by filling out your astrological profile:",
    "Your name",
    "Date, time, and place of birth",
    "This information is used to generate your personal natal chart and unlock your full experience inside the Zodiya platform.",
    "2. 💳 Choose a Subscription Plan",
    "After entering your birth details, you'll be prompted to select one of the available plans:",
    "Trial Plan – A short preview with limited access",
    "Premium Plan – Full access to all core features",
    "Gold Plan – Full access + advanced tools and profile management",
    "Once you've selected your plan, proceed with secure payment to activate your account.",
    "3. 📩 Receive Your Login Credentials",
    "After successful payment, you'll receive a confirmation email with your Zodiya login details.",
    "📬",
    "Note:",
    "Make sure to check your spam or promotions folder if you don't see the email.",
    "4. 🔐 Log In to the Web App",
    "Visit",
    "zodiya.net/login",
    "and enter your credentials to access the full web application.",
    "Your profile and birth chart will already be set up — no need to enter your details again.",
    "5. 🗓️ Explore Your Dashboard",
    "Once logged in, you'll gain access to all your features:",
    "Daily Horoscope",
    "Moon Phase Report",
    "Daily Tarot",
    "Natal Chart",
    "Transit Chart",
    "Numerology",
    "Zodiac Sign Insight",
    "6. 👥 (Optional) Add More Profiles",
    "If your plan includes multi-profile support, you can add additional people (e.g. partner, children, friends):",
    "Go to Profiles",
    "Enter their birth details",
    "View separate horoscopes and compatibility reports",
    "7. ⚙️ Manage Your Plan & Settings",
    "In the Settings section, you can:",
    "View or cancel your active plan",
    "Remove or add profiles",
    "Access billing information",
    "Contact support",
    "✨ Tips for a Great Experience",
    "Access Zodiya from any modern browser on desktop or mobile",
    "Use your exact birth time for the most accurate results",
    "Check your dashboard daily for fresh cosmic guidance",
    "Zodiya is more than astrology — it's a daily ritual of insight and awareness.",
    "Begin your journey today 🌌"
  ], []);

  const translatedHowToUseTexts = useTranslatedTexts(howToUseTexts);

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
            <h2 className="text-3xl text-center">{translatedHowToUseTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          <p className="text-center mb-8">
            {translatedHowToUseTexts[1]}{" "}
            <br /> {translatedHowToUseTexts[2]}
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[3]}</h3>
              <p>
                {translatedHowToUseTexts[4]} <strong>{translatedHowToUseTexts[5]}</strong> {translatedHowToUseTexts[6]}
              </p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedHowToUseTexts[7]}</li>
                <li>{translatedHowToUseTexts[8]}</li>
              </ul>
              <p className="mt-2">
                {translatedHowToUseTexts[9]}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[10]}</h3>
              <p>{translatedHowToUseTexts[11]}</p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedHowToUseTexts[12]}</li>
                <li>{translatedHowToUseTexts[13]}</li>
                <li>{translatedHowToUseTexts[14]}</li>
              </ul>
              <p className="mt-2">{translatedHowToUseTexts[15]}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[16]}</h3>
              <p>
                {translatedHowToUseTexts[17]}
              </p>
              <p className="mt-2">{translatedHowToUseTexts[18]} <strong>{translatedHowToUseTexts[19]}</strong> {translatedHowToUseTexts[20]}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[21]}</h3>
              <p>
                {translatedHowToUseTexts[22]} <strong>{translatedHowToUseTexts[23]}</strong> {translatedHowToUseTexts[24]}
              </p>
              <p className="mt-2">{translatedHowToUseTexts[25]}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[26]}</h3>
              <p>{translatedHowToUseTexts[27]}</p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedHowToUseTexts[28]}</li>
                <li>{translatedHowToUseTexts[29]}</li>
                <li>{translatedHowToUseTexts[30]}</li>
                <li>{translatedHowToUseTexts[31]}</li>
                <li>{translatedHowToUseTexts[32]}</li>
                <li>{translatedHowToUseTexts[33]}</li>
                <li>{translatedHowToUseTexts[34]}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[35]}</h3>
              <p>
                {translatedHowToUseTexts[36]}
              </p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedHowToUseTexts[37]}</li>
                <li>{translatedHowToUseTexts[38]}</li>
                <li>{translatedHowToUseTexts[39]}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[40]}</h3>
              <p>{translatedHowToUseTexts[41]}</p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedHowToUseTexts[42]}</li>
                <li>{translatedHowToUseTexts[43]}</li>
                <li>{translatedHowToUseTexts[44]}</li>
                <li>{translatedHowToUseTexts[45]}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedHowToUseTexts[46]}</h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedHowToUseTexts[47]}</li>
                <li>{translatedHowToUseTexts[48]}</li>
                <li>{translatedHowToUseTexts[49]}</li>
              </ul>
            </div>
          </div>

          <p className="text-center mt-8">
            {translatedHowToUseTexts[50]}
            <br />
            {translatedHowToUseTexts[51]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
