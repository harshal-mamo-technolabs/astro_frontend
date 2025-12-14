import { CardContext } from "../../context/CardsDataContext";
import { useContext, useEffect, useState, useRef } from "react";
import {
  Box,
  Center,
  Input,
  Radio,
  Text,
} from "@chakra-ui/react";
import { message as antdMessage } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslatedText, useTranslatedTexts } from "../../hooks/useTranslatedText";
import { useMemo } from "react";

import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";

const EditProfile = () => {
  const { fullprofile } = useContext(CardContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [edited, setEdited] = useState(false);

  const editProfileTexts = useMemo(() => [
    "Gender",
    "Male",
    "Female",
    "Name",
    "Select your Birth place",
    "Type your city...",
    "Email",
    "DOB",
    "Day",
    "Month",
    "Year",
    "Hour",
    "Minute",
    "Save",
    "Profile updated successfully",
    "Failed to save profile. Please try again.",
    "12 midnight",
    "12 noon",
    "am",
    "pm",
    "min"
  ], []);

  const [genderText, maleText, femaleText, nameText, selectBirthPlaceText, typeCityText, emailText, dobText, dayText, monthText, yearText, hourText, minuteText, saveText, profileUpdatedText, failedSaveText, midnightText, noonText, amText, pmText, minText] = useTranslatedTexts(editProfileTexts);

  const [city, setCity] = useState("");
  const [cityPredictions, setCityPredictions] = useState([]);
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const [timeOfBirth, setTimeOfBirth] = useState({
    hour: 0,
    minute: 0
  });
  const [dob, setDob] = useState({
    day: '',
    month: '',
    year: ''
  });

  const [canEditDetails, setCanEditDetails] = useState(false);

  // Update state values when fullprofile changes and check edit permissions
  useEffect(() => {
    if (fullprofile) {
      setName(fullprofile.name || "");
      setEmail(fullprofile.email || "");
      setGender(fullprofile.gender || "");
      setCity(fullprofile.city || "");
      setLongitude(fullprofile.longitude || "");
      setLatitude(fullprofile.latitude || "");
      setTimeOfBirth({
        hour: fullprofile.hour ? parseInt(fullprofile.hour) : 0,
        minute: fullprofile.min ? parseInt(fullprofile.min) : 0
      });
      setDob({
        day: fullprofile.day || '',
        month: fullprofile.month || '',
        year: fullprofile.year || ''
      });

      // Call API to check edit permissions
      axios.get(`${import.meta.env.VITE_BASE_URL}users/check-updated-details`, {
        withCredentials: true,
      })
        .then(res => {
          console.log("API response for check-updated-details:", res.data);
          if (res.data.success) {
            setCanEditDetails(res.data.updatedDetails);
            console.log("canEditDetails set to:", res.data.updatedDetails);
          }
        })
        .catch(err => {
          console.error("Error checking updated details:", err);
          // Optionally handle error, e.g., keep fields read-only
          setCanEditDetails(false); // Ensure fields remain read-only on error
          console.log("canEditDetails set to false due to error");
        });
    }
  }, [fullprofile]);

  const navigate = useNavigate();
  const inputRef = useRef();

  // Helper to get days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const handleMonthYearChange = (newMonth, newYear) => {
    const daysInMonth = getDaysInMonth(newMonth, newYear);
    setDob(prev => ({
      ...prev,
      month: newMonth,
      year: newYear,
      day: prev.day > daysInMonth ? daysInMonth : prev.day
    }));
  };

  // Fetch city autocomplete suggestions
  useEffect(() => {
    if (city && city.length >= 2) {
      const timer = setTimeout(async () => {
        try {
          // Your backend API call here
          const resp = await axios.get(
            `${import.meta.env.VITE_BASE_URL}google/places-autocomplete?input=${encodeURIComponent(city)}`,
            {
              withCredentials: true,
            }
          );
          const data = resp.data;
          setCityPredictions(data.predictions || []);
          setCityDropdownVisible(true);
        } catch (e) {
          setCityPredictions([]);
        }
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setCityPredictions([]);
      setCityDropdownVisible(false);
    }
  }, [city]);

  // When a city suggestion is selected
  const handleCitySelect = async (description, place_id) => {
    // Attempt to extract just the city name from the description
    // This is a basic attempt and might need refinement depending on the description format
    const parts = description.split(',');
    const cityName = parts.length > 0 ? parts[0].trim() : description.trim();

    setCity(cityName); // Set the extracted city name
    setSelectedPlaceId(place_id);
    setCityDropdownVisible(false);

    // Fetch lat/lng from backend
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BASE_URL}google/geocode?place_id=${place_id}`,
        {
          withCredentials: true,
        }
      );
      const data = resp.data;
      const loc = data.result?.geometry?.location;
      if (loc) {
        setLatitude(loc.lat);
        setLongitude(loc.lng);
      } else {
        setLatitude("");
        setLongitude("");
      }
    } catch (e) {
      setLatitude("");
      setLongitude("");
    }
  };

  const handleCityInput = (e) => {
    setCity(e.target.value);
    setCityDropdownVisible(true);
  };

  // Hide city dropdown on outside click
  useEffect(() => {
    const handleClick = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setCityDropdownVisible(false);
      }
    };
    if (cityDropdownVisible) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [cityDropdownVisible]);

  // Handle Save Profile
  const handleSave = async () => {
    try {
      const data = {
        day: parseInt(dob.day) || undefined,
        month: parseInt(dob.month) || undefined,
        year: parseInt(dob.year) || undefined,
        hour: parseInt(timeOfBirth.hour),
        min: parseInt(timeOfBirth.minute),
        lat: latitude || '',
        lon: longitude || '',
        name: name,
        email: email,
        gender: gender,
        city: city
      };
      Object.keys(data).forEach(key => {
        if (data[key] === undefined) delete data[key];
      });
      await axios.post(`${import.meta.env.VITE_BASE_URL}users/update`, data, {
        withCredentials: true,
      });
      antdMessage.success(profileUpdatedText);
      window.location.reload();
    } catch (error) {
      antdMessage.error(error.response?.data?.msg || failedSaveText);
    }
  };

  let zodiacSignIcon;
  switch (fullprofile?.zodiacSign) {
    case "Gemini": zodiacSignIcon = <TbZodiacGemini className="text-8xl" />; break;
    case "Aries": zodiacSignIcon = <TbZodiacAries className="text-8xl" />; break;
    case "Taurus": zodiacSignIcon = <TbZodiacTaurus className="text-8xl" />; break;
    case "Cancer": zodiacSignIcon = <TbZodiacCancer className="text-8xl" />; break;
    case "Leo": zodiacSignIcon = <TbZodiacLeo className="text-8xl" />; break;
    case "Virgo": zodiacSignIcon = <TbZodiacVirgo className="text-8xl" />; break;
    case "Libra": zodiacSignIcon = <TbZodiacLibra className="text-8xl" />; break;
    case "Scorpio": zodiacSignIcon = <TbZodiacScorpio className="text-8xl" />; break;
    case "Sagittarius": zodiacSignIcon = <TbZodiacSagittarius className="text-8xl" />; break;
    case "Capricorn": zodiacSignIcon = <TbZodiacCapricorn className="text-8xl" />; break;
    case "Aquarius": zodiacSignIcon = <TbZodiacAquarius className="text-8xl" />; break;
    case "Pisces": zodiacSignIcon = <TbZodiacPisces className="text-8xl" />; break;
    default: zodiacSignIcon = <TbZodiacAries className="text-8xl" />; break;
  }

  return (
    <div className="flex justify-center">
      <Box className="px-2 py-1">
        <Box className="flex flex-col flex-wrap text-white font-semibold">
          <div className="flex justify-center">
            <div className="p-2 sm:w-full md:w-[500px] lg:w-[600px] xl:w-[700px]">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="mb-3 mt-1">{genderText}</p>
                  <div className="flex gap-4 w-full">
                    <Box className="p-2 rounded" bg="#551d91" backdropFilter="blur(6px)" w="full" textAlign="center">
                      <Radio
                        isReadOnly={canEditDetails}
                        isChecked={gender === "male"}
                        onChange={() => setGender("male")}
                      >{maleText}</Radio>
                    </Box>
                    <Box className="p-2 rounded" bg="#551d91" backdropFilter="blur(6px)" w="full" textAlign="center">
                      <Radio
                        isReadOnly={canEditDetails}
                        isChecked={gender === "female"}
                        onChange={() => setGender("female")}
                      >{femaleText}</Radio>
                    </Box>
                  </div>
                </div>
                <div>
                  <p className="mb-3">{nameText}</p>
                  <Input
                    isReadOnly={canEditDetails}
                    variant="outline"
                    placeholder={nameText}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    bg="#551d91"
                    className="backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md text-center"
                    border="none"
                  />
                </div>
                <div ref={inputRef}>
                  <p className="mb-3">{selectBirthPlaceText}</p>
                  <div className="relative">
                    <Input
                      isReadOnly={canEditDetails}
                      variant="outline"
                      type="text"
                      placeholder={typeCityText}
                      value={city}
                      onChange={handleCityInput}
                      bg="#551d91"
                      className="backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md text-center"
                      border="none"
                      autoComplete="off"
                    />
                    {cityDropdownVisible && !canEditDetails && cityPredictions.length > 0 && (
                      <ul className="absolute z-50 left-0 w-full bg-white text-black rounded shadow max-h-60 overflow-auto mt-1">
                        {cityPredictions.map((prediction) => (
                          <li
                            key={prediction.place_id}
                            onClick={() =>
                              handleCitySelect(
                                prediction.description,
                                prediction.place_id
                              )
                            }
                            className="cursor-pointer p-2 hover:bg-purple-200"
                          >
                            {prediction.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-3">{emailText}</p>
                  <Input
                    isReadOnly
                    variant="outline"
                    placeholder={emailText}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    bg="#551d91"
                    className="backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md text-center"
                    border="none"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <p className="mb-3">{dobText}</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <select
                        value={dob.day}
                        onChange={(e) => setDob({ ...dob, day: parseInt(e.target.value) || '' })}
                        disabled={canEditDetails}
                        className="w-full px-4 py-2 border rounded-md text-white bg-[#551d91] border-none"
                      >
                        <option value="">{dayText}</option>
                        {[...Array(getDaysInMonth(dob.month || 1, dob.year || new Date().getFullYear()))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/3">
                      <select
                        value={dob.month}
                        onChange={(e) => {
                          const newMonth = parseInt(e.target.value) || '';
                          handleMonthYearChange(newMonth, dob.year);
                        }}
                        disabled={canEditDetails}
                        className="w-full px-4 py-2 border rounded-md text-white bg-[#551d91] border-none"
                      >
                        <option value="">{monthText}</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/3">
                      <select
                        value={dob.year}
                        onChange={(e) => {
                          const newYear = parseInt(e.target.value) || '';
                          handleMonthYearChange(dob.month, newYear);
                        }}
                        disabled={canEditDetails}
                        className="w-full px-4 py-2 border rounded-md text-white bg-[#551d91] border-none"
                      >
                        <option value="">{yearText}</option>
                        {[...Array(100)].map((_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 pr-2">
                    <div className="flex justify-between items-center">
                      <p className="mb-3">{hourText}</p>
                    </div>
                    <select
                      id="hour"
                      name="hour"
                      value={timeOfBirth.hour}
                      onChange={(e) => setTimeOfBirth({ ...timeOfBirth, hour: parseInt(e.target.value) })}
                      disabled={canEditDetails}
                      className="w-full px-4 py-2 border rounded-md text-white bg-[#551d91] border-none"
                    >
                      {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={hour}>
                          {hour === 0
                            ? `${hour}(${midnightText})`
                            : hour === 12
                              ? `${hour}(${noonText})`
                              : hour < 12
                                ? `${hour}(${amText})`
                                : `${hour - 12}(${pmText})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="flex justify-between items-center">
                      <p className="mb-3">{minuteText}</p>
                    </div>
                    <select
                      id="minute"
                      name="minute"
                      value={timeOfBirth.minute}
                      onChange={(e) => setTimeOfBirth({ ...timeOfBirth, minute: parseInt(e.target.value) })}
                      disabled={canEditDetails}
                      className="w-full px-4 py-2 border rounded-md text-white bg-[#551d91] border-none"
                    >
                      {[...Array(60).keys()].map((minute) => (
                        <option key={minute} value={minute}>
                          {minute < 10 ? `0${minute}` : minute} ({minText})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Center>
                  <Box mt={6} mb={4}>
                    <button
                      className={`${fullprofile?.updatedDetails ? 'bg-[#1a102e]' : 'bg-[#9829ea]'} w-[20rem] text-white rounded-full px-4 py-2`}
                      onClick={handleSave}
                    >
                      {saveText}
                    </button>
                  </Box>
                </Center>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default EditProfile;
