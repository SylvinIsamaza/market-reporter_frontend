import React, { useState } from "react";

import TransactionTable from "@/components/table/TransactionTable";
import { useFetchTransaction } from "@/hooks/transaction";

const Transaction = () => {
  const { data: paymentData, error, isLoading } = useFetchTransaction();

 

  if (isLoading) {
    return (<div>Loading....</div>)
    
  }
  

  return (
    <div className="h-[calc(100vh-120px)] w-full flex">
      <div className=" mx-[0] h-full flex flex-col flex-grow bg-slate-100">
        <TransactionTable loading={isLoading} error={error} transactions={paymentData} hidePagination={false} />
      </div>
    </div>
  );
};

export default Transaction;
