import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import client from "./client"
export const register = async (signupData) => {

  
  try {
    const response = client.post("/auth/register", signupData,{withCredentials:true})
    toast.promise(
      response,
      {

      pending: "Registering user",
        success: "Check your email for OTP",
        error: (error) => {
        toast.error(error.response.data.message)
      }
      }).then(() => {
      console.log(response)
    })
    
    
  } catch (error) {
    throw error
  
  }
}
export const login = async (signupData) => {

  
  try {
    const response = client.post("/auth/login", signupData,{withCredentials:true})
    toast.promise(
      response,
      {
      pending: "Logging in",
        success: "Successfully logged in ",
      }).then(() => {
        
    })
    
    
  } catch (error) {
    
  throw error
  }
}

export const authenticate = async () => {
  try {
    const response = await client.get("/auth", { withCredentials: true })
    console.log(response)
    return response.data.user
  } catch (error) {
    
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await client.post("/auth/logout", { withCredentials: true })
    return response.data.message
  } catch (error) {
    
    throw error
  }
}


export const verifyOTP = async (otp) => {
  try {
    const response = await client.post("/auth/verify-otp",{otp} ,{ withCredentials: true })
    return response.data.message 
  } catch (error) {
    
    throw error
  }
}