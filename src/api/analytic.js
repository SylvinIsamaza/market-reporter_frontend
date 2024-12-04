import client from "./client"
import toast from "react-hot-toast";


export const fetchUserDashboardInfo = async () => {
    try {
      const response = await client.get("/dashboard", {
        withCredentials: true,
      });
      const dashboardData=response.data;
     
      return dashboardData
    } catch (error) {
      toast.error(error.message)
      console.error("Error fetching transactions:", error);
      throw new Error(error.message)
    }
  };
export const initVisitor = async () => {
  try {
    const response = await client.get("/init", {
      withCredentials: true,
     });
   return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return null;

  }
   
  
}
  


export const fetchAdminDashboardInfo = async () => {
  try {
    const response = await client.get(`/dashboard/admin?period`, { withCredentials: true });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
