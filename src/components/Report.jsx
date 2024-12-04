import { FaFilePdf } from "react-icons/fa";
import { TbDownload } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Report = ({ report: report }) => {
  const isAdmin=useLocation().pathname.includes("admin")
  return (
    <Link to={`${isAdmin?"/admin":"/user"}/report/${report._id}`} className="flex  w-full items-center justify-center bg-white  dark:bg-navy-700 dark:text-white relative h-[15rem]   min-w-[200px] max-w-[300px] flex-1 rounded-md">
      <div className="absolute h-full w-full flex flex-col justify-between p-4">
        <div className="flex justify-end">
          <span className="text-xs font-semibold">{report.createdAt&&report.createdAt.split("T")[0]}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">{report.uniquIdentifier?report.uniquIdentifier.split("-")[0]:"informe"}</span>
          <TbDownload className="dark:text-green-600" color="green" size={20} cursor={"pointer"} />
        </div>
      </div>
      <FaFilePdf size={80}  className="text-red-600 dark:text-white" />
    </Link>
  );
};

export default Report;
