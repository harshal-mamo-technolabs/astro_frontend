import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../context/TranslationContext";

export const useTranslatedText = (text) => {
  const { t, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const prevTextRef = useRef(text);
  const prevLanguageRef = useRef(currentLanguage);
  const tRef = useRef(t);

  // Keep ref updated with latest function
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  useEffect(() => {
    // Translate when language changes or text changes.
    // Also translate on initial render if current language is not English
    const languageChanged = prevLanguageRef.current !== currentLanguage;
    const textChanged = prevTextRef.current !== text;

    // If nothing changed AND current language is English, we can skip
    if (!languageChanged && !textChanged && currentLanguage === "en") {
      return;
    }

    // Update refs immediately
    prevTextRef.current = text;
    prevLanguageRef.current = currentLanguage;

    // Immediately set the text based on language to avoid showing stale translations
    if (currentLanguage === "en") {
      setTranslatedText(text);
    } else {
      // For non-English, immediately show original text, then update with translation
      // This ensures we don't show stale translations from previous language
      setTranslatedText(text);
      
      // Then fetch and set the translation
      const translate = async () => {
        try {
          const translated = await tRef.current(text);
          // Only update if language hasn't changed during translation
          if (prevLanguageRef.current === currentLanguage) {
            setTranslatedText(translated);
          }
        } catch (error) {
          console.error("Translation error:", error);
          // Keep original text on error
        }
      };
      translate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, currentLanguage]);

  return translatedText;
};

export const useTranslatedTexts = (texts) => {
  const { translateBatch, currentLanguage } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState(texts);
  const prevTextsRef = useRef(texts);
  const prevLanguageRef = useRef(currentLanguage);
  const translateBatchRef = useRef(translateBatch);

  // Keep ref updated with latest function
  useEffect(() => {
    translateBatchRef.current = translateBatch;
  }, [translateBatch]);

  useEffect(() => {
    // Check if texts array actually changed (deep comparison for array)
    const textsChanged = 
      prevTextsRef.current.length !== texts.length ||
      prevTextsRef.current.some((text, index) => text !== texts[index]);
    
    // Always translate when language changes, even if texts haven't changed.
    // Also translate on initial render if current language is not English.
    const languageChanged = prevLanguageRef.current !== currentLanguage;
    
    if (!textsChanged && !languageChanged && currentLanguage === "en") {
      return;
    }

    // Update refs immediately
    prevTextsRef.current = texts;
    prevLanguageRef.current = currentLanguage;

    // Immediately set the texts based on language to avoid showing stale translations
    if (currentLanguage === "en") {
      setTranslatedTexts(texts);
    } else {
      // For non-English, immediately show original texts, then update with translation
      // This ensures we don't show stale translations from previous language
      setTranslatedTexts(texts);
      
      // Then fetch and set the translations
      const translate = async () => {
        try {
          const translated = await translateBatchRef.current(texts);
          // Only update if language hasn't changed during translation
          if (prevLanguageRef.current === currentLanguage) {
            setTranslatedTexts(translated);
          }
        } catch (error) {
          console.error("Batch translation error:", error);
          // Keep original texts on error
        }
      };
      translate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts, currentLanguage]);

  return translatedTexts;
};
