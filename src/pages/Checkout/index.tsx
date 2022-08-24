import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Box, Flex } from "@chakra-ui/react";
import { Helmet, CheckoutForm } from "../../components";
import { useStore } from "../../services/store";
import { calculateTotal } from "../../utils/calcs";
const stripePromise = loadStripe(
  "pk_test_51KsSfVAxNVAqBNTqwIDQ2RBBL838ElzNyimKRGF30JTsOwr5jF0jJ3CtF8RdCgl3l8RDhiAZYbhVbjpaW0PR4Fig00FLc5NZcw"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentData = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_PAYMENT_URL}/create-payment-intent`,
        cartItems
      );
      setClientSecret(data.data.clientSecret);
    };

    if (calculateTotal(cartItems) <= 0) {
      return navigate("/", { replace: true });
    }
    getPaymentData();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <>
      <Helmet path={"Checkout"} />
      <Flex direction="column" align="center">
        <Box fontSize="28px" textAlign="center" p="16px">
          Payment: €{calculateTotal(cartItems)},00
        </Box>
        <Box p="16px">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Checkout;
