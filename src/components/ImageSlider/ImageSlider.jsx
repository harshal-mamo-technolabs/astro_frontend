import  { useState, useEffect } from "react";
import styles from "./ImageSlider.module.scss";
import Numerology from  "../../assets/Numerlogyimg.png";
import  Natal from "../../assets/natalimg.png"
import Tarot from "../../assets/tarotimg.png"
import Horoscope from "../../assets/horoscope.png"
import Transit from "../../assets/transit.png"
import compantibility from "../../assets/compantibility.png"
import { useTranslatedText } from "../../hooks/useTranslatedText";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Translations
  const numerologyText = useTranslatedText("Numerology");
  const tarotPredictionText = useTranslatedText("Tarot prediction");
  const dailyTransitText = useTranslatedText("Daily transit");
  const horoscopesText = useTranslatedText("Horoscopes");
  const natalChartText = useTranslatedText("Natal chart");
  const compatibilityText = useTranslatedText("Compatibility");

  const images = [
    { url: Numerology, title: "Numerology", translatedTitle: numerologyText },
    { url: Tarot, title: "Tarot prediction", translatedTitle: tarotPredictionText },
    { url: Transit, title: "Daily transit", translatedTitle: dailyTransitText },
    { url: Horoscope, title: "Horoscopes", translatedTitle: horoscopesText },
    { url: Natal, title: "Natal chart", translatedTitle: natalChartText },
    { url: compantibility, title: "Compatibility", translatedTitle: compatibilityText },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderInner}>
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === currentIndex
                ? `${styles.activeSlide}`
                : `${styles.slide}`
            }
          >
            <img
              className={styles.imgSlide}
              src={image.url}
              alt={`Slide ${index}`}
              loading="lazy"
            />
            <h1 className={styles.title}>{image.translatedTitle}</h1>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={
              index === currentIndex ? `${styles.activeDot}` : `${styles.dot}`
            }
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
