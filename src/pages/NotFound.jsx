import Header from "@/components/Landing/Header";
import Footer from "@/components/Landing/Footer";

import { useNavigate } from "react-router-dom"


function NotFound() {
  const navigate=useNavigate()
  const goHome=()=>{
    navigate("/")
  }
  return (
    <div className="px-[30px] lg:px-[100px]">
     

       <Header />
    
    <div className="flex items-center flex-col justify-center h-[calc(100vh-260px)] w-full">
      <img src="/not_found.svg" className="h-[200px] " />
      <p className="text-[20px] font-[500]">Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <button  onClick={goHome} className="mt-4 p-2 bg-primary flex gap-[20px] h-[50px] justify-center items-center dark:bg-navy-600 text-white rounded-md">
        Go Homepage
      </button>

      </div>
      <Footer/>
    </div>
  )
}

export default NotFound