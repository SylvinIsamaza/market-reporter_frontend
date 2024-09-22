import AI from "../../assets/images/ai.png"
import Code from "../../assets/images/code.png"
import Computer from "../../assets/images/computer.png"
import Api from "../../assets/images/api.png"
import Blocks from "../../assets/images/blocks.png"
import Network from "../../assets/images/network.png"
import Database from "../../assets/images/database.png"

const TrustedPartners = () => {
  return (
    <div className="flex flex-wrap justify-center items-center md:px-16 px-[20px] lg:gap-28 gap-[10px]">
      <img src={AI} className="object-cover h-[3.5rem] mt-4 cursor-pointer" />
      <img src={Code} className="object-cover h-[3.5rem] mt-4 cursor-pointer" />
      <img
        src={Computer}
        className="object-cover h-[3.5rem] mt-4 cursor-pointer"
      />
      <img src={Api} className="object-cover h-[3.5rem] mt-4 cursor-pointer" />
      <img
        src={Blocks}
        className="object-cover h-[3.5rem] mt-4 cursor-pointer"
      />
      <img
        src={Network}
        className="object-cover h-[3.5rem] mt-4 cursor-pointer"
      />
      <img
        src={Database}
        className="object-cover h-[3.5rem] mt-4 cursor-pointer"
      />
    </div>
  );
};

export default TrustedPartners;
