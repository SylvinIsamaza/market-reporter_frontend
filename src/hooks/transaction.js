const { useQuery } = require("@tanstack/react-query");
const { default: client } = require("api/client");
const { fetchTransaction } = require("api/transaction");





// us

export const useFetchTransaction=()=>{
  return(
    useQuery({
      queryKey:["Transactions"],
      queryFn:fetchTransaction
    })
  )
}


