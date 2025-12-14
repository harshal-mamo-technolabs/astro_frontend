import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import bg from "../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";
import { useMemo } from "react";

const SubscriptionAndBilling = () => {
  const navigate = useNavigate();

  const subscriptionTexts = useMemo(() => [
    "💳 Subscription & Billing",
    "In this section, you'll find helpful information about how Zodiya subscriptions work, available plans, billing cycles, cancellations, and how to manage your account.",
    "🗂️ Available Plans",
    "Zodiya offers several subscription tiers tailored to different user needs:",
    "Trial Plan – A time-limited preview with basic access",
    "Premium Plan – Full access to daily content, core astrology tools, and multiple profiles features",
    "Gold Plan – Includes all Premium features + support for multiple profiles and additional in-depth reports",
    "All plans require payment during the signup process. You'll receive login credentials by email after successful registration.",
    "🔁 Billing & Renewals",
    "Subscriptions are billed on a recurring basis depending on the selected plan.",
    "You'll always be notified of your billing frequency and amount before confirming payment.",
    "Renewals are automatic unless you cancel before the next billing date.",
    "💡 You can view your next billing date and subscription status anytime from your",
    "Settings > Plans",
    "page.",
    "❌ Cancellations",
    "You can cancel your subscription at any time via the",
    "Plans",
    "section in your account settings.",
    "Upon cancellation, your access will remain active until the end of your current billing period.",
    "If you have an active Profile Plan, it will also be canceled and all additional profiles will be removed.",
    "📩 Receipts & Payment History",
    "After each payment, you'll receive a confirmation email with your invoice or receipt.",
    "Billing history is also available within your account for easy reference.",
    "💬 Support",
    "For help with subscription issues, failed payments, or billing errors, contact our support team at:",
    "📧",
    "We're here to assist you with anything related to your account, payments, or plan management.",
    "Zodiya is a subscription-based service designed for flexibility, transparency, and ease of use. You're always in control of your experience."
  ], []);

  const translatedSubscriptionTexts = useTranslatedTexts(subscriptionTexts);
  const settingsText = useTranslatedText("Settings");
  const plansText = useTranslatedText("Plans");

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
            <h2 className="text-3xl text-center">{translatedSubscriptionTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          <p className="text-center mb-8">
            {translatedSubscriptionTexts[1]}
          </p>

          <div className="space-y-8">
            {/* Available Plans */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedSubscriptionTexts[2]}</h3>
              <p>{translatedSubscriptionTexts[3]}</p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedSubscriptionTexts[4]}</li>
                <li>{translatedSubscriptionTexts[5]}</li>
                <li>{translatedSubscriptionTexts[6]}</li>
              </ul>
              <p className="mt-2">
                {translatedSubscriptionTexts[7]}
              </p>
            </div>

            {/* Billing & Renewals */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedSubscriptionTexts[8]}</h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedSubscriptionTexts[9]}</li>
                <li>{translatedSubscriptionTexts[10]}</li>
                <li>{translatedSubscriptionTexts[11]}</li>
              </ul>
              <p className="mt-2">
                💡 {translatedSubscriptionTexts[12]} <strong>{settingsText} &gt; {plansText}</strong> {translatedSubscriptionTexts[14]}
              </p>
            </div>

            {/* Cancellations */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedSubscriptionTexts[15]}</h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>{translatedSubscriptionTexts[16]} <strong>{plansText}</strong> {translatedSubscriptionTexts[18]}</li>
                <li>{translatedSubscriptionTexts[19]}</li>
                <li>{translatedSubscriptionTexts[20]}</li>
              </ul>
            </div>

            {/* Receipts & Payment History */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedSubscriptionTexts[21]}</h3>
              <p>
                {translatedSubscriptionTexts[22]}
              </p>
              <p className="mt-2">
                {translatedSubscriptionTexts[23]}
              </p>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold mb-2">{translatedSubscriptionTexts[24]}</h3>
              <p>
                {translatedSubscriptionTexts[25]}
              </p>
              <p className="mt-2">
                {translatedSubscriptionTexts[26]} <a href="mailto:support@zodiya.net" className="underline text-pink-200">support@zodiya.net</a>
              </p>
              <p className="mt-2">
                {translatedSubscriptionTexts[27]}
              </p>
            </div>
          </div>

          <p className="text-center mt-8">
            {translatedSubscriptionTexts[28]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAndBilling;
