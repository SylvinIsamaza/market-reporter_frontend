import { Link } from "react-router-dom";
import BusinessMan from "../assets/images/business-man.jpg";
import { TiThMenu } from "react-icons/ti";

function Header({showSidebar,setShowSidebar}) {
  return (
    <div className="flex w-full justify-between items-center px-8 py-4 bg-white">
      <span className="text-2xl font-semibold" onClick={()=>{setShowSidebar(!showSidebar)}}>
        <TiThMenu className="lg:hidden block" />
        
    </span>
    <Link to={"/settings"} className="flex cursor-pointer items-center gap-3">
      <div className="h-[3rem] w-[3rem] rounded-full overflow-hidden">
        <img
          src={BusinessMan}
          alt="User"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="md:flex hidden  flex-col gap-1">
        <span className="text-sm font-bold">John Doe</span>
        <span className="text-xs">johndoe2@gmail.com</span>
      </div>
    </Link>
    </div>
  )
}

export default Header