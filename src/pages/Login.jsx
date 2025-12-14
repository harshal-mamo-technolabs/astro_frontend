import { Box, useToast } from "@chakra-ui/react";
import CardButton from "../components/CardButton/CardButton";
import { useContext, useEffect, useState, useMemo } from "react";
import bg from "../assets/bg.mp4";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { CardContext } from "../context/CardsDataContext";
import { useTranslatedTexts } from "../hooks/useTranslatedText";
import LanguageToggle from "../components/LanguageToggle/LanguageToggle";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();
  const { setLoginUser, signupData } = useContext(CardContext);
  const [loading, setloading] = useState(false);

  // Translations
  const loginTexts = useMemo(() => [
    "Login",
    "Email:",
    "Enter your email",
    "Password:",
    "Enter your password",
    "Forgot password?",
    "Login",
    "Don't have an account yet?",
    "Sign up",
    "Login Success.",
    "Login Failed.",
    "Invalid email or password."
  ], []);

  const [loginTitle, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, forgotPasswordText, loginButtonText, noAccountText, signUpText, loginSuccessText, loginFailedText, invalidCredentialsText] = useTranslatedTexts(loginTexts);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
  console.log(signupData, "signup data");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { password } = userData;
  //   if (password.length > 5) {
  //     setUser(userData);
  //     toast({
  //       title: "Login Sucess.",
  //       position: "top",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });

  //     navigate("/home");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}users/login`,
        {
          email: userData.email,
          password: userData.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setloading(false);
      setLoginUser(response.data);

      toast({
        title: loginSuccessText,
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error) {
      setloading(false);
      console.error("Login Error:", error.message);
      toast({
        title: loginFailedText,
        description: invalidCredentialsText,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
      <Box className="absolute top-4 right-4 z-10">
        <LanguageToggle isSimpleButton={true} />
      </Box>
      {/* <Box className="p-3">
        <Navbar />
      </Box>{" "} */}
      <Box className="w-full flex justify-center items-center ">
        <div className=" p-8 mt-20 rounded shadow-md w-full max-w-md bg-[#1a102e] backdrop-blur-md bg-opacity-70 container text-white m-2">
          <h2 className="text-3xl font-semibold mb-4 text-center">{loginTitle}</h2>
          <Spin spinning={loading} size="large">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-md font-bold mb-2" htmlFor="email">
                  {emailLabel}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={userData.email}
                  placeholder={emailPlaceholder}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block  text-md font-bold mb-2"
                  htmlFor="password"
                >
                  {passwordLabel}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  required
                  value={userData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder={passwordPlaceholder}
                />
                <Link
                  to="/forgot-password"
                  className="mt-4 underline text-blue-600 hover:text-blue-600 hover:underline"
                >
                  {forgotPasswordText}
                </Link>
              </div>
              <CardButton type={"submit"}>{loginButtonText}</CardButton>
            </form>
          </Spin>

          <p className="text-sm font-light text-gray-100 mt-4 dark:text-gray-400">
            {noAccountText}{" "}
            <Link
              to="/"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              {signUpText}
            </Link>
          </p>
          {/*<div className="mt-4">*/}
          {/*  <p className="text-md text-center">Or sign in with:</p>*/}
          {/*  <div className="flex mt-2 justify-center gap-5">*/}
          {/*    <Box bg={"white"} className=" text-4xl cursor-pointer rounded">*/}
          {/*      <FcGoogle />*/}
          {/*    </Box>*/}
          {/*    <Box w={35} className="cursor-pointer">*/}
          {/*      <img src={gmailicon} />*/}
          {/*    </Box>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </Box>
    </div>
  );
};

export default Login;
