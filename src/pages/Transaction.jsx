import React, { useState } from "react";

import TransactionTable from "@/components/table/TransactionTable";

const Transaction = () => {
  // Payment data
  const paymentData = [
    {
      id: 1,
      plan: "Standard Plan - Feb 2022",
      date: "07 February 2022",
      amount: 59.0,
      status: "Complete",
    },
    {
      id: 2,
      plan: "Standard Plan - Jan 2022",
      date: "09 January 2022",
      amount: 59.0,
      status: "Canceled",
    },
    {
      id: 3,
      plan: "Basic Plan - Dec 2021",
      date: "15 December 2021",
      amount: 29.0,
      status: "Complete",
    },
    {
      id: 4,
      plan: "Basic Plan - Nov 2021",
      date: "14 November 2021",
      amount: 29.0,
      status: "Pending",
    },
    {
      id: 5,
      plan: "Basic Plan - Oct 2021",
      date: "15 October 2021",
      amount: 29.0,
      status: "Complete",
    },
  ];

  const [payments, setPayments] = useState(paymentData);
  const [sortBy, setSortBy] = useState("Recent");

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sortedPayments = [...payments].sort((a, b) => {
      if (value === "Recent") {
        return new Date(b.date) - new Date(a.date);
      } else if (value === "Plan") {
        return a.plan.localeCompare(b.plan);
      } else if (value === "Amount") {
        return b.amount - a.amount;
      } else if (value === "Status") {
        const statusOrder = { Complete: 1, Pending: 2, Canceled: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

    setPayments(sortedPayments);
  };

  const exportToCSV = (data, filename = "payments.csv") => {
    const csvRows = [];
    const headers = ["Invoice", "Date", "Amount", "Status"];
    csvRows.push(headers.join(","));

    data.forEach((payment) => {
      const row = [
        payment.plan,
        payment.date,
        `$${payment.amount.toFixed(2)}`,
        payment.status,
      ];
      csvRows.push(row.join(","));
    });
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const tempLink = document.createElement("a");
    tempLink.href = window.URL.createObjectURL(csvData);
    tempLink.setAttribute("download", filename);
    tempLink.click();
  };

  return (
    <div className="h-[calc(100vh-120px)] w-full flex">
      <div className=" mx-[0] h-full flex flex-col flex-grow bg-slate-100">


  <TransactionTable transactions={payments}/>
      </div>
    </div>
  );
};

export default Transaction;
