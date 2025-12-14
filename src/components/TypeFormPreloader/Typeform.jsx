import { useEffect } from "react";

const TypeForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const containerStyle = {
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <div
        // data-tf-live="01HVQYNQ80GZED7C0VWPGDY66M"
        data-tf-live="01J6AA9SWWAP4Q3BK8JY8CE2YW"
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};

export default TypeForm;
