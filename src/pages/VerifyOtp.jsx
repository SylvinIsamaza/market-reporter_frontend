import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useVerifyOTP } from "@/hooks/auth";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextRoute = searchParams.get("next") || "/"; 
  const [otp, setOtp] = useState("");
  const { mutate: verifyOTP, isPending } = useVerifyOTP();
  

  const handleSubmit = () => {
    if(nextRoute == "/change-password"){
      localStorage.setItem("_reset_otp",otp)
      verifyOTP(
        { otp, email: localStorage.getItem("_user_email"),next:"change-password" },
        {
          onSuccess: () => {
            navigate("/change-password")
          },
          onError: (error) => {
           toast.error(error.message)
          },
        }
      );
     
    }
    else {
       
    verifyOTP(
      { otp, email: localStorage.getItem("_user_email") },
      {
        onSuccess: () => {
          navigate(nextRoute);
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    );
    }
   
  };
  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Verificación de OTP</h2>
          <span className="max-w-[19rem] text-secondary">
            Acabamos de enviar un código de 6 dígitos a{" "}
            <strong>{localStorage.getItem("_user_email")}</strong>, ingrésalo a continuación
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold">OTP</span>
          <div className="flex">
            <OTPInput
              inputStyle="otp"
              value={otp}
              onChange={setOtp}
              inputType="number"
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="flex flex-col py-3 gap-3 w-full">
            <button
              onClick={handleSubmit}
              disabled={isPending || otp.length !== 6}
              className={`p-4 rounded-md outline-none ${
                isPending ? "bg-gray-400" : "bg-primary text-white"
              }`}
            >
              {isPending ? "Verificando..." : "Verificar OTP"}
            </button>
            <span className="text-secondary">
              ¿No recibiste un código?{" "}
              <span className="text-primary font-semibold cursor-pointer">
                Enviar un nuevo código
              </span>
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
