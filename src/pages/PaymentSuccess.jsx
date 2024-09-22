import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { FaCircleCheck } from "react-icons/fa6";

const PaymentSuccess = () => {
  const navigate = useNavigate();
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
          <span className="text-5xl font-semibold py-8">$60</span>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Payment Code</span>
            <span className="text-secondary">103483484BKCJF</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Date</span>
            <span className="text-secondary">August 25,2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Gateway</span>
            <span className="text-secondary">Credit Card</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Plan</span>
            <span className="text-secondary">Professional Plan</span>
          </div>
          <button
            onClick={() => navigate("/user-dashboard")}
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
