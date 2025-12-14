import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

const EditPaymentModal = ({ isOpen, onClose, onSave }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentData, setPaymentData] = useState([]);
  const [formData, setFormData] = useState(paymentData[0]);
  console.log(formData, "formdata");
  console.log(selectedPaymentMethod, "selected option");
  const fetchPaymentMethods = async () => {
    const paymentRes = await fetch(
      `${import.meta.env.VITE_BASE_URL}stripe/list-payment-methods`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const paymentData = await paymentRes.json();
    setPaymentData(paymentData.paymentMethods.data);
  };
  useEffect(() => {
    if (formData) {
      setFormData({
        cardNumber: formData?.card.last4 || "",
        expDate: formData?.card.exp_year || "",
      });
    }
    fetchPaymentMethods();
  }, []);

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = paymentData.find(
      (method) => method.id === e.target.value
    );
    setSelectedPaymentMethod(selectedMethod);
    setFormData({
      cardholderName: selectedMethod.card.last4 || "",
      cardNumber: selectedMethod.cardNumber || "",
      expDate: selectedMethod.expDate || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      cardId: selectedPaymentMethod.id,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Payment Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select Card to edit</FormLabel>
            <Select onChange={handlePaymentMethodChange}>
              {paymentData?.map((method) => (
                <option key={method.id} value={method.id}>
                  **** **** **** {method.card.last4}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl mt={4}>
            <FormLabel>Cardholder Name</FormLabel>
            <Input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
            />
          </FormControl> */}

          <FormControl mt={4}>
            <FormLabel>Card Number</FormLabel>
            <Input
              type="number"
              name="cardNumber"
              value={formData?.cardNumber}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Expiration Date</FormLabel>
            <Input
              type="text"
              name="expDate"
              value={formData?.expDate}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPaymentModal;
