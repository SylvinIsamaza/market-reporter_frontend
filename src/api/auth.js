import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import client from "./client"
export const register = async (signupData) => {

  
  try {
    let response;
    if(!signupData.secret){
     response = client.post("/auth/register", signupData,{withCredentials:true})

    }
    else{

      response = client.post(`/auth/register/${signupData.secret}`, signupData,{withCredentials:true})
    }
    toast.promise(
      response,
      {

      pending: "Registering user",
        success: "Check your email for OTP",
        error: (error) => {
        toast.error(error.response.data.message)
      }
      }).then(() => {
      return response.data
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


export const verifyOTP = async (data) => {
  console.log(data)
  try {
    if (data.next == "change-password") {
      const response = await client.post("/auth/verify-reset-otp",data ,{ withCredentials: true })
      return response.data.message 
    } else {
      const response = await client.post("/auth/verify-otp",data ,{ withCredentials: true })
      return response.data.message
    } 
  } catch (error) {
    
    throw error
  }
}
export const verifyResetOTP = async (data) => {
  console.log(data)
  try {
    const response = await client.post("/auth/verify-reset-otp",data ,{ withCredentials: true })
    return response.data.message 
  } catch (error) {
    
    throw new Error(error.response.data.message)
  }
}


export const sendResetCode = async (data) => {
  try {
    const response = await client.post("/auth/reset-password-code",data,{withCredentials:true})
    return response.data
  } catch (error) {
    
    throw error
  }
}

export const resetPassword = async (data) => {
  try {
    const response = await client.post("/auth/set-new-password",data,{withCredentials:true})
    return response.data
  } catch (error) {
    
    throw error
  }
}


export const changePassword=async (data)=>{
  try {
    const response = await client.put("/auth/change-password",data,{withCredentials:true})
    return response.data
  } catch (error) {
    
    throw error
  }
}


export const updateProfile = async (data) => {
  try {
    const response = await client.put("/auth/update-profile", data, {
      withCredentials: true,
      
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    
    throw error
  }
}