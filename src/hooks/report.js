import { useMutation, useQuery } from "@tanstack/react-query"
import { addReport,fetchReports, getReportById } from "../api/report"

import { useNavigate } from "react-router-dom"
export const useCreateReport = () => {
  const navigate=useNavigate()
 return useMutation({
    mutationKey:["generateReport"],
   mutationFn: addReport,
   onSuccess: (data) => {
    
     navigate(`/view-pdf/?url=http://localhost:5000${data.reportUrl }`)
   },
    
  })
  
}


export const useGetReports = () => {
  return useQuery(
    {
      queryKey: ["getReports"],
      queryFn:fetchReports,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
    
  
  )
}

export const useGetReportById = (id) => {
  return useQuery({
    queryKey: ["getReportById", id], 
    queryFn: () => getReportById(id),
  }
  
  
  );
};
