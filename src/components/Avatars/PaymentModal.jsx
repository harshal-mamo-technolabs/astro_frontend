import {
  Box,
  Button,
  Center,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const PaymentModal = ({ handleChildClick }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent
        style={{
          width: "23rem",
        }}
        className="border-4 p-2  m-5 lg:m-0  border-[#6952e5]  drop-shadow-sm"
        bgGradient="linear(to-b, #28307B, #0B1337)"
      >
        <ModalHeader className="text-center text-white font-nunito-light">
          Add New Profile
        </ModalHeader>
        <ModalBody>
          <Box className="text-white text-center flex flex-col gap-5">
            <Text
              className="lg:text-2xl text-xl md:text-2xl text-center font-nunito-light"
              fontWeight="bold"
            >
              1 Profile
            </Text>
            <div>
              <Text>6.00$</Text>
              <Text>One time payment</Text>
            </div>

            <Center>
              <Button
                style={{
                  backgroundColor: "#5F66FD ",
                  color: "white",
                  marginTop: "20px",
                }}
                className=" lg:w-[40%] w-[60%]  rounded-full p-0 h-[7vh] border-none text-2xl font-semibold"
                onClick={handleChildClick}
              >
                Continue
              </Button>
            </Center>
          </Box>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default PaymentModal;
