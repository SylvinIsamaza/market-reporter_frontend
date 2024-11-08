import {  useState } from "react";
const TransactionTable = ({title,error,transactions}) => {
  const [transactionsCsv, setTransactionsCsv] = useState([]);

  const [sortBy, setSortBy] = useState("Recent");
  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sortedPayments = [...transactionsCsv].sort((a, b) => {
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

    setTransactionsCsv(sortedPayments);
  };

  const exportToCSV = (data, filename = "payments.csv") => {
    const csvRows = [];
    const headers = ["Plan", "Date", "Amount", "Status"];
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
      <div className="mx-auto text-white w-full mt-8 ">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900 dark:text-white">
            {title}
          </p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <label className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900 dark:text-white">
                  Sort by:
                </label>
                <select
                  onChange={handleSort}
                  value={sortBy}
                  className="sm:mr-4 dark:bg-navy-700  bg-gray-300 text-gray-900 dark:border-none dark:text-white px-[20px] py-[10px] block w-full rounded-lg border p-1 text-base outline-none focus:shadow sm:text-sm"
                >
                  <option value="Recent">Recent</option>
                  <option value="Plan">Plan</option>
                  <option value="Amount">Amount</option>
                  <option value="Status">Status</option>
                </select>
              </div>

              <button
                type="button"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white dark:bg-navy-700 dark:border-none dark:text-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                onClick={() => exportToCSV(transactionsCsv)}
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

        <div className="mt-6 bg-white dark:bg-navy-700 overflow-hidden rounded-xl border dark:border-none shadow">
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
            {!error&&
              transactions&&transactions.length>0?
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 dark:text-white sm:px-6">
                    {transaction.id}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {transaction.date}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 lg:text-left">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div
                      className={`inline-flex items-center rounded-full ${
                        transaction.status === "Complete"
                          ? "bg-blue-600"
                          : transaction.status === "Canceled"
                          ? "bg-red-400"
                          : "bg-blue-500"
                      } py-2 px-3 text-xs text-white`}
                    >
                      {transaction.status === "Complete"
                        ? "Completed"
                        : transaction.status === "Canceled"
                        ? "Canceled"
                        : "Pending"}
                    </div>
                  </td>
                </tr>
              ))
                
              
             :
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="dark:text-white text-navy-900 text-start
                   flex items-center justify-start h-[300px]">
                <p>No transaction history</p>
                  </td>
                  </tr>
            }
            {error&&<p>{error.message}</p>}
            </tbody>
          </table>
        </div>
      </div>

  );
};

export default TransactionTable;
