import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ clientSecret }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStripePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://localhost:5173/payment-success", 
      },
    });

    if (error) {
      setCardError(error.message);
      setIsLoading(false);
    } else {
      console.log("Payment successful");
      navigate("/payment-success");
    }
  };

  return (
    <form onSubmit={handleStripePayment}>
      <PaymentElement />
      {cardError && <span className="text-red-500">{cardError}</span>}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="p-4 bg-primary mt-4 w-full text-white rounded-md font-semibold"
      >
        {isLoading ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
};

export default PaymentForm;
