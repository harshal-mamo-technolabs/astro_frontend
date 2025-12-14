import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa";

const TranslationButton = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className=" flex justify-end me-4 ">
      <FaLanguage className="text-white text-2xl" />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
    </div>
  );
};

export default TranslationButton;
