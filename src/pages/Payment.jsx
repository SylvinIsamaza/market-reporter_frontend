import AuthLayout from "../layouts/AuthLayout";
import Paypal from "../assets/images/paypal.png";
import { FaCreditCard } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
  return (
    <AuthLayout>
      <div className="flex flex-col gap-10 max-w-[27rem]">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Payment</h2>
          <span className="text-secondary text-sm">
            To finalise your subscription, kindly complete your Payment Using a
            valid credit/debit card number
          </span>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span>Select Payment Method</span>
            <div className="flex flex-col gap-4">
              <div
                onClick={() => setSelectedPaymentMethod(1)}
                className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-md"
              >
                <div className="flex gap-3 items-center">
                  <img src={Paypal} alt="" className="h-5" />
                  <span>Paypal</span>
                </div>
                <div
                  className={`h-5 w-5 rounded-full ${
                    selectedPaymentMethod === 1
                      ? "bg-primary"
                      : "bg-white border border-secondary"
                  }`}
                ></div>
              </div>
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
            <div className="flex flex-col gap-3">
              <label>Card Holder Name</label>
              <input className="p-4 outline-none rounded-md"></input>
            </div>
            <div className="flex flex-col gap-3">
              <label>Card Number</label>
              <input className="p-4 outline-none rounded-md"></input>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3 w-[48%]">
                <label>Expiry date</label>
                <input
                  type="date"
                  className="p-4 outline-none rounded-md"
                ></input>
              </div>
              <div className="flex flex-col gap-3 w-[48%]">
                <label>CVV</label>
                <input className="p-4 outline-none rounded-md"></input>
              </div>
            </div>
            <button
              onClick={() => navigate("/payment-success")}
              className="p-4 bg-primary mt-4 text-white rounded-md font-semibold"
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Payment;
