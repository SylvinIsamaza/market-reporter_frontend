import { useQuery } from "@tanstack/react-query"
import { fetchTransaction } from "@/api/transaction"

export const useFetchTransaction=()=>{
  return(
    useQuery({
      queryKey:["Transactions"],
      queryFn:fetchTransaction
    })
  )
}


