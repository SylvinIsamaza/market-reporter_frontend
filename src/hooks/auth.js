import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { authenticate, login, logout, register, verifyOTP } from "../api/auth"
import { useNavigate } from "react-router-dom"
export const useSignup =() => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
 return useMutation({
    mutationKey:["signup"],
    mutationFn:register,
   onSuccess: () => {
      navigate("/verify-otp")
    },
    onError: (error) => {
     
    }
    
  })
  
}

export const useLogin =() => {
  
 return useMutation({
    mutationKey:["login"],
    mutationFn:login,
    onError: (error) => {
     toast.error(error.message)
    }
    
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
      toast.error(error.message)
     }
     
   })
   
 }

export const useAuth = () => {
 return useQuery({
    queryKey:["authenticate"],
    queryFn: authenticate,
   retry: 1,
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