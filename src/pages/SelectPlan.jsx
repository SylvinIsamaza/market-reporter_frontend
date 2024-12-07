import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { IoCheckmarkSharp } from "react-icons/io5";
import Planes from "@/components/Landing/Plans";

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
    <>
    <Planes/>
    </>
  );
};

export default SelectPlan;
