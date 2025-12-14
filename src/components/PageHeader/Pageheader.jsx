import {
  Box,
  ButtonGroup,
  Circle,
  Flex,
  Image,
  Modal,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import Logo from "../.././../src/assets/logo.png";
import PreminumLogo from "../../assets/preminum.png";
import { useRef, useState } from "react";
import { useProfile } from "../../context/Profile";
import { PlusOutlined } from "@ant-design/icons";
import AddProfileModal from "../Avatars/AddProfileModal";
import PaymentModal from "../Avatars/PaymentModal";
const Pageheader = () => {
  const [isopen, setIsOpen] = useState(false);
  const { skip } = useProfile();
  const [Payprofile, setPayprofile] = useState(false);
  const initialRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChildClick = () => {
    toast({
      position: "top",
      duration: 2000,
      render: () => (
        <Box
          color="white"
          p={3}
          className=" bg-custom-gradient font-nunito-light text-center rounded-md"
        >
          Buy success
        </Box>
      ),
    });
    setPayprofile(true);
  };
  const handleToggle = () => {
    setIsOpen(!isopen);
  };

  return (
    <Box
      backgroundColor="rgba(255, 255, 255, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      color="white"
      p={{ md: 4, lg: 3 }}
    >
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        {Payprofile ? (
          <AddProfileModal />
        ) : (
          <PaymentModal handleChildClick={handleChildClick} />
        )}
      </Modal>
      <Flex justify="between" align="center">
        <Flex className=" w-full justify-between items-center">
          <Box p="1">
            <Image src={Logo} alt="logo" height={"60px"} />
          </Box>

          <Box className="flex gap-4">
            <div className="hidden lg:block">
              <Box className="flex  relative bottom-2 right-4 h-fit">
                <div className="mt-5 ms-3  cursor-pointer">
                  <Circle
                    size="60px"
                    color="white"
                    bg="#6255d9"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={onOpen}
                  >
                    <PlusOutlined className="text-[#8f8cb3] text-2xl mb-1" />
                  </Circle>

                  <p className=" font-thin text-white  lg:m-0 relative right-2 w-[85px]">
                    Add Profile
                  </p>
                </div>
                <div className="mt-5 p-1 cursor-pointer">
                  <Box w="60px" h="60px" borderRadius="full">
                    <Image
                      src="https://bit.ly/dan-abramov"
                      borderRadius="full"
                    />
                  </Box>
                  <p className="text-white font-nunito-light ms-4">Me</p>
                </div>
                <div className="mt-5 p-1  cursor-pointer">
                  <Box w="60px" h="60px" borderRadius="full">
                    <Image
                      src="https://bit.ly/dan-abramov"
                      borderRadius="full"
                    />
                  </Box>
                  <p className="  text-white  font-thin ms-3">lavna</p>
                </div>
              </Box>
            </div>
            <div
              className="p-2 h-fit  cursor-pointer shadow-lg border border-pink-600 hidden lg:block"
              style={{ boxShadow: "0 0 20px 8px rgba(183, 138, 203, 0.8)" }}
            >
              <Box w="60px" h="60px" borderRadius="full">
                <Image src="https://bit.ly/dan-abramov" borderRadius="full" />
              </Box>
              <p className="  text-white  font-thin ms-3">lavna</p>
            </div>
            <ButtonGroup gap={{ base: 2, md: 5, lg: 5 }}>
              <Link to={"premium"}>
                <div className="flex -space-x-1 overflow-hidden text-center ms-2 mt-2">
                  <Image
                    src={PreminumLogo}
                    alt="preminumlogo"
                    height={{ base: "40px", lg: "50px", md: "50px" }}
                  />
                </div>
                Preminum
              </Link>

              <Box className="lg:mt-3">
                {!skip ? (
                  <Profile />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Link to="/login">
                      <div className="w-16 h-16 rounded-full bg-blue-500 m-1 flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-600 transition duration-300">
                        Login
                      </div>
                    </Link>
                  </div>
                )}
              </Box>
            </ButtonGroup>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Pageheader;
