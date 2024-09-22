import { useNavigate } from "react-router-dom";
import LandingTopRight  from "../../assets/images/landing top right.gif";
import SloganIndicator from "../../assets/images/slogan-indicator.png"

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className=" min-[900px]:flex-row flex-col flex justify-between py-14">
      <div className=" w-full !min-[1000px]:w-[50%] py-4 flex flex-col gap-10 px-[30px]">
        <div className="py-2 px-5 bg-[#2a66b417] w-fit rounded-md cursor-pointer">
          <span className="font-semibold text-primary  text-sm">
            INMOEMPRENDEAI MENCIONANOS EN REDES
          </span>
        </div>
        <h2 className="min-[950px]:text-5xl min-[600px]:text-xl text-[32px] min-[950px]:leading-[4.3rem] leading-[50px] text-primary font-semibold">
          Tus Informes de mercado de una propiedad al instante, impulsado con AI
          entrenada.
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={SloganIndicator}
            className="object-cover h-[4rem] cursor-pointer"
          />
          <span className="text-lg font-semibold">
            Transformando datos en decisiones intelligentes
          </span>
        </div>
        <button
          onClick={() => navigate("/signup")}
          className="h-[3.3rem] w-[12rem] bg-primary text-white font-semibold rounded-full"
        >
          Empezar a generar
        </button>
      </div>
        <img src={LandingTopRight} className="object-cover h-full   min-[900px]:w-[45vw] w-full" />
    </div>
  );
};

export default Hero;
