import { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

import Spinner from "@/components/Spinner";
import { useSendResetCode } from "@/hooks/auth";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { mutate: resetPassword, isPending } = useSendResetCode();
  const handleResetPassword = () => {
    resetPassword(
      { email },
      {
        onSuccess: () => {
          navigate("/verify-otp?next=/change-password");
        },
      }
    );
    // navigate("/user/dashboard")
  };
  return (
    <AuthLayout>
      <div className="flex 500:h-fit   500:w-[500px]  w-full flex-col gap-5  py-10 px-8 bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <div className="flex flex-col py-3 gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Correo electrónico:</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="outline-none rounded-md border px-4 py-3"
              placeholder="ejemplo@gmail.com"
            />
          </div>
  
  
        </div>

        <button
          onClick={handleResetPassword}
          className="rounded-md gap-[10px] bg-primary flex items-center justify-center text-white p-4 font-semibold"
        >
          {isPending && <Spinner />} continuar
        </button>
        <span className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer font-semibold"
          >
            Iniciar sesión
          </span>
        </span>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
