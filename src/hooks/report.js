import { useMutation } from "@tanstack/react-query"
import { addReport } from "../api/report"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
export const useCreateReport = () => {
  const navigate=useNavigate()
 return useMutation({
    mutationKey:["generateReport"],
   mutationFn: addReport,
   onSuccess: (data) => {
     console.log(data)
     navigate(`/view-pdf/?url=http://localhost:5000${data.reportUrl }`)
   },
    
  })
  
}
