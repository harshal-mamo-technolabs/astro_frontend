import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { translateTexts, translateText } from "../services/translationService";
import staticTranslations from "../translations/staticTranslations.json";

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  // eslint-disable-next-line no-unused-vars
  const [translations, setTranslations] = useState({}); // Cache: { "en:<lang>:text": "translated" }
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ro" || savedLanguage === "de")) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = useCallback((newLanguage) => {
    if (newLanguage === "en" || newLanguage === "ro" || newLanguage === "de") {
      // Clear translations cache when language changes to force fresh translations
      // This ensures components re-translate with the new language
      setTranslations({});
      setCurrentLanguage(newLanguage);
      localStorage.setItem("appLanguage", newLanguage);
    }
  }, []);

  const t = useCallback(
    async (text) => {
      if (currentLanguage === "en") {
        return text;
      }

      const cacheKey = `en:${currentLanguage}:${text}`;
      
      // Use functional update to avoid dependency on translations
      return new Promise((resolve) => {
        setTranslations((prev) => {
          // Check cache first
          if (prev[cacheKey]) {
            resolve(prev[cacheKey]);
            return prev;
          }

          // Check static translations file
          const staticTranslation = staticTranslations?.en?.[currentLanguage]?.[text];
          if (staticTranslation) {
            const newCache = { ...prev, [cacheKey]: staticTranslation };
            setTranslations(newCache);
            resolve(staticTranslation);
            return newCache;
          }

          // Check if already translating to avoid duplicate requests
          if (isTranslating) {
            resolve(text);
            return prev;
          }

          // Translate asynchronously via API (fallback for dynamic content)
          translateText(text, "en", currentLanguage)
            .then((translated) => {
              setTranslations((current) => ({
                ...current,
                [cacheKey]: translated,
              }));
              resolve(translated);
            })
            .catch((error) => {
              console.error("Translation error:", error);
              resolve(text);
            });

          return prev;
        });
      });
    },
    [currentLanguage, isTranslating]
  );

  const translateBatch = useCallback(
    async (texts) => {
      if (currentLanguage === "en") {
        return texts;
      }

      // Use functional update to access current translations
      return new Promise((resolve) => {
        setTranslations((prevTranslations) => {
          // Filter out texts that are already cached or in static translations
          const textsToTranslate = [];
          const cacheKeys = [];
          const results = [];
          const newCache = { ...prevTranslations };

          texts.forEach((text, index) => {
            const cacheKey = `en:${currentLanguage}:${text}`;
            cacheKeys.push(cacheKey);
            
            // Check cache first
            if (prevTranslations[cacheKey]) {
              results[index] = prevTranslations[cacheKey];
            } 
            // Check static translations
            else if (staticTranslations?.en?.[currentLanguage]?.[text]) {
              const staticTranslation = staticTranslations.en[currentLanguage][text];
              newCache[cacheKey] = staticTranslation;
              results[index] = staticTranslation;
            } 
            // Need to translate via API
            else {
              textsToTranslate.push({ text, index });
              results[index] = null; // Placeholder
            }
          });

          // Update cache with static translations
          if (Object.keys(newCache).length > Object.keys(prevTranslations).length) {
            setTranslations(newCache);
          }

          if (textsToTranslate.length === 0) {
            resolve(results);
            return newCache;
          }

          // Translate uncached texts via API (fallback for dynamic content)
          setIsTranslating(true);
          const textsArray = textsToTranslate.map((item) => item.text);
          
          translateTexts(textsArray, "en", currentLanguage)
            .then((translatedArray) => {
              setTranslations((current) => {
                const newTranslations = { ...current };
                translatedArray.forEach((translated, i) => {
                  const { index } = textsToTranslate[i];
                  const cacheKey = cacheKeys[index];
                  newTranslations[cacheKey] = translated;
                  results[index] = translated;
                });
                setIsTranslating(false);
                resolve(results);
                return newTranslations;
              });
            })
            .catch((error) => {
              console.error("Batch translation error:", error);
              textsToTranslate.forEach(({ text, index }) => {
                if (results[index] === null) {
                  results[index] = text;
                }
              });
              setIsTranslating(false);
              resolve(results);
            });

          return newCache;
        });
      });
    },
    [currentLanguage]
  );

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translateBatch,
    isTranslating,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

