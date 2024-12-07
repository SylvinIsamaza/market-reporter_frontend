import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { FaCircleCheck } from "react-icons/fa6";
import axios from "axios";
import client from "../api/client";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const paymentIntentId = searchParams.get("payment_intent");
      if (!paymentIntentId) return;

      try {
        const response = await client.get(`/payment/success?paymentIntentId=${paymentIntentId}`,{withCredentials:true});
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("Failed to fetch payment details.");
      }
    };

    fetchPaymentDetails();
  }, [searchParams]);

  if (error) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center">
          <span className="text-red-500">{error}</span>
        </div>
      </AuthLayout>
    );
  }

  if (!paymentDetails) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center">
          <span>Loading payment details...</span>
        </div>
      </AuthLayout>
    );
  }

  // Display payment details
  return (
    <AuthLayout>
      <div className="flex flex-col w-[25rem] gap-4">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center justify-center p-4 bg-[#00800017] rounded-full">
            <FaCircleCheck fill="green" size={40} />
          </div>
          <span className="">Payment completed successfully!</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-5xl font-semibold py-8">{paymentDetails.amount} €</span>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Payment Code</span>
            <span className="text-secondary">{paymentDetails.paymentIntentId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Date</span>
            <span className="text-secondary">{new Date(paymentDetails.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Gateway</span>
            <span className="text-secondary">{paymentDetails.gateway}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Plan</span>
            <span className="text-secondary">{paymentDetails.subscription.name}</span>
          </div>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="p-4 bg-primary text-white rounded-md mt-5 font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PaymentSuccess;
