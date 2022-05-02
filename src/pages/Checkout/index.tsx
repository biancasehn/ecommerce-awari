import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../../components";
import { Box, Flex } from "@chakra-ui/react";
import { useStore } from "../../services/store";
const stripePromise = loadStripe(
  "pk_test_51KsSfVAxNVAqBNTqwIDQ2RBBL838ElzNyimKRGF30JTsOwr5jF0jJ3CtF8RdCgl3l8RDhiAZYbhVbjpaW0PR4Fig00FLc5NZcw"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useStore();

  useEffect(() => {
    const getPaymentData = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_PAYMENT_URL}create-payment-intent`,
        cartItems
      );
      setClientSecret(data.data.clientSecret);
    };
    getPaymentData();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <Flex direction="column" align="center" p="32px">
      <Box fontSize="28px" textAlign="center" p="16px">
        Payment
      </Box>
      <Box p="16px">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </Box>
    </Flex>
  );
};

export default Checkout;
