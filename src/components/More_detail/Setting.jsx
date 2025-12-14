import { useState } from 'react';
import { useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

const Setting = () => {
  // State to manage user preferences
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [showHoroscope, setShowHoroscope] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const settingTexts = useMemo(() => [
    "Zodiac Sign Settings",
    "Select Your Zodiac Sign:",
    "Show Daily Horoscope:",
    "Enable Notifications:",
    "Save changes and personalize your astrology experience!"
  ], []);

  const [
    zodiacSignSettingsText,
    selectYourZodiacSignText,
    showDailyHoroscopeText,
    enableNotificationsText,
    saveChangesText
  ] = useTranslatedTexts(settingTexts);

  // Handle changes in user preferences
  const handleSignChange = (sign) => {
    setSelectedSign(sign);
  };

  const handleHoroscopeToggle = () => {
    setShowHoroscope((prev) => !prev);
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled((prev) => !prev);
  };

  return (
    <div className="settings-page">
      <h1>{zodiacSignSettingsText}</h1>

      <div className="setting-item">
        <label>{selectYourZodiacSignText}</label>
        <select
          value={selectedSign}
          onChange={(e) => handleSignChange(e.target.value)}
        >
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
        </select>
      </div>

      <div className="setting-item">
        <label>{showDailyHoroscopeText}</label>
        <input
          type="checkbox"
          checked={showHoroscope}
          onChange={handleHoroscopeToggle}
        />
      </div>

      <div className="setting-item">
        <label>{enableNotificationsText}</label>
        <input
          type="checkbox"
          checked={notificationEnabled}
          onChange={handleNotificationToggle}
        />
      </div>

      <p>{saveChangesText}</p>
    </div>
  );
};

export default Setting;
