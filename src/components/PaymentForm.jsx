import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStripe,useElements, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripeApiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeApiKey);

const PaymentForm = ({ clientSecret }) => {
  const [loading,setLoading]=useState()
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleStripePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
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
