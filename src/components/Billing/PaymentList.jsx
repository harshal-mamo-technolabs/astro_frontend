import { Link, useNavigate, useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Box, Center, Divider, Text, Image, Heading, FormControl, FormLabel, Input, Flex, HStack, Button } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useProfile } from "../../context/Profile";
import Stripe from "../../assets/Stripe.png";
import visa from "../../assets/visa.png";
import axios from "axios";
import { Spin, message } from "antd";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_KEY
);

const mastercardLogo =
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png";

const stripeElementStyles = {
  base: {
    fontSize: "16px",
    color: "#ffffff",
    fontFamily: "Nunito, sans-serif",
    "::placeholder": { color: "#ffffff99" },
  },
  invalid: { color: "#ff6b6b" },
};

function AddCardModal({ clientSecret, onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message);
    } else {
      onSuccess();
    }
  };

  // Custom styles for Stripe elements with white placeholder
  const cardNumberElementOptions = {
    style: {
      base: {
        ...stripeElementStyles.base,
        '::placeholder': { color: '#fff', fontWeight: 'normal', fontSize: '16px' },
      },
      invalid: stripeElementStyles.invalid,
    },
    placeholder: 'Card Number',
  };
  const cardExpiryElementOptions = {
    style: {
      base: {
        ...stripeElementStyles.base,
        '::placeholder': { color: '#fff', fontWeight: 'normal', fontSize: '16px' },
      },
      invalid: stripeElementStyles.invalid,
    },
    placeholder: '--/--',
  };
  const cardCvcElementOptions = {
    style: {
      base: {
        ...stripeElementStyles.base,
        '::placeholder': { color: '#fff', fontWeight: 'normal', fontSize: '16px' },
      },
      invalid: stripeElementStyles.invalid,
    },
    placeholder: '123',
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex="50"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="#8946e6"
    >
      {/* Absolute close button at top-right of viewport */}
      <Button
        onClick={onClose}
        position="fixed"
        top={4}
        right={4}
        bg="transparent"
        color="#3d186b"
        fontSize="2xl"
        _hover={{ bg: 'gray.200' }}
        _active={{ bg: 'gray.300' }}
        borderRadius="full"
        minW="40px"
        h="40px"
        zIndex="100"
      >
        &times;
      </Button>
      <Box
        p={6}
        borderRadius="xl"
        maxW={{ base: "90%", md: "400px" }}
        w="100%"
        position="relative"
      >
        <Heading
          as="h3"
          size="md"
          textAlign="center"
          bg="#3d186b"
          py={3}
          color="white"
          borderRadius="md"
        >
          Add Card Details
        </Heading>
        <form onSubmit={handleSubmit}>
          {/* Card Number */}
          <FormControl mt={4}>
            <Box bg="#3d186b" p={2} borderRadius="md">
              <CardNumberElement options={cardNumberElementOptions} />
            </Box>
          </FormControl>
          {/* Card Brand Icons */}
          <Flex mt={2} align="center" gridGap={2}>
            <Image src={visa} alt="Visa" h="7" />
            <Image src={mastercardLogo} alt="MasterCard" h="7" />
          </Flex>
          {/* Cardholder Name */}
          <FormControl mt={4}>
            <FormLabel color="white">Name</FormLabel>
            <Input
              placeholder="Name"
              bg="#3d186b"
              color="white"
              borderRadius="md"
              _placeholder={{ color: "#fff" }}
              value={cardholderName}
              onChange={e => setCardholderName(e.target.value)}
            />
          </FormControl>
          {/* Expiry & CVC */}
          <HStack mt={4} spacing={3}>
            <FormControl flex="1">
              <FormLabel color="white">Expire date</FormLabel>
              <Box bg="#3d186b" p={2} borderRadius="md">
                <CardExpiryElement options={cardExpiryElementOptions} />
              </Box>
            </FormControl>
            <FormControl flex="1">
              <FormLabel color="white">Security Code</FormLabel>
              <Box bg="#3d186b" p={2} borderRadius="md">
                <CardCvcElement options={cardCvcElementOptions} />
              </Box>
            </FormControl>
          </HStack>
          {/* PCI DSS */}
          <Flex align="center" mt={4} gridGap={2}>
            <Image src={pciLogo} alt="PCI DSS" h="6" />
            <Text fontSize="xs" color="#3d186b" fontWeight="medium">
              Safe payment with PCI DSS standard
            </Text>
          </Flex>
          {/* Save Button */}
          <Button
            type="submit"
            mt={6}
            w="full"
            bg="#3d186b"
            color="white"
            borderRadius="full"
            py={3}
            fontWeight="bold"
            fontSize="lg"
            _hover={{ bg: "#5a2ea6" }}
            isDisabled={!stripe}
          >
            Save
          </Button>
          {error && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {error}
            </Text>
          )}
        </form>
        <Text fontSize="xs" mt={4} color="#3d186b" textAlign="center">
          Need assistance?{" "}
          <Link to="/home/support" textDecoration="underline">
            Contact support
          </Link>{" "}
          for help
        </Text>
      </Box>
    </Box>
  );
}

const pciLogo = 'https://banner2.cleanpng.com/20180527/sjv/avqv5swg2.webp';

const PaymentDetailList = () => {
    const navigate = useNavigate();
    const [fetchError, setFetchError] = useState(false);
    const { updateLoading, setUpdateLoading } = useProfile();
    const location = useLocation();
    const { selectedCard } = location.state || {};
    console.log(selectedCard, "card");
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showAddCard, setShowAddCard] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentList, setPaymentList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cardholderName, setCardholderName] = useState("");

    useEffect(() => {
        if (paymentList?.defaultPaymentMethodId) {
          setSelectedMethod(paymentList?.defaultPaymentMethodId);
        }
    }, [paymentList?.defaultPaymentMethodId]);

    const handleSelectMethod = (methodId) => {
        setSelectedMethod(methodId);
        // Automatically update the default payment method when a card is selected
        setUpdateLoading(true);
        axios
            .post(
                `${import.meta.env.VITE_BASE_URL}stripe/update-default-payment-method`,
                {
                    paymentMethodId: methodId,
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                message.success("Payment method updated successfully");
            })
            .catch((err) => {
                console.log(err);
                message.error("Failed to update payment method");
            })
            .finally(() => {
                setUpdateLoading(false);
            });
    };

    const fetchPaymentList = () => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`, {
                withCredentials: true,
            })
            .then((res) => {
                setLoading(false);
                setPaymentList(res.data);

                const noVisa =
                    !res.data?.paymentMethodsCard?.data ||
                    res.data.paymentMethodsCard.data.length === 0;
                const noPayPal =
                    !res.data?.paymentMethodsPayPal?.data ||
                    res.data.paymentMethodsPayPal.data.length === 0;

                if (noVisa && noPayPal) {
                    setFetchError(true);
                }
            })
            .catch((err) => {
                setLoading(false);
                setFetchError(true);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPaymentList();
    }, [updateLoading]);

    const handleAddNewCard = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}stripe/create-setup-intent`,
                {},
                { withCredentials: true }
            );
            if (response.data.clientSecret) {
                setClientSecret(response.data.clientSecret);
                setShowAddCard(true);
            } else {
                message.error("Failed to initialize card addition");
            }
        } catch (error) {
            console.error("Error creating setup intent:", error);
            message.error("Failed to initialize card addition");
        }
    };

    if (loading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
                <Spin />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white bg-gradient-to-r font-nunito-light from-indigo-700 to-purple-600">
            {showAddCard && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" } }}>
                    <AddCardModal
                        clientSecret={clientSecret}
                        onClose={() => setShowAddCard(false)}
                        onSuccess={() => {
                            message.success("Payment method added successfully");
                            setShowAddCard(false);
                            setClientSecret(null);
                            fetchPaymentList();
                        }}
                    />
                </Elements>
            )}

            <div className="p-2">
                <div className="flex gap-3 w-full p-3 text-white bg-[#1a102e]">
                    <LeftOutlined
                        className="lg:mt-2 mt-2 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <div className="flex justify-center w-full me-4 lg:me-6">
                        <h2>Billing</h2>
                    </div>
                </div>
                <div className="relative mt-5">
                    <Text className="text-center" fontSize={{base:"sm", md:"md"}} mb="4" mt="4">Choose a payment method </Text>
                    <Text className="text-center" fontSize={{base:"sm", md:"md"}}>Keep track of your billing details.</Text> 
                    <Text className="text-center" fontSize={{base:"sm", md:"md"}} mb="5">Update, set default, or delete your billings details</Text> 
                </div>
                <Spin spinning={loading} size="large">
                    <div className="container mx-auto px-4 py-8">
                        <Spin spinning={updateLoading} size="large">
                            <div>
                                {/* Payment Methods Section */}
                                <div className="space-y-4 mb-6">
                                    {/* Render credit card methods */}
                                    {paymentList?.paymentMethodsCard?.data?.map((method) => {
                                        const isSelected = selectedMethod === method.id;
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={() => handleSelectMethod(method.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        handleSelectMethod(method.id);
                                                    }
                                                }}
                                                tabIndex={0}
                                                role="button"
                                                aria-selected={isSelected}
                                                className={`bg-[#29286c] text-white rounded-lg p-4 shadow-md flex items-center cursor-pointer outline-none transition-all duration-150 ${
                                                    isSelected ? "ring-4 ring-orange-400 shadow-2xl" : ""
                                                }`}
                                            >
                                                <div className="flex-1">
                                                    <div className="flex justify-between gap-4 mb-2">
                                                        <span className="font-bold mr-2">
                                                            <Image src={visa} alt="visa" className="h-[45px] w-full" />
                                                        </span>
                                                        <span className="text-xs md:text-sm">
                                                            {method.card.brand} with the last four digits: {method.card.last4}
                                                            <br />
                                                            <span className="text-xs font-extralight">
                                                                Expire date: {method.card.exp_month}/{method.card.exp_year}
                                                            </span>
                                                        </span>
                                                        <AiOutlineRight className="text-xl text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Render PayPal methods */}
                                    {paymentList?.paymentMethodsPayPal?.data?.map((method) => {
                                        const isSelected = selectedMethod === method.id;
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={() => handleSelectMethod(method.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        handleSelectMethod(method.id);
                                                    }
                                                }}
                                                tabIndex={0}
                                                role="button"
                                                aria-selected={isSelected}
                                                className={`bg-[#29286c] text-white rounded-lg p-4 shadow-md flex items-center cursor-pointer outline-none transition-all duration-150 ${
                                                    isSelected ? "ring-4 ring-orange-400 shadow-2xl" : ""
                                                }`}
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <span className="font-medium">PayPal</span>
                                                        {paymentList.defaultPaymentMethodId === method.id && (
                                                            <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center text-gray-300 text-sm w-[50%] justify-between">
                                                        <span>Country: {method.paypal.country}</span>
                                                        <span>Payer ID: {method.paypal.payer_id}</span>
                                                        <span className="text-gray-300 text-sm">
                                                            Payer Email: {method.paypal.payer_email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Add New Card Button */}
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleAddNewCard}
                                        className="bg-[#582A8A] text-white px-8 py-3 rounded-full text-base font-medium hover:opacity-90 transition-opacity w-full md:w-auto"
                                    >
                                        Add New Payment Method
                                    </button>
                                </div>

                                {fetchError && (
                                    <Box className="flex justify-between w-full mt-4" bg="#da3a21">
                                        <div className="p-2">
                                            <Text className="text-[#f8ebe9] text-md">
                                                Failed to fetch payment methods. please try again.
                                            </Text>
                                        </div>
                                    </Box>
                                )}
                            </div>
                        </Spin>
                    </div>
                </Spin>
            </div>

            <div className="fixed bottom-[5px] left-0 right-0">
                <Box bg="transparent" bottom={2} px={2} textAlign="center" w={{ base: "100%", md: "full" }} mb="3">
                    <Divider/>
                    <Text fontSize="sm" m="3">
                        Need Assistance?  
                        <Link to="/home/support"> 
                        <span className="underline cursor-pointer"> Contact support </span></Link> 
                        for help
                        with managing your account.
                    </Text>
                </Box>
            </div>
        </div>
    );
}; 
export default PaymentDetailList;