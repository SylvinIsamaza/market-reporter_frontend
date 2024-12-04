
import { Edit2Icon, Edit3Icon } from "lucide-react";
import ChangePassword from "./components/ChangePassword";
import General from "./components/General";
import { useLocation, useNavigate } from "react-router-dom";


const ProfileOverview = () => {
  // isAdmin is used to check if in url include admin
  const isAdmin = useLocation().pathname.includes("admin");
  const navigate=useNavigate()
  return (

    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full pt-[40px] px-[10px] justify-end">
          <a href={`${isAdmin?"/admin":"/user"}/profile/edit`} className="bg-primary flex items-center justify-center gap-[8px] px-[30px] rounded-[10px] py-[15px] text-white dark:bg-navy-600">
           <Edit3Icon/> Edit Profile
        </a>
        </div>
      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        
          
     
        <div className="col-span-12 lg:col-span-12 lg:mb-0 3xl:col-span-12">
          <General />
          
        </div>
      

    
      </div>
    </div>
  );
};

export default ProfileOverview;
