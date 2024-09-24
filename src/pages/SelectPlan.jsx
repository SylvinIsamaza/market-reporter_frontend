import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { IoCheckmarkSharp } from "react-icons/io5";

const SelectPlan = () => {
  const navigate = useNavigate();
  const [subscriptionType, setSubscriptionType] = useState("Monthly");
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState();
  const [confirmPurchaseModalOpen, setConfirmPurchaseModalOpen] = useState(false);
  const creditPrice = 0.5;
  const basicPlanFeatures = [
    "Reports Generation",
    "Downloading Reports",
    "Selling Reports",
    "Personalised Dashboard",
  ];
  const advancedPlanFeatures = [
    "AI Report Generation",
    "Automated Billing",
    "AI Support Tools",
    "Personalised Dashboard",
  ];

  const prices = {
    Monthly: {
      basic: "$30",
      advanced: "$60",
    },
    OneTime: {
      basic: "$300",
      advanced: "$600",
    },
    credits: {
      basic: "10$ for 20 credits",
      advanced: "50$ for 130 credits",
    },
  };

  const handleBuyCredits = () => {
    setCreditsModalOpen(true);
  };

  const handleCreditPurchase = () => {
    setCreditsModalOpen(false)
    setConfirmPurchaseModalOpen(true); 
  };

  const handleConfirmPurchase = () => {
    const totalCost = creditAmount * creditPrice;
    alert(`You're purchasing ${creditAmount} credits for $${totalCost.toFixed(2)}.`);
    
    // Redirect to payment page with necessary details
    navigate(`/payment?plan=credits&amount=${creditAmount}`);
    
    setCreditsModalOpen(false);
    setConfirmPurchaseModalOpen(false); 
  };

  const handleSelectPlan = (planType) => {
    navigate(`/payment?plan=${planType}&subscriptionType=${subscriptionType}`);
  };

  return (
    <AuthLayout>
      <div className="h-screen hidden-scroll-container 800:px-[30px] px-[5px] overflow-auto py-20 flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Subscription & Payment</h2>
          <span className="text-secondary text-center">
            Choose a plan that suits your needs.
          </span>
        </div>

        {/* Subscription Type Selector */}
        <div className="flex mt-5 gap-2 800:w-[25rem] w-full min-h-[80px] p-2 bg-primary rounded-full overflow-hidden">
          <div
            className={`w-1/2 flex items-center justify-center ${
              subscriptionType === "Monthly" ? "bg-white" : "bg-primary"
            } rounded-full cursor-pointer`}
            onClick={() => setSubscriptionType("Monthly")}
          >
            <span
              className={`font-semibold ${
                subscriptionType === "Monthly" ? "text-primary" : "text-white"
              }`}
            >
              Monthly
            </span>
          </div>
          <div
            className={`w-1/2 flex items-center justify-center ${
              subscriptionType === "OneTime" ? "bg-white" : "bg-primary"
            } rounded-full cursor-pointer`}
            onClick={() => setSubscriptionType("OneTime")}
          >
            <span
              className={`font-semibold ${
                subscriptionType === "OneTime" ? "text-primary" : "text-white"
              }`}
            >
              One time
            </span>
          </div>
          <div
            className={`w-1/2 flex items-center justify-center ${
              subscriptionType === "credits" ? "bg-white" : "bg-primary"
            } rounded-full cursor-pointer`}
            onClick={() => setSubscriptionType("credits")}
          >
            <span
              className={`font-semibold ${
                subscriptionType === "credits" ? "text-primary" : "text-white"
              }`}
            >
              Credits
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end">
          {subscriptionType === "credits" ? (
            <button
              onClick={handleBuyCredits}
              className="min-h-[80px] md:w-fit w-full px-[30px] font-bold rounded-full bg-white text-primary "
            >
              Custom credits number
            </button>
          ) : (
            ""
          )}
        </div>

        {/* Subscription Plans */}
        <div className="flex justify-center gap-10 1540:flex-row flex-col w-full">
          {/* Basic Plan */}
          <div className="w-full flex-1 cursor-pointer gap-10 flex flex-col bg-white py-10 px-6 rounded-md">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Basic</h2>
              <span className="text-secondary">Basic Plan with limited features</span>
            </div>
            <span className="text-5xl font-semibold">{prices[subscriptionType].basic}</span>
            <div className="flex flex-col gap-3">
              {basicPlanFeatures.map((el, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IoCheckmarkSharp size={23} color="#2a66b4" />
                  <span>{el}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan("basic")}
              className="p-4 font-semibold bg-primary text-white rounded-md"
            >
              Select Plan
            </button>
          </div>

          {/* Professional Plan */}
          <div className="w-full flex-1 flex flex-col cursor-pointer gap-10 bg-primary text-white p-10 rounded-md">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Professional</h2>
              <span>Advanced Plan with multiple features</span>
            </div>
            <span className="text-5xl font-semibold">{prices[subscriptionType].advanced}</span>
            <div className="flex flex-col gap-3">
              {advancedPlanFeatures.map((el, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IoCheckmarkSharp size={23} color="white" />
                  <span>{el}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan("premium")}
              className="p-4 font-semibold bg-white text-primary rounded-md"
            >
              Select Plan
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Custom Credit Purchase */}
      {creditsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Buy Custom Credits</h2>
            <label className="block mb-2">Number of Credits:</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md mb-4"
              value={creditAmount}
              onChange={(e) => setCreditAmount(Number(e.target.value))}
              min="1"
            />
            <p className="mb-4">Total Price: ${(creditAmount * creditPrice).toFixed(2)}</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setCreditsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={handleCreditPurchase}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Credit Purchase */}
      {confirmPurchaseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p>You're about to purchase {creditAmount} credits for ${(creditAmount * creditPrice).toFixed(2)}. Do you want to proceed?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setConfirmPurchaseModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={handleConfirmPurchase}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default SelectPlan;
