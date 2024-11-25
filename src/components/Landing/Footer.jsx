import Facebook from "../../assets/icons/facebook.png";
import Youtube from "../../assets/icons/youtube.png";
import Instagram from "../../assets/icons/instagram.png";
import Telegram from "../../assets/icons/telegram.png";
import Twitter from "../../assets/icons/twitter.png";

const Footer = () => {
  return (
    <div className="py-8 flex flex-col gap-8 justify-between items-center">
      <div className="flex  w-full justify-center">
        <div className="flex flex-wrap justify-center items-center gap-6">
          <img src={Youtube} className="h-[3rem] cursor-pointer" />
          <img src={Instagram} className="h-[3rem] cursor-pointer" />
          <img src={Telegram} className="h-[3rem] cursor-pointer" />
          <img src={Facebook} className="h-[3rem] cursor-pointer" />
          <img src={Twitter} className="h-[3rem] cursor-pointer" />
        </div>
      </div>
      <div className="md:flex-row flex flex-col   items-center gap-4 text-secondary">
        <span>Términos y condiciones</span>
        <span>Aviso legal</span>
        <span>Política de cookies</span>
        <span>Contactos</span>
      </div>
    </div>
  );
};

export default Footer;
