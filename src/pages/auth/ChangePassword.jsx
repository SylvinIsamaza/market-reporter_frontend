import { useNavigate } from "react-router-dom";
import AuthLayout from "@layouts/AuthLayout";
import { useState } from "react";
import { useResetPassword } from "@hooks/auth"; 

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: changePassword, isPending,error } = useResetPassword();

  const handleSubmit = () => {
    const otp = localStorage.getItem("_reset_otp");
    if (!otp) {
      alert("Invalid or expired OTP. Please request a new one.");
      navigate("/verify-otp");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    changePassword(
      { otp, password },
      {
        onSuccess: () => {
          alert("Password changed successfully.");
          localStorage.removeItem("_reset_otp");
          navigate("/login");
        },
        onError: (error) => {
          alert("Error changing password. Please try again.");
          console.error(error);
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Cambiar Contraseña</h2>
          <span className="max-w-[19rem] text-secondary">
            Ingresa tu nueva contraseña a continuación.
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Nueva Contraseña</span>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Confirmar Contraseña</span>
            <input
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-3 gap-3 w-full">
            <button
              onClick={handleSubmit}
              disabled={isPending || !password || !confirmPassword}
              className={`p-4 rounded-md outline-none ${
                isPending ? "bg-gray-400" : "bg-primary text-white"
              }`}
            >
              {isPending ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ChangePassword;
