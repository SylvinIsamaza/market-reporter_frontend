import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Paypal from "../assets/images/paypal.png";
import { FaCreditCard } from "react-icons/fa6";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaymentForm from "@/components/PaymentForm";
import axios from "axios";
import client from "../api/client";
const stripeApiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeApiKey);

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
  const [searchParams] = useSearchParams();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const plan = searchParams.get("plan");
    const credits = searchParams.get("amount");
    const subscriptionType = searchParams.get("subscriptionType");

    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await client.post(
          "/payment/create-payment-intent",
          {
            plan: subscriptionType != "" ? subscriptionType + plan : "" + plan,
            credits: credits,
          },
          {
            withCredentials: true,
          }
        );
        setClientSecret(response.data.client_secret);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
        setLoading(false);
      }
    };

    if (plan) {
      createPaymentIntent();
    }
  }, [searchParams]);

  const options = {
    clientSecret,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-10 max-w-[27rem]">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Payment</h2>
          <span className="text-secondary text-sm">
            To finalize your subscription, kindly complete your payment using a
            valid credit/debit card.
          </span>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span>Select Payment Method</span>
            <div className="flex flex-col gap-4">

              <div
                onClick={() => setSelectedPaymentMethod(2)}
                className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-md"
              >
                <div className="flex gap-3 items-center">
                  <FaCreditCard color="#2a66b4" size={22} />
                  <span>Credit/Debit Card</span>
                </div>
                <div
                  className={`h-5 w-5 rounded-full ${
                    selectedPaymentMethod === 2
                      ? "bg-primary"
                      : "bg-white border border-secondary"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {selectedPaymentMethod === 1 ? (
              <PayPalScriptProvider
                options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "10.00",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    console.log(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );
                    navigate("/payment-success");
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Payment;
