import React, { useState } from "react";
import Sidebar from "@/components/UserDashboard/Sidebar";
import Header from "@/components/Header";

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


        <div className="mx-auto w-full flex flex-col h-[calc(100vh-200px)] mt-8 px-[10px] md:px-[40px]">
          <div className="sm:flex sm:items-center  sm:justify-between flex-col sm:flex-row">
            <p className="flex-1 text-base font-bold text-gray-900">
              Latest Payments
            </p>

            <div className="mt-4 sm:mt-0">
              <div className="flex items-center justify-start sm:justify-end">
                <div className="flex items-center">
                  <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900">
                    Sort by:
                  </label>
                  <select
                    onChange={handleSort}
                    value={sortBy}
                    className="sm:mr-4 py-[10px] block w-full rounded-lg border p-1 text-base outline-none focus:shadow sm:text-sm"
                  >
                    <option value="Recent">Recent</option>
                    <option value="Plan">Plan</option>
                    <option value="Amount">Amount</option>
                    <option value="Status">Status</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                  onClick={() => exportToCSV(payments)}
                >
                  <svg
                    className="mr-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export to CSV
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white flex-1 max-h-fit overflow-hidden rounded-xl border shadow">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Invoice
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Date
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Amount
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Status
                  </td>
                </tr>
              </thead>
              <tbody className="lg:border-gray-300">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                      {payment.plan}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      {payment.date}
                    </td>
                    <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 lg:text-left">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <div
                        className={`inline-flex items-center rounded-full ${
                          payment.status === "succeeded"
                            ? "bg-blue-600"
                            : payment.status === "canceled"
                            ? "bg-red-200"
                            : payment.status === "requires_payment_method"
                            ? "bg-gray-200"
                            : "bg-blue-200"
                        } py-2 px-3 text-xs text-white`}
                      >
                        {payment.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
