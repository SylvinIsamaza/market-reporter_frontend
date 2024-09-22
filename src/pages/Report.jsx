import Sidebar from "../components/UserDashboard/Sidebar";
import MainSection from "../components/Report/MainSection";
import { useState } from "react";

const Report = () => {
  const[showSidebar,setShowSidebar]=useState(false)
    return (
    <div className="h-screen w-full flex">
        <Sidebar showSidebar={showSidebar} /> 
      
        <MainSection showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default Report;
