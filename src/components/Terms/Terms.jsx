import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar";
import ZodiacNav from "../More_detail/ZodiacNav";
import ZodiacAvatar from "../More_detail/ZodiacAvatar";
import bg from "../../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Terms = () => {
  const navigate = useNavigate();

  const termsTexts = useMemo(() => [
    "Terms of Use",
    "ZODIYA TERMS AND CONDITIONS",
    "Effective Date:",
    "Welcome to Zodiya! These Terms and Conditions govern your access and use of our astrology services, reports, and related content. By using Zodiya, you agree to these terms. If you do not agree, please do not use our services.",
    "1. INTRODUCTION",
    "These Terms and Conditions (\"Terms\") constitute a legal agreement between you (\"User\") and Zodiya (\"Company,\" \"we,\" \"us,\" or \"our\"). They outline the rules and obligations for using our astrology reports, features, and subscriptions.",
    "2. ELIGIBILITY",
    "You must be at least 18 years old to use Zodiya.",
    "By registering, you confirm that all information provided is accurate.",
    "3. ACCOUNT REGISTRATION",
    "Users must provide their name, birth date, birth place, and email to access reports.",
    "You agree to keep your account details confidential and notify us immediately of unauthorized use.",
    "4. SERVICES PROVIDED",
    "Zodiya provides astrology reports, birth charts, numerology insights, and compatibility analysis.",
    "Some services are free, while others require a paid subscription.",
    "The content is for entertainment and informational purposes only.",
    "5. SUBSCRIPTIONS, PAYMENTS & CANCELLATIONS",
    "Users can subscribe to paid plans (1-month or 3-month premium access) with automatic renewals unless canceled.",
    "Payments are processed via Stripe, PayPal, and other payment gateways.",
    "Users may cancel their subscription at any time, but refunds are subject to our refund policy.",
    "Any failed payments may result in restricted access to premium features.",
    "6. USER RESPONSIBILITIES",
    "You agree not to misuse the platform, distribute false information, or violate intellectual property rights.",
    "You must not share or resell purchased astrology reports.",
    "7. PRIVACY & DATA PROTECTION (GDPR COMPLIANCE)",
    "We collect and process personal data according to our",
    "Users have the right to request, modify, or delete their personal data under GDPR (General Data Protection Regulation) regulations.",
    "Data is securely stored and not shared with third parties without user consent.",
    "8. INTELLECTUAL PROPERTY RIGHTS",
    "All content, including astrology reports, designs, and trademarks, belongs to Zodiya.",
    "Users may not copy, reproduce, or distribute Zodiya content without permission.",
    "9. LIMITATION OF LIABILITY",
    "Zodiya does not guarantee the accuracy of astrology reports or their impact on users' lives.",
    "We are not liable for decisions made based on our content.",
    "Users agree that astrology readings are for entertainment purposes only.",
    "10. RIGHT TO MODIFY TERMS",
    "Zodiya reserves the right to update these Terms at any time.",
    "Users will be notified of significant changes, and continued use implies acceptance.",
    "11. COMPLIANCE WITH EUROPEAN UNION LAWS",
    "This agreement complies with EU regulations, including GDPR, the Consumer Rights Directive (2011/83/EU), and the Unfair Commercial Practices Directive (2005/29/EC).",
    "Users within the EU have additional protections regarding digital content and refunds.",
    "12. DISPUTE RESOLUTION & GOVERNING LAW",
    "These Terms are governed by the laws of the European Union and [Your Country's Jurisdiction].",
    "Disputes will be resolved through arbitration or an EU dispute resolution body before legal proceedings.",
    "13. CONTACT INFORMATION",
    "For questions regarding these Terms, you may contact us at:",
    "Zodiya Customer Support",
    "Email:",
    "Website:",
    "By using Zodiya, you acknowledge that you have read, understood, and agreed to these Terms and Conditions."
  ], []);

  const translatedTermsTexts = useTranslatedTexts(termsTexts);
  const privacyPolicyText = useTranslatedText("Privacy Policy");

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
            <h2 className="text-3xl text-center">{translatedTermsTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl mb-2 font-bold text-white">{translatedTermsTexts[1]}</h1>
            <p className="text-lg text-pink-200">{translatedTermsTexts[2]} 1.7.2025</p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="mb-4">
              {translatedTermsTexts[3]}
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[4]}</h3>
            <p>
              {translatedTermsTexts[5]}
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[6]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[7]}</li>
              <li className="ml-4">{translatedTermsTexts[8]}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[9]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[10]}</li>
              <li className="ml-4">{translatedTermsTexts[11]}</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[12]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[13]}</li>
              <li className="ml-4">{translatedTermsTexts[14]}</li>
              <li className="ml-4">{translatedTermsTexts[15]}</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[16]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[17]}</li>
              <li className="ml-4">{translatedTermsTexts[18]}</li>
              <li className="ml-4">{translatedTermsTexts[19]}</li>
              <li className="ml-4">{translatedTermsTexts[20]}</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[21]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[22]}</li>
              <li className="ml-4">{translatedTermsTexts[23]}</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[24]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[25]} <a href="/privacy" className="text-white underline hover:text-pink-200">{privacyPolicyText}</a>.</li>
              <li className="ml-4">{translatedTermsTexts[26]}</li>
              <li className="ml-4">{translatedTermsTexts[27]}</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[28]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[29]}</li>
              <li className="ml-4">{translatedTermsTexts[30]}</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[31]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[32]}</li>
              <li className="ml-4">{translatedTermsTexts[33]}</li>
              <li className="ml-4">{translatedTermsTexts[34]}</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[35]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[36]}</li>
              <li className="ml-4">{translatedTermsTexts[37]}</li>
            </ul>
          </div>

          {/* Section 11 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[38]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[39]}</li>
              <li className="ml-4">{translatedTermsTexts[40]}</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[41]}</h3>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedTermsTexts[42]}</li>
              <li className="ml-4">{translatedTermsTexts[43]}</li>
            </ul>
          </div>

          {/* Section 13 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedTermsTexts[44]}</h3>
            <p className="mb-4">
              {translatedTermsTexts[45]}
            </p>
            <div className="ml-4 space-y-2">
              <p><span className="font-semibold text-white">{translatedTermsTexts[46]}</span></p>
              <p>{translatedTermsTexts[47]} <a href="mailto:support@zodiya.net" className="text-white underline hover:text-pink-200">support@zodiya.net</a></p>
              <p>{translatedTermsTexts[48]} <a href="https://zodiya.net" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-pink-200">www.zodiya.net</a></p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 pt-6 text-center text-pink-100">
            <p className="mb-2">{translatedTermsTexts[49]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
