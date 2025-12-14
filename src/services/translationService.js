import axios from "axios";

export const translateTexts = async (texts, source = "en", target = "ro") => {
  try {
   
    const textsToTranslate = texts.map((text) => {
      if (typeof text === "number") return String(text);
      return String(text || "");
    });

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}translation/translate`,
      {
        q: textsToTranslate,
        source: source,
        target: target,
      }
    );

    if (response.data?.success && Array.isArray(response.data.translations)) {
      return response.data.translations;
    }

    return textsToTranslate;
  } catch (error) {
    console.error("Translation API error:", error);
    
    return texts.map((text) => String(text || ""));
  }
};

export const translateText = async (text, source = "en", target = "ro") => {
  const translations = await translateTexts([text], source, target);
  return translations[0] || text;
};

