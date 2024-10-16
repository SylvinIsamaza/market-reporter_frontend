import { FaFilePdf } from "react-icons/fa";
import { TbDownload } from "react-icons/tb";

const Report = () => {
  return (
    <div className="flex w-full items-center justify-center bg-white  relative h-[15rem]  md:w-[15rem] rounded-md">
      <div className="absolute h-full w-full flex flex-col justify-between p-4">
        <div className="flex justify-end">
          <span className="text-xs font-semibold">23/8/2024</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Informe</span>
          <TbDownload color="green" size={20} cursor={"pointer"} />
        </div>
      </div>
      <FaFilePdf size={80} fill="red" />
    </div>
  );
};

export default Report;
