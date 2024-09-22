import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { IoCheckmarkSharp } from "react-icons/io5";

const SelectPlan = () => {
  const navigate = useNavigate();
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
  return (
    <AuthLayout>
      <div className="h-full px-10 py-20 flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Subscription & Payment</h2>
          <span className="text-secondary text-center">
            Choose a plan that suits your needs.
          </span>
        </div>
        <div className="flex mt-5 gap-2 w-[25rem] h-[4.2rem] p-2 bg-primary rounded-full overflow-hidden">
          <div className="w-1/2 flex items-center justify-center bg-white rounded-full cursor-pointer">
            <span className="font-semibold">Monthly</span>
          </div>
          <div className="w-1/2 flex items-center justify-center rounded-full cursor-pointer">
            <span className="font-semibold text-white">One time</span>
          </div>
        </div>
        <div className="flex justify-center gap-10 h-[30rem] w-full">
          <div className="w-[43%] cursor-pointer gap-10 flex flex-col bg-white py-10 px-6 rounded-md">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Basic</h2>
              <span className="text-secondary">
                Basic Plan with limited features
              </span>
            </div>
            <span className="text-5xl font-semibold">$30</span>
            <div className="flex flex-col gap-3">
              {basicPlanFeatures.map((el, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IoCheckmarkSharp size={23} color="#2a66b4" />
                  <span>{el}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/payment")}
              className="p-4 font-semibold bg-primary text-white rounded-md"
            >
              Select Plan
            </button>
          </div>
          <div className="w-[43%] flex flex-col cursor-pointer gap-10 bg-primary text-white p-10 rounded-md">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Professional</h2>
              <span>Advanced Plan with multiple features</span>
            </div>
            <span className="text-5xl font-semibold">$60</span>
            <div className="flex flex-col gap-3">
              {advancedPlanFeatures.map((el, index) => (
                <div key={index} className="flex items-center gap-2">
                  <IoCheckmarkSharp size={23} color="white" />
                  <span>{el}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/payment")}
              className="p-4 font-semibold bg-white text-primary rounded-md"
            >
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SelectPlan;
