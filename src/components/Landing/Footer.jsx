import Facebook from "../../assets/icons/facebook.png";
import Youtube from "../../assets/icons/youtube.png";
import Instagram from "../../assets/icons/instagram.png";
import Telegram from "../../assets/icons/telegram.png";
import Twitter from "../../assets/icons/twitter.png";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <div className="py-8 flex flex-col gap-8 justify-between items-center">
      <div className="flex  w-full justify-center">
        <div className="flex flex-wrap justify-center items-center gap-6">
          <Link  className="hover:scale-[1.03]" to={"https://www.youtube.com/c/Inmoemprende"} >
          <img src={Youtube} className="h-[3rem] cursor-pointer" />
          </Link>
          <Link className="hover:scale-[1.03]" to={"https://www.instagram.com/inmoemprende_oficial/"}>
          <img src={Instagram} className="h-[3rem] cursor-pointer" />
          </Link>
          <Link className="hover:scale-[1.03]" to={"https://t.me/inmoemprende"}>
          <img src={Telegram} className="h-[3rem] cursor-pointer" />
          </Link>
          <Link className="hover:scale-[1.03]" to={"https://www.facebook.com/inmoemprende"}>
          <img src={Facebook} className="h-[3rem] cursor-pointer" />
          </Link>
          <Link className="hover:scale-[1.03]" to={"https://twitter.com/inmoemprende"}>
          <img src={Twitter} className="h-[3rem] cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="md:flex-row flex flex-col   items-center gap-4 text-secondary">
        <Link className="hover:scale-[1.03]" to={"/terms"}>Términos y condiciones</Link>
        <Link className="hover:scale-[1.03]" to={"/legal-notice"}>Aviso legal</Link>
        <Link className="hover:scale-[1.03]" to={"/cookie-policy"}>Política de cookies</Link>
        <Link className="hover:scale-[1.03]" to={"/contact"}>Contacto</Link>

      </div>
    </div>
  );
};

export default Footer;
