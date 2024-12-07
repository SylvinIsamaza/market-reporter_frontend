import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { authenticate, changePassword, login, logout, register, resetPassword, sendResetCode, updateProfile, verifyOTP } from "../api/auth"
import { useNavigate } from "react-router-dom"
export const useSignup =() => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
 return useMutation({
    mutationKey:["signup"],
    mutationFn:register,
   onSuccess: (data) => {
   
     toast.success("Successfully registered")
      navigate("/verify-otp?next=/select-plan")
    },
    onError: (error) => {
     toast.error(error.response.data.message)
    }
    
  })
  
}

export const useLogin =() => {
  const navigate=useNavigate()
 return useMutation({
    mutationKey:["login"],
    mutationFn:login,
    onError: (error) => {
     toast.error(error.message)
   },
   onSuccess: (data) => {
   toast.success("Login Successful")
    if (data.role == "common") {
      
      navigate("/user/dashboard");
    }
    else {
      navigate("/admin/dashboard")
    }
  },
    
  })
  
}

export const useVerifyOTP =() => {
  const navigate=useNavigate("")
  return useMutation({
     mutationKey:["verify-otp"],
    mutationFn: verifyOTP,
    onSuccess: () => {
      toast.success("OTP verified successfully")
      navigate("/select-plan")
     },
     onError: (error) => {
      toast.error(error.response.data.message)
     }
     
   })
   
 }

export const useAuth = () => {
 return useQuery({
    queryKey:["authenticate"],
    queryFn: authenticate,
   retry: 0,
   cacheTime: 1000 * 60 * 10,
   staleTime: 1000 * 60 * 5,  
    
  })
}

export const useLogout = () => {
  const navigate=useNavigate()
  return useMutation({
     mutationKey:["logout"],
    mutationFn: logout,
    onSuccess:()=> {
      toast.success("Successfully logged out")
      navigate("/login")
    },
    onError:(error)=> {
  toast.error(error.message)
    },
     retry:1
     
   })
}
 
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["change-password"],
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully")
    },
    onError: (error) => {
   
      toast.error(error.response.data.message)
    }
  })
}


export const useSendResetCode = () => {
  return useMutation({
    mutationKey: ["send-reset-code"],
    mutationFn: sendResetCode,
    onSuccess: () => {
      toast.success("Reset code sent successfully")
    },
    onError: (error) => {
     
      toast.error(error.response.data.message)
    }
  })
}

export const useResetPassword = () => {
  const navigate=useNavigate()
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully")
    },
    onError: (error) => {
    
      toast.error(error.response.data.message)
      navigate("/reset-password")

    }
  })
}

export const useSendResetPasswordCode = () => {
  return useMutation({
    mutationKey: ["send-reset-password-code"],
    mutationFn: sendResetCode,
    onSuccess: () => {
      toast.success("Reset code sent successfully")
    },
    onError: (error) => {
     
      toast.error(error.response.data.message)
    }
  })
}


export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully")
    },
    onError: (error) => {
      
      toast.error(error.response.data.message)
    }
  })
}