import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth";
import Spinner from "@/components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();
  const handleLogin = () => {
    login(
      { email, password },
      
    );
    
  };
  return (
    <AuthLayout>
      <div className="flex 500:h-fit h-screen 500:w-[500px]  w-full flex-col gap-5  py-10 px-8 bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center">Iniciar sesión</h2>
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
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Contraseña:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="outline-none rounded-md border px-4 py-3"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Recuérdame</span>
            </div>
            <Link to={"/reset-password"} className="text-sm text-primary font-semibold">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="rounded-md gap-[10px] bg-primary flex items-center justify-center text-white p-4 font-semibold"
        >
          {isPending && <Spinner />} Iniciar sesión
        </button>
        <span className="text-center">
          ¿No tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer font-semibold"
          >
            Regístrate
          </span>
        </span>
      </div>
    </AuthLayout>
  );
};

export default Login;
