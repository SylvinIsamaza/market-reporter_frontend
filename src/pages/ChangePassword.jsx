import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import {  useResetPassword } from "../hooks/auth";
import Spinner from "@/components/Spinner";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { mutate: resetPassword, isPending,error } = useResetPassword();

  const validateForm = () => {
    const newErrors = {};
    if (newPassword.length < 8) {
      newErrors.newPassword = "La contraseña debe tener al menos 8 caracteres.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = () => {
    if (!validateForm()) return;

    resetPassword(
      { password:newPassword },
      {
        onSuccess: () => {
          setErrors({});
          navigate("/dashboard");
        },
      }
      
    );
  };

  return (
    <AuthLayout>
      <div className="flex h-screen 500:h-fit 500:w-[500px] w-full flex-col gap-5 py-10 px-8 bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center">
          Cambiar Contraseña
        </h2>
        <div className="flex flex-col py-3 gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Nueva Contraseña:</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              value={newPassword}
              className={`outline-none rounded-md border px-4 py-3 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nueva contraseña"
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm">{errors.newPassword}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Confirmar Contraseña:</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              value={confirmPassword}
              className={`outline-none rounded-md border px-4 py-3 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirmar contraseña"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          className="rounded-md gap-[10px] bg-primary flex items-center justify-center text-white p-4 font-semibold disabled:opacity-50"
          disabled={isPending}
        >
          {isPending && <Spinner />} Cambiar Contraseña
        </button>
        <span className="text-center">
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer font-semibold"
          >
            Volver a Iniciar Sesión
          </span>
        </span>
      </div>
    </AuthLayout>
  );
};

export default ChangePassword;