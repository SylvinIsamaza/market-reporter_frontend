
import { useState } from "react";
import { useSignup } from "../hooks/auth";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const { mutate: signup, isPending, error, } = useSignup(
    
  )
  
  const handleSubmit = () => {
    localStorage.setItem("_user_email",email)
    signup({
      email,
      password,
      phone
    })
    // navigate("/verify-otp")
    
  }
  
  return (
    <AuthLayout>
      <div className="flex flex-col gap-5 500:h-fit h-screen  lg:w-[600px] md:max-w-[600px] w-full  py-10 px-8 bg-white rounded-md">
        <h2 className="text-2xl font-semibold text-center">Registro</h2>
        <div className="flex flex-col py-3 gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Nombres:</label>
            <input
              onChange={(e)=>{setPhone(e.target.value)}}
              type="text"
              className="outline-none rounded-md border px-4 py-3"
              placeholder="Juan Pérez"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Correo electrónico:</label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              className="outline-none rounded-md border px-4 py-3"
              placeholder="ejemplo@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Contraseña:</label>
            <input
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              className="outline-none rounded-md border px-4 py-3"
              placeholder="Contraseña"
            />
          </div>
       
        </div>

        <button
          onClick={handleSubmit}
          className="rounded-md flex items-center justify-center bg-primary text-white p-4 font-semibold"
        >
        {isPending&&<Spinner/>}  Registrar
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

export default Signup;
