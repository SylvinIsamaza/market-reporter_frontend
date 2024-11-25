import Sidebar from "@/components/UserDashboard/Sidebar";
import MainSection from "@/components/Report/MainSection";
import { useState } from "react";

const Report = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className=" h-[calc(100vh-100px)] overflow-hidden w-full flex">
      

      <MainSection showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default Report;
