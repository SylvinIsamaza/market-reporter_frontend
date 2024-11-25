import { useMutation, useQuery } from "@tanstack/react-query"
import {initVisitor,fetchAdminDashboardInfo, fetchUserDashboardInfo } from "../api/analytic"


export const useGetAdminDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'], 
    queryFn: () => fetchAdminDashboardInfo(), 
    retry: 1
  });
};

export const useFetchUserDashboardData = () => {
  return(
    useQuery({
      queryKey:["dashboard-info"],
      queryFn: fetchUserDashboardInfo,
    })
  )
}



export const useInitVisitor=()=>{
  return(
    useMutation({
      mutationKey:["init-visitor"],
      mutationFn: initVisitor,
     
    })
  )
}

