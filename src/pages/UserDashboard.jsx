import Sidebar from "../components/UserDashboard/Sidebar";
import MainSection from "../components/UserDashboard/MainSection";
import { useState } from "react";

const UserDashboard = () => {
  const[showSidebar,setShowSidebar]=useState(false)
    return (
    <div className="h-screen w-full flex">
        <Sidebar showSidebar={showSidebar} /> 
      
        <MainSection showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </div>
  );
};

export default UserDashboard;
