import { LuLineChart } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { HiDocument } from "react-icons/hi2";
import { CiGrid41 } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useLogout } from "../../hooks/auth";
import { Link } from "react-router-dom";
const userRoutes = [
  {
    route: "Panel de control",
    icon: <GoHomeFill size={24} />,
    path:"/user-dashboard"
  },
  {
    route: "Informes",
    icon: <HiDocument size={24} />,
    path:"/report"
  },
  {
    route: "Créditos",
    icon: <CiGrid41 size={24} />,
    path:"/credits"
  },
  {
    route: "Transacciones",
    icon: <GrTransaction size={24} />,
    path:"/transactions"
  },
];
const Sidebar = ({showSidebar}) => {
  const { mutate: logout, isPending } = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    <div className={`fixed ${showSidebar?"block":"hidden"} z-[300]  h-full lg:w-[22rem] w-[50%] min-w-[300px] lg:flex  flex-col justify-between py-12 px-4 bg-primary text-white`}>
      <div className="flex flex-col gap-[5rem]">
        <div className="flex items-center gap-2 px-4">
          <LuLineChart size={25} />
          <span className="text-xl">Estatio</span>
        </div>
        <div className="flex flex-col gap-6">
          {userRoutes.map((el, index) => (
            <Link to={el.path}  
              key={index}
              className="flex items-center gap-5 py-4 px-5 rounded-full hover:bg-white hover:text-primary hover:font-semibold cursor-pointer transition"
            >
              {el.icon}
              <span>{el.route}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link to={"/settings"} className="flex items-center gap-5 py-4 px-5 rounded-full hover:bg-white hover:text-primary cursor-pointer hover:font-semibold transition">
          <IoSettingsOutline size={24} />
          <span>Configuración</span>
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-5 py-4 px-5 rounded-full hover:bg-white hover:text-primary cursor-pointer hover:font-semibold transition">
          <MdLogout size={24} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
