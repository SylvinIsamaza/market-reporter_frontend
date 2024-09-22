import React from 'react'
import { useAuth } from '../hooks/auth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const navigate=useNavigate()
  const { data,isLoading, isError,error } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {  
    console.log(error)
    toast.error(error.response?.data?.message|"Something went wrong")
    navigate("/login")
    return;
    
  }


  return (
    <div>
  {children}
    </div>
      
    
  
  )
}

export default ProtectedRoutes