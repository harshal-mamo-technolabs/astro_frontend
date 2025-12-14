import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { CardContext } from "../../context/CardsDataContext";
import { message } from "antd";
import bg from "../../assets/bg.mp4";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dob, setDOB] = useState({
    day: "",
    month: "",
    year: "",
  });
  const navigate = useNavigate();
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const { setSignupData } = useContext(CardContext);
  const [places, setPlaces] = useState([]);
  const { day, month, year } = dob;
  const { hour, minute } = timeOfBirth;
  const [gender, setGender] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !dob.day ||
      !dob.month ||
      !dob.year ||
      !city ||
      !timeOfBirth.hour ||
      !timeOfBirth.minute
    ) {
      message.error("Please fill in all required fields");
      return;
    }
    const currentDate = new Date();
    const timeZoneOffsetMinutes = currentDate.getTimezoneOffset();
    const apiUrl = `${import.meta.env.VITE_BASE_URL}users/signup`;
    const authCredentials = {
      username: "627719",
      password: "4e21077ce40109e9e98aa728c84cd60c",
    };
    const timeZoneOffsetHours = Math.abs(timeZoneOffsetMinutes) / 60;

    const formData = {
      name,
      email,
      password,
      day,
      month,
      year,
      city,
      hour,
      gender,
      min: minute,
      lon: longitude,
      lat: latitude,
      tzone: timeZoneOffsetHours,
    };

    try {
      setLoading(true);
      const response = await axios.post(apiUrl, formData, {
        auth: authCredentials,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSignupData(response.data);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.response.data.msg);
      message.error(error.response.data.msg);
    }
  };
  const handleSearch = async () => {
    try {
      const url = new URL(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`
      );
      url.searchParams.append("proximity", "ip");
      url.searchParams.append("types", "district,region");
      url.searchParams.append(
        "access_token",
        "pk.eyJ1Ijoibm9kZWpzbWFtb3RlY2giLCJhIjoiY2xzc210N3M1MHdjdTJscWlqb2U3M2pidiJ9.wGcALjpAA-6MHihVY_BScw"
      );

      const response = await fetch(url.toString());
      const data = await response.json();
      setPlaces(data.features);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}users/me/full`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data.data?.name) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setCity(e.target.value);
    handleSearch();
  };
  const handleSelect = (selectedCity) => {
    const selectedPlace = places.find(
      (place) => place.place_name === selectedCity
    );
    if (selectedPlace) {
      setLongitude(selectedPlace.center[0]);
      setLatitude(selectedPlace.center[1]);
    }
    setCity(selectedCity);
    setPlaces([]);
  };

  return (
    <div className="relative">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full  min-h-screen fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <div className="max-w-md mx-auto p-6 bg-[#1a102e] backdrop-blur-md bg-opacity-70 text-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Birth Information Form</h2>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Spinner size="xl" color="blue" thickness="10px" />
            <br />
            <p className=" font-bold  text-2xl text-black">
              Calculating Birth Chart...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={loading && "blur"}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-md"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium ">
              Date of Birth
            </label>
            <div className="flex">
              <input
                type="text"
                id="day"
                name="day"
                placeholder="Day"
                value={dob.day}
                onChange={(e) => setDOB({ ...dob, day: e.target.value })}
                className="w-1/3 px-4 py-2 text-black border rounded-l-md"
              />
              <input
                type="text"
                id="month"
                name="month"
                placeholder="Month"
                value={dob.month}
                onChange={(e) => setDOB({ ...dob, month: e.target.value })}
                className="w-1/3 px-4 py-2 text-black border"
              />
              <input
                type="text"
                id="year"
                name="year"
                placeholder="Year"
                value={dob.year}
                onChange={(e) => setDOB({ ...dob, year: e.target.value })}
                className="w-1/3 px-4 py-2 border text-black rounded-r-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="timeOfBirth" className="block text-sm font-medium ">
              Time of Birth
            </label>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <label htmlFor="hour" className="block text-xs ">
                  Hour
                </label>
                <select
                  id="hour"
                  name="hour"
                  value={timeOfBirth.hour}
                  onChange={(e) =>
                    setTimeOfBirth({ ...timeOfBirth, hour: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md text-black"
                >
                  {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour < 10 ? `0${hour}` : hour}>
                      {hour === 0
                        ? `${hour}(12 midnight)`
                        : hour === 12
                        ? `${hour}(12 noon)`
                        : hour < 12
                        ? `${hour}(am)`
                        : `${hour - 12}(pm)`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="minute" className="block text-xs ">
                  Minute
                </label>
                <select
                  id="minute"
                  name="minute"
                  value={timeOfBirth.minute}
                  onChange={(e) =>
                    setTimeOfBirth({ ...timeOfBirth, minute: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md text-black"
                >
                  {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute} (min)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium ">
              Select your birth place
            </label>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Type your city..."
                  value={city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-black rounded-md"
                />

                <ul className="bg-white  text-black">
                  {places.map((place) => (
                    <li
                      key={place.id}
                      onClick={() => handleSelect(place.place_name)}
                      className="cursor-pointer p-1"
                    >
                      <strong className="cursor-pointer hover:bg-gray-400">
                        {place.place_name}
                      </strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm font-light m-3 text-gray-100 mt-4 dark:text-gray-400">
            Already have an account.?
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-2 px-4 rounded-md "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BirthForm;
