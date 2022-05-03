import { Box } from "@chakra-ui/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkoutSuccess",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.type);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      }
    });
  }, [stripe]);

  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign="center">
        <PaymentElement />
        <Box p="16px">
          <button
            style={{
              backgroundColor: "rgb(95, 173, 86)",
              color: "rgb(255,255,255)",
              fontWeight: "bold",
              padding: "10px",
            }}
            disabled={isLoading || !stripe || !elements}
          >
            <span>{isLoading ? <div></div> : "Pay now"}</span>
          </button>
        </Box>
        {message && <Box color="colorDanger">{message}</Box>}
      </Box>
    </form>
  );
};

export default CheckoutForm;
