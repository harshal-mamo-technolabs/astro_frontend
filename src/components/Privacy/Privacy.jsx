import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar";
import ZodiacNav from "../More_detail/ZodiacNav";
import ZodiacAvatar from "../More_detail/ZodiacAvatar";
import bg from "../../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Privacy = () => {
  const navigate = useNavigate();

  const privacyTexts = useMemo(() => [
    "Privacy Policy",
    "ZODIYA PRIVACY POLICY",
    "Effective Date:",
    "At Zodiya, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information in compliance with the General Data Protection Regulation (GDPR) and other applicable laws.",
    "1. INTRODUCTION",
    "This Privacy Policy applies to all users of the Zodiya platform, including visitors, registered users, and subscribers. By using our services, you agree to the terms outlined in this policy.",
    "2. DATA WE COLLECT",
    "We collect the following types of personal data:",
    "Personal Information:",
    "Name, birth date, birth place, and email address.",
    "Account Information:",
    "Profile preferences, subscription status.",
    "Usage Data:",
    "Information on how you interact with our website and services.",
    "Payment Information:",
    "If you subscribe to a paid plan, we process payments via third-party gateways (Stripe, PayPal), but we do not store credit card details.",
    "Cookies & Tracking Data:",
    "Data collected through cookies and similar tracking technologies for analytics and marketing.",
    "3. PURPOSE OF DATA COLLECTION",
    "We use your personal data for the following purposes:",
    "Service Delivery:",
    "To provide astrology reports, compatibility analysis, and numerology readings.",
    "Account Management:",
    "To create and maintain your user profile.",
    "Customer Support:",
    "To respond to inquiries and provide assistance.",
    "Marketing & Communication:",
    "To send newsletters, promotional offers, and updates (with user consent).",
    "Analytics & Improvement:",
    "To analyze service usage and enhance user experience.",
    "4. LEGAL BASIS FOR PROCESSING DATA",
    "We process personal data based on:",
    "User Consent:",
    "When you provide information voluntarily.",
    "Contractual Necessity:",
    "To deliver the services you subscribe to.",
    "Legal Obligation:",
    "To comply with laws and regulations.",
    "Legitimate Interests:",
    "To improve our services while respecting user rights.",
    "5. DATA STORAGE & SECURITY",
    "We implement strong security measures to protect your data against unauthorized access, disclosure, and loss.",
    "Data is stored on secure servers within the European Economic Area (EEA), and we comply with GDPR data protection standards.",
    "We retain personal data only as long as necessary for service provision and legal compliance.",
    "6. THIRD-PARTY DATA SHARING",
    "We do not sell or rent personal data. However, we may share data with:",
    "Payment Processors:",
    "(Stripe, PayPal) for secure transactions.",
    "Email Marketing Platforms:",
    "(Mailchimp, ActiveCampaign) for communications.",
    "Analytics Services:",
    "(Google Analytics, Mixpanel) to track user behavior.",
    "Legal Authorities:",
    "if required for compliance with regulations or legal obligations.",
    "7. YOUR RIGHTS UNDER GDPR",
    "Users in the European Union (EU) have the following rights:",
    "Right to Access",
    "Right to Rectification",
    "Right to Erasure",
    "Right to Restrict Processing",
    "Right to Data Portability",
    "Right to Object",
    "Right to Withdraw Consent",
    "To exercise these rights, contact us at",
    "8. COOKIES & TRACKING TECHNOLOGIES",
    "We use cookies and tracking tools to enhance user experience and measure engagement. Users can manage cookie preferences via browser settings.",
    "9. CHILDREN'S PRIVACY",
    "Zodiya does not knowingly collect data from children under 18 years old. If we become aware of such data collection, we will delete it immediately.",
    "10. CHANGES TO THIS POLICY",
    "We may update this Privacy Policy periodically. Users will be notified of significant changes via email or on our website.",
    "11. CONTACT INFORMATION",
    "For any privacy-related inquiries, you can contact us at:",
    "Zodiya Data Protection Officer",
    "Email:",
    "Website:",
    "By using Zodiya, you acknowledge that you have read, understood, and agreed to this Privacy Policy."
  ], []);

  const translatedPrivacyTexts = useTranslatedTexts(privacyTexts);

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
            <h2 className="text-3xl text-center">{translatedPrivacyTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl mb-2 font-bold text-white">{translatedPrivacyTexts[1]}</h1>
            <p className="text-lg text-pink-200">{translatedPrivacyTexts[2]} 1.7.2025</p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="mb-4">
              {translatedPrivacyTexts[3]}
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[4]}</h3>
            <p>
              {translatedPrivacyTexts[5]}
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[6]}</h3>
            <p className="mb-4">
              {translatedPrivacyTexts[7]}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[8]}</span> {translatedPrivacyTexts[9]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[10]}</span> {translatedPrivacyTexts[11]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[12]}</span> {translatedPrivacyTexts[13]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[14]}</span> {translatedPrivacyTexts[15]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[16]}</span> {translatedPrivacyTexts[17]}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[18]}</h3>
            <p className="mb-4">
              {translatedPrivacyTexts[19]}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[20]}</span> {translatedPrivacyTexts[21]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[22]}</span> {translatedPrivacyTexts[23]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[24]}</span> {translatedPrivacyTexts[25]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[26]}</span> {translatedPrivacyTexts[27]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[28]}</span> {translatedPrivacyTexts[29]}</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[30]}</h3>
            <p className="mb-4">
              {translatedPrivacyTexts[31]}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[32]}</span> {translatedPrivacyTexts[33]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[34]}</span> {translatedPrivacyTexts[35]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[36]}</span> {translatedPrivacyTexts[37]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[38]}</span> {translatedPrivacyTexts[39]}</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[40]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedPrivacyTexts[41]}</li>
              <li className="ml-4">{translatedPrivacyTexts[42]}</li>
              <li className="ml-4">{translatedPrivacyTexts[43]}</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[44]}</h3>
            <p className="mb-4">
              {translatedPrivacyTexts[45]}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[46]}</span> {translatedPrivacyTexts[47]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[48]}</span> {translatedPrivacyTexts[49]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[50]}</span> {translatedPrivacyTexts[51]}</li>
              <li className="ml-4"><span className="font-semibold text-white">{translatedPrivacyTexts[52]}</span> {translatedPrivacyTexts[53]}</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[54]}</h3>
            <p className="mb-4">
              {translatedPrivacyTexts[55]}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedPrivacyTexts[56]}</li>
              <li className="ml-4">{translatedPrivacyTexts[57]}</li>
              <li className="ml-4">{translatedPrivacyTexts[58]}</li>
              <li className="ml-4">{translatedPrivacyTexts[59]}</li>
              <li className="ml-4">{translatedPrivacyTexts[60]}</li>
              <li className="ml-4">{translatedPrivacyTexts[61]}</li>
              <li className="ml-4">{translatedPrivacyTexts[62]}</li>
            </ul>
            <p className="mt-4">
              {translatedPrivacyTexts[63]} <a href="mailto:support@zodiya.net" className="text-white underline hover:text-pink-200">support@zodiya.net</a>.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[64]}</h3>
            <p>
              {translatedPrivacyTexts[65]}
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[66]}</h3>
            <p>
              {translatedPrivacyTexts[67]}
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[68]}</h3>
            <p>
              {translatedPrivacyTexts[69]}
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedPrivacyTexts[70]}</h3>
            <p className="mb-4">
              {translatedPrivacyTexts[71]}
            </p>
            <div className="ml-4 space-y-2">
              <p><span className="font-semibold text-white">{translatedPrivacyTexts[72]}</span></p>
              <p>{translatedPrivacyTexts[73]} <a href="mailto:support@zodiya.net" className="text-white underline hover:text-pink-200">support@zodiya.net</a></p>
              <p>{translatedPrivacyTexts[74]} <a href="https://zodiya.net" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-pink-200">www-zodiya.net</a></p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 pt-6 text-center text-pink-100">
            <p className="mb-2">{translatedPrivacyTexts[75]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
