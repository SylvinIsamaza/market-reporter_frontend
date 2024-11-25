import { useState } from "react";
import { LuLineChart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5"; // Import close icon

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const navLinks = ["Inicio", "Planes", "Preguntas Frecuentes"];

  return (
    <header className="flex h-[5rem] w-full justify-between py-2 min-[900px]:px-4">
      {/* Desktop logo */}
      <Link to={"/"} className="hidden lg:flex items-center gap-2">
        <LuLineChart size={25} />
        <span className="text-xl font-semibold">Realtio</span>
      </Link>

      {/* Desktop navigation */}
      <nav className="hidden items-center lg:flex">
        <ul className="flex gap-5 lg:gap-16">
          {navLinks.map((link, index) => (
            <li
              className="cursor-pointer text-sm font-semibold transition hover:text-primary"
              key={index}
            >
              {link}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop buttons */}
      <div className="hidden lg:flex items-center gap-5">
        <button
          onClick={() => navigate("/signup")}
          className="text-sm outline-none hover:text-primary transition font-semibold px-8 h-[3rem] rounded-full"
        >
          Regístrate
        </button>
        <button
          onClick={() => navigate("/login")}
          className="text-sm outline-none font-semibold px-8 h-[3rem] rounded-full bg-primary text-white"
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Mobile logo and menu toggle */}
      <div className="lg:hidden flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <LuLineChart size={25} />
          <span className="text-xl font-semibold">Realtio</span>
        </div>
        <button onClick={toggleMobileMenu} className="outline-none">
          {isMobileMenuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
        </button>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <nav className="absolute top-[5rem] left-0 w-full bg-white shadow-lg z-10">
          <ul className="flex flex-col gap-5 py-4 px-8">
            {navLinks.map((link, index) => (
              <li
                className="cursor-pointer text-sm text-center font-semibold transition hover:text-primary"
                key={index}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu when a link is clicked
              >
                {link}
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="w-full text-sm outline-none hover:text-primary transition font-semibold py-2 px-4 rounded-md"
              >
                Regístrate
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full text-sm outline-none font-semibold py-2 px-4 rounded-md bg-primary text-white"
              >
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
