import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Text, Divider, Flex, Center } from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import axios from "axios";
import { message } from "antd";

const DeletionSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
          try {
            await axios.post(
              `${import.meta.env.VITE_BASE_URL}users/logout`,
              {},
              { withCredentials: true }
            );
      
            // Delay logout message
            setTimeout(() => {
              message.success("Logout success");
            }, 2000);
          } catch (error) {
            console.error("Error during logout after deactivation:", error);
            message.error("Logout failed, redirecting to login.");
          } finally {
            // Clear local/session data regardless of outcome
            localStorage.clear();
            sessionStorage.clear();
      
            // Redirect after 3 seconds
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 3000);
          }
        };
      
        performLogout();
      }, [navigate]);
  
    return (
        <Flex
            direction="column"
            minH="100vh"
            className="text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600"
        >
            {/* Header */}
            <Box className="p-2">
                <Box className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
                    <LeftOutlined
                        className="lg:mt-2 mt-2 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <Box className="flex justify-center w-full me-4 lg:me-6">
                        <h2>Delete Account</h2>
                    </Box>
                </Box>
            </Box>



            {/* Content */}
            <Box px={6} pt={8} pb={28} className="flex flex-col items-center justify-center flex-grow text-center">
            
            <Divider w="80%" borderColor="white" mb={6}/>
            
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Your account has been successfully deleted!
                </Text>
                <Text fontSize="md" color="#d1c4e9" mb={6}>
                    A confirmation email has been sent.
                </Text>
                
                <Divider w="80%" borderColor="white" mb={6}/>

            </Box>

            {/* Footer fixed to 5px from bottom */}
            <Box
                position="absolute"
                bottom="5px"
                left="0"
                w="full"
                textAlign="center"
            >
                <Divider mb={3} />
                <Text fontSize="sm" color="#d1c4e9" m="3">
                    Need assistance?
                    <Link to="/home/support">
                        <span className="underline cursor-pointer"> Contact support </span>
                    </Link>
                    for help with managing your account.
                </Text>
            </Box>
        </Flex>
    );
};

export default DeletionSuccessPage; 