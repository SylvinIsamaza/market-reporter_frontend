export function formatDateShort(dateInput) {
  const date = new Date(dateInput);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()]; 
  const day = date.getDate(); 

  return `${month} ${day}`; 
}
export const getOSColor = (os) => {
  const osColors = {
    windows: "#4318FF",
    "mac os": "#6AD2FF",
    linux: "#B0A8B9",
    android: "#FF6F91",
    ios: "#FF9671",
    "chrome os": "#FFC75F",
    "blackBerry oS": "#D65DB1",
    "windows phone": "#845EC2",
    unknown: "#EFF4FB",
    // 
  }
  return osColors[os]
}

export const sortObjectByByValues = (obj) => {
 return Object.fromEntries(
    Object.entries(obj).sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA)
  )
  
};

export const returnPercentage = (value,total)=>{
  return (value/total)*100
}

export const generateTransactionKeys = (array1, array2) => {
  
  return Array.from(new Set([...array1, ...array2]));
};



export function getReadablePlanName(planName) {
  const planMap = {
    basic: "Basic",
    saving: "Saving",
    business: "Business",
    profession: "Professional",
       
  };

  return planMap[planName] || "Unknown Plan";
}

export function formatDateToCustomString(date) {
  date=new Date(date)
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  
  return `${day},${month},${year}`;
}

