// BackToTopButton.jsx
import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity`}
    >
      <button
        onClick={scrollToTop}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        <FaArrowCircleUp className="text-2xl " />
      </button>
    </div>
  );
};

export default BackToTopButton;
