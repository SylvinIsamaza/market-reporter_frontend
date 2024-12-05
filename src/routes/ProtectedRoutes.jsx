import React, { useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useAuth();

  useEffect(() => {
    if (isError) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); 
      navigate('/login');
    }

  }, [isError, error, navigate]);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    
    navigate('/login');
    console.log("returned")
    return null;
  }

 

  return <>{data&&children}</>;
}

export default ProtectedRoutes;
