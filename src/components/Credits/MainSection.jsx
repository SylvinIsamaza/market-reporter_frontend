import { useState, useEffect } from "react";
import { HiDocument } from "react-icons/hi2";
import { MdAccountBalanceWallet, MdPending } from "react-icons/md";

import Header from "../Header";

const renovationOptions = [
  "Total renovation apparently with no structural damage",
  "Partial renovation apparently with no structural damage",
  "Cosmetic renovation apparently with no structural damage",
  "Apparently no renovation needed",
  "Condition unknown",
];

const MainSection = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('Recent');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await client.get("/transaction/me", {
          withCredentials: true,
        });
        const fetchedPayments = response.data.slice(-5).map((transaction) => {
          return {
            id: transaction.paymentIntentId,
            plan: transaction.plan,
            date: new Date(transaction.createdAt).toLocaleDateString(),
            amount: transaction.amount,
            status: transaction.paymentStatus,
          };
        });
        setTransactions(fetchedPayments);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sortedPayments = [...transactions].sort((a, b) => {
      if (value === 'Recent') {
        return new Date(b.date) - new Date(a.date); 
      } else if (value === 'Plan') {
        return a.plan.localeCompare(b.plan); 
      } else if (value === 'Amount') {
        return b.amount - a.amount; 
      } else if (value === 'Status') {
        const statusOrder = { 'Complete': 1, 'Pending': 2, 'Canceled': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

    setTransactions(sortedPayments);
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

  const dashboardData = [
    {
      icon: <HiDocument size={23} />,
      name: "Total Credits used ",
      number: 110,
    },
    {
      icon: <MdAccountBalanceWallet size={23} />,
      name: "Remaining Credits",
      number: 24,
    },
  ];

  return (
    <div className="lg:ml-[22rem] h-full overflow-scroll flex  flex-col flex-grow bg-slate-100">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex md:flex-row flex-col flex-wrap gap-[10px] justify-between p-8 w-full">
        {dashboardData.map((el, index) => (
          <div
            key={index}
            className="h-[12rem] lg:w-[48%] w-full gap-8 px-4 py-5 flex bg-white border rounded-md cursor-pointer"
          >
            <div className="h-[4rem] w-[4rem] flex items-center justify-center rounded-md text-white bg-primary">
              {el.icon}
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <span className="text-[gray] text-lg">{el.name}</span>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold">{el.number}</span>
                <span>
                  <span className="text-[green] font-bold">+24</span> in the
                  last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto w-full mt-8 px-[10px] md:px-[40px]">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">
            Credit transactions
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
                  <option value="Plan">Invoice</option>
                  <option value="Amount">Amount</option>
                  <option value="Status">Status</option>
                </select>
              </div>

              <button
                type="button"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                onClick={() => exportToCSV(transactions)}
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

        <div className="mt-6 bg-white overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="border-b lg:table-header-group">
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
              {transactions.map((payment) => (
                <tr key={payment.id}>
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    {payment.plan}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {payment.date}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 lg:text-left px-[40px]">
                    {payment.amount}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-sm font-medium sm:px-6">
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
