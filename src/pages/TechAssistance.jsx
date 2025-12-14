import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const TechAssistance = () => {
  const navigate = useNavigate();

  const techTexts = useMemo(() => [
    "🛠️ Technical Assistance",
    "If you're experiencing issues with how Zodiya works in your browser or device, this section provides guidance on how to troubleshoot common problems and get additional support when needed.",
    "🌐 Supported Browsers & Devices",
    "Zodiya is a web-based application designed to work smoothly across all modern browsers and devices.",
    "We recommend using:",
    "Google Chrome (latest version)",
    "Safari (latest version)",
    "Microsoft Edge",
    "Firefox",
    "⚠️ Internet Explorer and outdated browser versions are not supported.",
    "You can use Zodiya on desktop, tablet, or mobile — the experience automatically adjusts to your screen size.",
    "⚙️ Common Technical Issues",
    "1. I can't log in",
    "Double-check your login credentials from the registration email",
    "Make sure caps lock is off",
    "Try resetting your password or contacting support if needed",
    "2. Pages are not loading correctly",
    "Try refreshing the page",
    "Clear your browser cache and cookies",
    "Disable browser extensions (especially ad blockers or privacy tools)",
    "3. My daily content isn't updating",
    "Daily updates are based on your time zone — try logging out and back in",
    "Ensure your browser allows cookies/session storage",
    "4. Mobile view doesn't look right",
    "Try rotating your device or switching browsers",
    "Make sure your mobile browser is up to date",
    "🧪 Troubleshooting Tips",
    "Always use the latest version of your browser",
    "Ensure a stable internet connection",
    "Avoid using private/incognito mode if you're experiencing session issues",
    "Allow pop-ups and cookies for full functionality",
    "📩 Need More Help?",
    "If you're still having issues, our support team is here to help. Please contact us with the following info to speed up resolution:",
    "Your email address",
    "Description of the issue",
    "Device and browser version",
    "Screenshot or screen recording if possible",
    "📧 Email us at:",
    "We're committed to making your Zodiya experience smooth and reliable. If something isn't working right, we'll do our best to fix it — quickly and clearly."
  ], []);

  const translatedTechTexts = useTranslatedTexts(techTexts);

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
            <h2 className="text-3xl text-center">{translatedTechTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          <p className="text-center mb-8">
            {translatedTechTexts[1]}
          </p>

          <div className="space-y-8">
            {/* Supported Browsers */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedTechTexts[2]}</h3>
              <p>
                {translatedTechTexts[3]}
              </p>
              <p>
              {translatedTechTexts[4]}
              </p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedTechTexts[5]}</li>
                <li>{translatedTechTexts[6]}</li>
                <li>{translatedTechTexts[7]}</li>
                <li>{translatedTechTexts[8]}</li>
              </ul>
              <p className="mt-2 text-yellow-200">{translatedTechTexts[9]}</p>
              <p className="mt-2">
                {translatedTechTexts[10]}
              </p>
            </div>

            {/* Common Issues */}
            <div>
  <h3 className="text-xl font-semibold mb-2">{translatedTechTexts[11]}</h3>

  {/* Issue 1 */}
  <div className="mb-4">
    <p className="font-bold mb-1">{translatedTechTexts[12]}</p>
    <ul className="list-disc list-inside pl-4 space-y-1">
      <li>{translatedTechTexts[13]}</li>
      <li>{translatedTechTexts[14]}</li>
      <li>{translatedTechTexts[15]}</li>
    </ul>
  </div>

  {/* Issue 2 */}
  <div className="mb-4">
    <p className="font-bold mb-1">{translatedTechTexts[16]}</p>
    <ul className="list-disc list-inside pl-4 space-y-1">
      <li>{translatedTechTexts[17]}</li>
      <li>{translatedTechTexts[18]}</li>
      <li>{translatedTechTexts[19]}</li>
    </ul>
  </div>

  {/* Issue 3 */}
  <div className="mb-4">
    <p className="font-bold mb-1">{translatedTechTexts[20]}</p>
    <ul className="list-disc list-inside pl-4 space-y-1">
      <li>{translatedTechTexts[21]}</li>
      <li>{translatedTechTexts[22]}</li>
    </ul>
  </div>

  {/* Issue 4 */}
  <div className="mb-4">
    <p className="font-bold mb-1">{translatedTechTexts[23]}</p>
    <ul className="list-disc list-inside pl-4 space-y-1">
      <li>{translatedTechTexts[24]}</li>
      <li>{translatedTechTexts[25]}</li>
    </ul>
  </div>
</div>

            {/* Troubleshooting */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedTechTexts[26]}</h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedTechTexts[27]}</li>
                <li>{translatedTechTexts[28]}</li>
                <li>{translatedTechTexts[29]}</li>
                <li>{translatedTechTexts[30]}</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedTechTexts[31]}</h3>
              <p>
                {translatedTechTexts[32]}
              </p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedTechTexts[33]}</li>
                <li>{translatedTechTexts[34]}</li>
                <li>{translatedTechTexts[35]}</li>
                <li>{translatedTechTexts[36]}</li>
              </ul>
              <p className="mt-2">
                {translatedTechTexts[37]}{" "}
                <a href="mailto:support@zodiya.net" className="underline text-pink-200">
                  support@zodiya.net
                </a>
              </p>
            </div>
          </div>

          <p className="text-center mt-8">
            {translatedTechTexts[38]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechAssistance;
