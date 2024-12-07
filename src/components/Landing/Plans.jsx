import { IoCheckmarkSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Planes = () => {
  const navigate = useNavigate();
  const basicPlanFeatures = [
    "Propiedades comparativas",
    "Precio de venta de mercado",
    "Precio de alquiler de mercado",
    "Índice de alquiler",
    "Enlaces a herramientas y servicios",
    "Logo de Inmoemprende",
  ];
  const savingPlanFeatures = [
    "Todo en el plan Básico",
    "Ahorra 49,90€ con 5 informes",
    "Acceso al panel de control",
  ];
  const professionalPlanFeatures = [
    "Todo en el plan Básico",
    "Panel de control con informes generados guardados",
    "Panel de control para descarga de facturas",
    "Eliminación de la hoja de visita del informe. Si se desea",
  ];
  const businessPlanFeatures = [
    "Todo en el plan Pro",
    "Logo de tu empresa en los informes",
    "Personalización de los códigos QR",
    "Eliminación de la referencia de coste",
  ];

  return (
    <div id="Planes" className="flex w-full flex-col items-center justify-center gap-14 py-16 px-6">
      <span className="text-3xl font-semibold text-center">
        Planes de precios
      </span>

      <div className="flex justify-center items-center">

      <div className="grid px- grid-cols-1 md:grid-cols-2 2xl:grid-cols-4  gap-[10px] md:gap-[30px]  w-fit">
        
        <div className="hover:border-primary  transition hover:border-2 border border-secondary cursor-pointer flex flex-col  bg-white py-10 px-6 rounded-md w-full justify-between max-w-[500px] 2xl:w-[22rem]">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Básico</h2>
            <span className="text-secondary">1 informe completo</span>
          </div>
          <span className="text-5xl font-semibold">24,90€</span>
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
            Seleccionar plan
          </button>
        </div>

        {/* Saving Plan */}
        <div className="hover:border-primary transition hover:border-2 border border-secondary cursor-pointer flex flex-col justify-between bg-white py-10 px-6 rounded-md  w-full max-w-[500px] 2xl:w-[22rem]">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Ahorro</h2>
            <span className="text-secondary">5 informes completos</span>
          </div>
          <span className="text-5xl font-semibold">74,90€</span>
          <div className="flex flex-col gap-3">
            {savingPlanFeatures.map((el, index) => (
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
            Seleccionar plan
          </button>
        </div>

        {/* Professional Plan */}
        <div className="bg-primary text-white cursor-pointer flex flex-col py-10 px-6 rounded-md  w-full justify-between max-w-[500px] 2xl:w-[22rem]">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Profesional</h2>
            <span>25 informes completos/mes</span>
          </div>
          <span className="text-5xl font-semibold">149,90€/mes</span>
          <div className="flex flex-col gap-3">
            {professionalPlanFeatures.map((el, index) => (
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
            Seleccionar plan
          </button>
        </div>

        {/* Business Plan */}
        <div className="hover:border-primary transition hover:border-2 border border-secondary cursor-pointer flex flex-col  bg-white py-10 px-6 rounded-md  w-full justify-between max-w-[500px] 2xl:w-[22rem]">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Empresarial</h2>
            <span className="text-secondary">50 informes completos/mes</span>
          </div>
          <span className="text-5xl font-semibold">290,90€/mes</span>
          <div className="flex flex-col gap-3">
            {businessPlanFeatures.map((el, index) => (
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
            Seleccionar plan
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Planes;
