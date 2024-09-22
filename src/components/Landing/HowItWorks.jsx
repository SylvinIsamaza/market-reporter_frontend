import { FaPlay } from "react-icons/fa6";
import Video from "../../assets/videos/intro.mp4";

const HowItWorks = () => {
  return (
    <div className="w-full flex flex-col items-center gap-14 py-14">
      <span className="text-3xl text-center font-semibold">
        ¿Cómo funciona?
      </span>
      <div className="flex items-center justify-center relative min-[900px]:w-[65%] w-full h-[40rem] overflow-hidden rounded-lg cursor-pointer">
        <video
          src={Video}
          className="h-full w-full"
          controls="controls"
        />
        <FaPlay size={48} className="absolute" fill="white" />
      </div>
    </div>
  );
};

export default HowItWorks;
