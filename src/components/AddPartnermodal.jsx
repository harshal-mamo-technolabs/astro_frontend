import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Spin, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useProfile } from "../context/Profile";
import { useEffect, useState, useRef } from "react";
import { useTranslatedText } from "../hooks/useTranslatedText";

const { confirm } = Modal;

const AddPartnerModal = ({ onClose, free }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const {
    friendslist,
    setFriendslist,
    setLoadingProfile,
    loadingprofile,
    setPayprofile,
  } = useProfile();

  const [city, setCity] = useState("");
  const [cityPredictions, setCityPredictions] = useState([]);
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const inputRef = useRef();
  const [dontKnowTime, setDontKnowTime] = useState(false);

  // Translations
  const addProfileText = useTranslatedText("Add Profile");
  const maleText = useTranslatedText("Male");
  const femaleText = useTranslatedText("Female");
  const pleaseSelectGenderText = useTranslatedText("Please select a gender");
  const usernameLabelText = useTranslatedText("Username:");
  const usernameRequiredText = useTranslatedText("Username is required");
  const dateOfBirthLabelText = useTranslatedText("Date of Birth:");
  const dateOfBirthRequiredText = useTranslatedText("Date of Birth is required");
  const timeOfBirthLabelText = useTranslatedText("Time of Birth:");
  const timeOfBirthRequiredText = useTranslatedText("Time of Birth is required");
  const dontKnowTimeText = useTranslatedText("I don't know my exact birth time");
  const placeOfBirthLabelText = useTranslatedText("Place of Birth:");
  const placeOfBirthRequiredText = useTranslatedText("Place of Birth is required");
  const saveText = useTranslatedText("Save");
  const profileAddedText = useTranslatedText("Profile Added");

  useEffect(() => {
    if (city && city.length >= 2) {
      const timer = setTimeout(async () => {
        try {
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

  const handleCitySelect = async (description, place_id) => {
    const parts = description.split(',');
    const cityName = parts.length > 0 ? parts[0].trim() : description.trim();

    setCity(cityName);
    setValue("placeOfBirth", cityName);
    setSelectedPlaceId(place_id);
    setCityDropdownVisible(false);

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
        setValue("latitude", loc.lat);
        setValue("longitude", loc.lng);
      } else {
        setLatitude("");
        setLongitude("");
        setValue("latitude", "");
        setValue("longitude", "");
      }
    } catch (e) {
      setLatitude("");
      setLongitude("");
      setValue("latitude", "");
      setValue("longitude", "");
    }
  };

  const handleCityInput = (e) => {
    setCity(e.target.value);
    setCityDropdownVisible(true);
  };

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

  const onSubmit = (data) => {
    onClose();
    setLoadingProfile(true);
    const { dob, gender, timeOfBirth, username } = data;
    console.log("Submitting username:", username);
    const [year, month, day] = dob.split("-");
    const [hour, minute] = timeOfBirth.split(":");
    const postData = {
      gender,
      day: parseInt(day),
      month: parseInt(month),
      tzone: 5,
      year: parseInt(year),
      name: username,
      hour: dontKnowTime ? 0 : parseInt(hour),
      min: dontKnowTime ? 0 : parseInt(minute),
      lat: latitude || data.latitude || 5.4,
      lon: longitude || data.longitude || 6.4,
      city: city,
      free: free === true,
    };
    console.log("[AddPartnerModal] Submitting postData:", postData);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}friend/add`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        setLoadingProfile(false);
        console.log("[AddPartnerModal] API response:", res.data);
        setPayprofile(true);
        message.success(profileAddedText);
      })
      .catch((err) => {
        setLoadingProfile(false);
        setPayprofile(true);
        message.error(err?.response?.data?.msg);
        console.log("[AddPartnerModal] API error:", err?.response?.data);
      });
    const newdata = { ...data, id: Date.now() };
    setFriendslist([...friendslist, newdata]);
    reset();
    onClose();
  };

  return (
    <ModalContent className=" m-5 lg:m-0 md:m-0 bg-[#190C26]">
      <ModalHeader className="text-center text-white font-nunito-light bg-[#190C26]">
        {addProfileText}
      </ModalHeader>
      <ModalCloseButton className="text-white" />

      <ModalBody pb={6} className=" text-white bg-[#190C26]">
        <Spin spinning={loadingprofile}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.gender}>
                <label className="m-2">
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    {...register("gender", {
                      required: pleaseSelectGenderText,
                    })}
                  />
                  {maleText}
                </label>

                <label style={{ marginLeft: "5px" }} className="m-2">
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    {...register("gender", {
                      required: pleaseSelectGenderText,
                    })}
                  />
                  {femaleText}
                </label>
                <FormErrorMessage>
                  {errors.gender && errors.gender.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.username}>
                <FormLabel>{usernameLabelText}</FormLabel>
                <Input
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  borderColor="#9e9e9f"
                  {...register("username", {
                    required: usernameRequiredText,
                  })}
                  maxLength={35}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.dob}>
                <FormLabel>{dateOfBirthLabelText}</FormLabel>
                <InputGroup className="bg-white text-black rounded-md">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={CalendarIcon} color="gray.700" />
                  </InputLeftElement>
                  <Input
                    type="date"
                    {...register("dob", {
                      required: dateOfBirthRequiredText,
                    })}
                    max={new Date().toISOString().split("T")[0]}
                    min="1850-01-01"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.dob && errors.dob.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.timeOfBirth}>
                <FormLabel>{timeOfBirthLabelText}</FormLabel>
                <InputGroup className="bg-white text-black rounded-md">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={TimeIcon} color="gray.800" />
                  </InputLeftElement>
                  <Input
                    borderColor="#9e9e9f"
                    type="time"
                    {...register("timeOfBirth", {
                      required: !dontKnowTime && timeOfBirthRequiredText,
                    })}
                    isDisabled={dontKnowTime}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.timeOfBirth && errors.timeOfBirth.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={2}>
                <label>
                  <input
                    type="checkbox"
                    checked={dontKnowTime}
                    onChange={(e) => setDontKnowTime(e.target.checked)}
                    className="mr-2"
                  />
                  {dontKnowTimeText}
                </label>
              </FormControl>

              <FormControl isInvalid={errors.placeOfBirth} ref={inputRef}>
                <FormLabel>{placeOfBirthLabelText}</FormLabel>
                <Input
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  borderColor="#9e9e9f"
                  {...register("placeOfBirth", {
                    required: placeOfBirthRequiredText,
                    onChange: handleCityInput,
                  })}
                  value={city}
                  autoComplete="off"
                />
                {cityDropdownVisible && cityPredictions.length > 0 && (
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

                <FormErrorMessage>
                  {errors.placeOfBirth && errors.placeOfBirth.message}
                </FormErrorMessage>
              </FormControl>

              <ModalFooter>
                <div className=" w-full flex justify-center">
                  <button
                    type="submit"
                    className="w-full rounded-full font-nunito-light text-white font-light text-xl p-2 bg-[#9326DB]"
                  >
                    {saveText}
                  </button>
                </div>
              </ModalFooter>
            </Stack>
          </form>
        </Spin>
      </ModalBody>
    </ModalContent>
  );
};

export default AddPartnerModal;
