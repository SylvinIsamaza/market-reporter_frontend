import toast from "react-hot-toast"
import client from "./client"
export const addReport = async (propertyData) => {

  
  try {
    const response = client.post("/report", propertyData,{withCredentials:true})
    toast.promise(
      response,
      {

      loading: "Generating  pdf",
      success: "Successfully generated",
       
      error: (error) => {
       return error.response.data.message||"Error generating report"
      }
      })
    
    return (await response).data
    
  } catch (error) {
    throw error
  
  }
}