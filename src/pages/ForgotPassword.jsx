import { Link } from "react-router-dom";
import bg from "../assets/bg.mp4";
import { useState, useMemo } from "react";
import { useTranslatedText, useTranslatedTexts } from "../hooks/useTranslatedText";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // Translations
  const forgotPasswordTexts = useMemo(() => [
    "Forgot Your Password?",
    "Enter your email address and will send you a link to reset your password.",
    "Email address",
    "Login",
    "Send Reset Link",
    "A Password reset link has been sent to your email."
  ], []);

  const [forgotPasswordTitle, descriptionText, emailLabelText, loginLinkText, sendResetLinkText, resetLinkSentText] = useTranslatedTexts(forgotPasswordTexts);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  // Translation for error messages
  const errorOccurredText = useTranslatedText("An error occurred");

  const handleClick = async () => {
    // TODO: Check if valid email using validator
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/send-verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert(resetLinkSentText)
    }
    else {
      // Show error message (could be translated if added to staticTranslations.json)
      alert(data.msg || errorOccurredText)
    }
  }

  return (
    <div className="relative">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full  min-h-screen fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <div className=" mt-10">
        <div className="flex text-white  flex-col justify-center items-center">
          <div className="max-w-md w-full px-6 py-8 bg-transparent shadow-md overflow-hidden sm:rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-white  mb-6">
              {forgotPasswordTitle}
            </h2>
            <p className=" text-center mb-6">
              {descriptionText}
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  {emailLabelText}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleEmailChange}
                  className="mt-1 p-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-black"
                />
                <Link to="/login" className="text-blue-600 underline mt-2">
                  {loginLinkText}
                </Link>
              </div>
              <div>
                <div onClick={handleClick}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {sendResetLinkText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
