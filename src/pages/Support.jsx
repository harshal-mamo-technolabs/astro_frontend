import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BeaconBoot from "../helpscout/BeaconBoot";
import BeaconIdentify from "../helpscout/BeaconIdentify";
import BeaconRouteSync from "../helpscout/BeaconRouteSync";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const Support = () => {
  const navigate = useNavigate();

  const supportTexts = useMemo(() => [
    "Contact Zodiya Support",
    "We're here to help you.",
    "If you have any questions about your Zodiya account, subscription, or billing, our support team is happy to assist you.",
    "Please use the chat widget below to contact us directly, or reach out through one of the following options.",
    "Contact Details",
    "Email:",
    "Response time:",
    "within 24–48 hours on business days (Monday–Friday, 09:00–17:00 CET)",
    "You can also visit our",
    "Help Center",
    "for quick answers to frequently asked questions."
  ], []);

  const [contactSupportText, helpText, questionsText, chatWidgetText, contactDetailsText, emailText, responseTimeText, responseTimeDetailsText, visitText, helpCenterText, faqText] = useTranslatedTexts(supportTexts);

  return (
    <div className="relative min-h-screen text-white">
      {/* Strictly mount Beacon only on this page */}
      <BeaconBoot />
      <BeaconIdentify />
      <BeaconRouteSync />
      
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
            onClick={() => navigate("/settings/help")}
          />
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl mb-2 font-bold text-white">{contactSupportText}</h1>
            <p className="text-lg text-pink-200 mb-6">{helpText}</p>
          </div>

          {/* Intro Paragraph */}
          <div className="mb-8">
            <p className="mb-4">
              {questionsText}
            </p>
            <p>
              {chatWidgetText}
            </p>
          </div>

          {/* Contact Details Section */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold text-white">{contactDetailsText}</h3>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-white">{emailText}</span>{" "}
                <a href="mailto:support@zodiya.net" className="text-white underline hover:text-pink-200">
                  support@zodiya.net
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">{responseTimeText}</span> {responseTimeDetailsText}
              </p>
              <p>
                {visitText}{" "}
                <a 
                  href="/faq" 
                  onClick={(e) => { e.preventDefault(); navigate('/faq'); }}
                  className="text-white underline hover:text-pink-200"
                >
                  {helpCenterText}
                </a>{" "}
                {faqText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
