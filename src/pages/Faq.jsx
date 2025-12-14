import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const Faq = () => {
  const navigate = useNavigate();

  // Translations
  const faqTexts = useMemo(() => [
    "Frequently Asked Questions (FAQ)",
    "1. GENERAL QUESTIONS",
    "Q: What is Zodiya?",
    "A: Zodiya is a web-based astrology platform that offers personalized daily horoscopes, birth charts, compatibility analysis, numerology, tarot, and moon phase reports — all based on your unique birth data.",
    "Q: Is Zodiya free to use?",
    "A: Zodiya does not offer free usage. To access the platform, users must first create a profile on our landing page and select a subscription plan. A limited trial plan is available.",
    "Q: How accurate are the astrology readings?",
    "A: Our content is generated using a combination of traditional astrological principles and advanced algorithms. While rooted in authentic methods, readings are intended for self-reflection, guidance, and entertainment.",
    "2. ACCOUNT & REGISTRATION",
    "Q: How do I create an account?",
    "A: You start by entering your personal birth details on our landing page. After selecting and paying for a subscription plan, you'll receive login credentials via email.",
    "Q: Do I need a password to log in?",
    "A: Yes. Upon subscribing, you receive a secure username and password which you'll use to access the web app.",
    "Q: Can I delete my account?",
    "A: Yes. To permanently delete your account and all associated data, contact our support team at support@zodiya.net.",
    "3. SUBSCRIPTION & PAYMENT",
    "Q: What subscription plans are available?",
    "A: We offer a limited-time Trial Plan, the full-feature Premium Plan, and the expanded Gold Plan which includes multi-profile support and additional advanced tools.",
    "Q: How do I cancel my subscription?",
    "A: You can cancel your plan anytime via the Subscription section in your account settings. If you also have an active Profile Plan, it will be canceled automatically, and additional profiles will be removed.",
    "Q: What payment methods are accepted?",
    "A: We accept all major credit and debit cards via secure checkout. Payments are handled through our trusted partner Stripe.",
    "4. ASTROLOGY REPORTS & FEATURES",
    "Q: What kind of reports and features does Zodiya offer?",
    "A: Zodiya includes: Personalized Daily Horoscope, Full Natal Chart, Transit Chart (planetary influences), Moon Phase Report, Synastry (Compatibility) Reports, Numerology Reports, Daily Tarot Draw, Zodiac Sign Insights.",
    "Q: Can I add multiple profiles?",
    "A: Yes. With a valid Profile Plan (available in the Gold tier or as an add-on), you can add 1, 3, or 6 extra profiles and access full content for each.",
    "Q: How often is my content updated?",
    "A: Daily horoscopes, moon phase data, and tarot readings are updated every 24 hours based on your local time and planetary transits.",
    "5. DATA PRIVACY & SECURITY",
    "Q: How is my data protected?",
    "A: Zodiya complies with GDPR standards. All user data is encrypted and stored securely on protected servers.",
    "Q: Do you share my personal data?",
    "A: Absolutely not. Your personal information is never sold or shared with third parties. Please refer to our Privacy Policy for more details.",
    "Q: How can I request data deletion?",
    "A: Send your request to our Data Protection Officer at privacy@zodiya.net or through the Support section in your account.",
    "6. SUPPORT & TECHNICAL ASSISTANCE",
    "Q: How can I contact customer support?",
    "A: Reach us anytime at support@zodiya.net or through the Help section inside the app.",
    "Q: What should I do if I encounter a technical issue?",
    "A: First, try clearing your browser cache or switching to a different browser. Ensure your browser is up to date. If the issue persists, contact support with a description and screenshot if possible.",
    "Q: Can I request a refund?",
    "A: Refunds are handled in accordance with our refund policy. Please contact us at support@zodiya.net for specific assistance.",
    "For any additional questions, don't hesitate to reach out.",
    "Zodiya Support Team – We're here to help."
  ], []);

  const [faqTitle, generalQuestionsTitle, whatIsZodiyaQ, whatIsZodiyaA, isZodiyaFreeQ, isZodiyaFreeA, howAccurateQ, howAccurateA, accountRegistrationTitle, howCreateAccountQ, howCreateAccountA, needPasswordQ, needPasswordA, canDeleteAccountQ, canDeleteAccountA, subscriptionPaymentTitle, whatPlansQ, whatPlansA, howCancelQ, howCancelA, paymentMethodsQ, paymentMethodsA, reportsFeaturesTitle, whatReportsQ, whatReportsA, canAddProfilesQ, canAddProfilesA, howOftenUpdatedQ, howOftenUpdatedA, privacySecurityTitle, howDataProtectedQ, howDataProtectedA, shareDataQ, shareDataA, requestDeletionQ, requestDeletionA, supportTechnicalTitle, howContactQ, howContactA, technicalIssueQ, technicalIssueA, requestRefundQ, requestRefundA, additionalQuestionsText, supportTeamText] = useTranslatedTexts(faqTexts);

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
            <h2 className="text-3xl text-center">{faqTitle}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          {/* Section 1 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{generalQuestionsTitle}</h3>

            <div className="mb-6">
              <p className="font-bold text-white">{whatIsZodiyaQ}</p>
              <p>
                {whatIsZodiyaA}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{isZodiyaFreeQ}</p>
              <p>
                {isZodiyaFreeA}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{howAccurateQ}</p>
              <p>
                {howAccurateA}
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{accountRegistrationTitle}</h3>

            <div className="mb-6">
              <p className="font-bold text-white">{howCreateAccountQ}</p>
              <p>{howCreateAccountA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{needPasswordQ}</p>
              <p>{needPasswordA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{canDeleteAccountQ}</p>
              <p>{canDeleteAccountA}</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{subscriptionPaymentTitle}</h3>

            <div className="mb-6">
              <p className="font-bold text-white">{whatPlansQ}</p>
              <p>{whatPlansA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{howCancelQ}</p>
              <p>{howCancelA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{paymentMethodsQ}</p>
              <p>{paymentMethodsA}</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{reportsFeaturesTitle}</h3>

            <div className="mb-6">
              <p className="font-bold text-white">{whatReportsQ}</p>
              <p>{whatReportsA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{canAddProfilesQ}</p>
              <p>{canAddProfilesA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{howOftenUpdatedQ}</p>
              <p>{howOftenUpdatedA}</p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{privacySecurityTitle}</h3>

            <div className="mb-6">
              <p className="font-bold text-white">{howDataProtectedQ}</p>
              <p>{howDataProtectedA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{shareDataQ}</p>
              <p>{shareDataA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{requestDeletionQ}</p>
              <p>{requestDeletionA}</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{supportTechnicalTitle}</h3>

            <div className="mb-6">
              <p className="font-bold text-white">{howContactQ}</p>
              <p>{howContactA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{technicalIssueQ}</p>
              <p>{technicalIssueA}</p>
            </div>

            <div className="mb-6">
              <p className="font-bold text-white">{requestRefundQ}</p>
              <p>{requestRefundA}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 pt-6 text-center text-pink-100">
            <p>{additionalQuestionsText}</p>
            <p>{supportTeamText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
