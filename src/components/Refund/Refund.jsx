import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar";
import ZodiacNav from "../More_detail/ZodiacNav";
import ZodiacAvatar from "../More_detail/ZodiacAvatar";
import bg from "../../assets/bg.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Refund = () => {
  const navigate = useNavigate();

  const refundTexts = useMemo(() => [
    "Refund Policy",
    "ZODIYA REFUND POLICY",
    "1. General Policy",
    "We want you to be completely satisfied with your Zodiya experience.",
    "If you are not satisfied with your purchase, you may request a refund under the terms outlined below.",
    "2. Eligibility for Refund",
    "You may request a full refund within 30 days from the date of your initial payment.",
    "Refunds are available only for payments made directly through the Zodiya platform (https://zodiya.net).",
    "Refunds are not applicable in the following cases:",
    "If more than 30 days have passed since your initial payment.",
    "If the subscription has been fully used for the paid period without cancellation.",
    "If the user violated our Terms of Use or engaged in fraudulent activity.",
    "3. Refund Procedure",
    "To request a refund, please contact our support team at",
    "with your payment details (email, transaction ID, or card reference).",
    "Once approved, the refund will be processed within 5–10 business days to your original payment method.",
    "4. Subscription Cancellations",
    "You can cancel your subscription at any time through your Zodiya account settings.",
    "Canceling a subscription prevents future charges but does not automatically trigger a refund for past payments.",
    "5. Additional Information",
    "Comparo Media d.o.o. reserves the right to deny refund requests that do not meet the conditions above.",
    "By purchasing or subscribing to Zodiya, you acknowledge and agree to this Refund Policy.",
    "Company Information",
    "Tometići 15a, 51215 Kastav, Croatia",
    "By using Zodiya, you acknowledge that you have read, understood, and agreed to this Refund Policy."
  ], []);

  const translatedRefundTexts = useTranslatedTexts(refundTexts);

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
            <h2 className="text-3xl text-center">{translatedRefundTexts[0]}</h2>
          </div>
        </div>

        <div className="w-full max-w-3xl bg-purple-950/80 p-8 rounded-lg text-pink-100 font-sans">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl mb-2 font-bold text-white">{translatedRefundTexts[1]}</h1>
          </div>

          {/* Section 1 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedRefundTexts[2]}</h3>
            <p className="mb-4">
              {translatedRefundTexts[3]}
            </p>
            <p>
              {translatedRefundTexts[4]}
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedRefundTexts[5]}</h3>
            <p className="mb-4">
              {translatedRefundTexts[6]}
            </p>
            <p className="mb-4">
              {translatedRefundTexts[7].replace("(https://zodiya.net)", "")} (<a href="https://zodiya.net" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-pink-200">https://zodiya.net</a>).
            </p>
            <p className="mb-4">
              {translatedRefundTexts[8]}
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="ml-4">{translatedRefundTexts[9]}</li>
              <li className="ml-4">{translatedRefundTexts[10]}</li>
              <li className="ml-4">{translatedRefundTexts[11]}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedRefundTexts[12]}</h3>
            <p className="mb-4">
              {translatedRefundTexts[13]} <a href="mailto:support@zodiya.net" className="text-white underline hover:text-pink-200">support@zodiya.net</a> {translatedRefundTexts[14]}
            </p>
            <p>
              {translatedRefundTexts[15]}
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedRefundTexts[16]}</h3>
            <p className="mb-4">
              {translatedRefundTexts[17]}
            </p>
            <p>
              {translatedRefundTexts[18]}
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4 font-semibold">{translatedRefundTexts[19]}</h3>
            <p className="mb-4">
              {translatedRefundTexts[20]}
            </p>
            <p>
              {translatedRefundTexts[21]}
            </p>
          </div>

          {/* Company Information */}
          <div className="mb-8 border-t border-white/20 pt-6">
            <h3 className="text-2xl mb-4 font-semibold">{translatedRefundTexts[22]}</h3>
            <div className="space-y-2">
              <p><span className="font-semibold text-white">Comparo Media d.o.o.</span></p>
              <p>{translatedRefundTexts[23]}</p>
              <p>{useTranslatedText("Email:")} <a href="mailto:support@zodiya.net" className="text-white underline hover:text-pink-200">support@zodiya.net</a></p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 pt-6 text-center text-pink-100">
            <p className="mb-2">{translatedRefundTexts[24]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;

