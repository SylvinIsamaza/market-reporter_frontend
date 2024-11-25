import toast from "react-hot-toast";
import client from "./client";

export const addReport = async (propertyData) => {
  const responsePromise = client.post("/report", propertyData, { withCredentials: true });

  toast.promise(responsePromise, {
    loading: "Generating PDF...",
    success: "Report generated successfully!",
    error: (error) => error.response?.data?.message || "Error generating report.",
  });

  return (await responsePromise).data;
};
export const fetchReports = async () => {
  try {
    const response = await client.get(`/report`, {
      withCredentials: true,
    });
    return response.data.reports || [];
    
  } catch (error) {
    console.error("Error fetching reports:", error);
    toast.error(error.response?.data?.message || 'Failed to fetch reports');
    
    throw new Error(error.response?.data?.message || 'Failed to fetch reports');
  }
};


