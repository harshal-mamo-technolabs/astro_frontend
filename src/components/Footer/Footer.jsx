import { Link } from "react-router-dom";
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Footer = () => {
  const footerTexts = useMemo(() => [
    "Terms",
    "Privacy"
  ], []);
  
  const [termsText, privacyText] = useTranslatedTexts(footerTexts);

  return (
    <footer className=" text-white p-4">
      <div className="container mx-auto">
        <div className="flex align-middle justify-center gap-5">
          <div className="font-bold text-xl"> Zodiya</div>
          <div className="flex space-x-4 mt-1">
            <Link to="/terms">
              <p className="underline cursor-pointer">{termsText}</p>
            </Link>
            <Link to="/privacy">
              <p className="underline cursor-pointer">{privacyText}</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
