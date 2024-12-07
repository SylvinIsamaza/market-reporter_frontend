import React from 'react'
import { useAuth } from '../hooks/auth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminProtectedRoutes({ children }) {
  const navigate=useNavigate()
  const { data,isLoading, isError,error } = useAuth();
  if (isLoading) {
    return <div className='w-full h-screen bg-white'>Loading...</div>;
  }
  if (isError&&!isLoading) {  
    
    toast.error(error.response?.data?.message|"Something went wrong")
    navigate("/login")
    return;
    
  }
  if (!isLoading && (data ? data : {}).role !== "admin"&&!isError) {
    navigate("/user/dashboard")
  }

  return (
        <div>
      {children}
        </div>
          
        
      
      )
  
}

export default AdminProtectedRoutes