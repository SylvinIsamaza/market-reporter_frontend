import { useState } from "react";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineFirstPage,
  MdOutlineLastPage,
} from "react-icons/md";

const TransactionTable = ({ title, error, transactions, hidePagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const itemsPerPage = 5;

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase();
    return (
      transaction.paymentIntentId.toLowerCase().includes(query) ||
      transaction.paymentType.toLowerCase().includes(query) ||
      transaction.currency.toLowerCase().includes(query) ||
      transaction.paymentStatus.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  return (
    <div className="mx-auto bg-white dark:bg-navy-700 p-[20px] rounded-xl border dark:border-none shadow text-white w-full mt-8 ">
      <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
        <p className="flex-1 pt-[10px] px-[20px] text-[28px] text-base font-bold text-gray-900 dark:text-white">
          {title}
        </p>
        <div className="mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-[300px] px-4 py-2 border dark:bg-navy-600 rounded-md"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden ">
        <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr>
              <td className="whitespace-normal py-4 text-sm text-gray-800 dark:text-white font-semibold sm:px-6">
                Invoice
              </td>
              <td className="whitespace-normal py-4 text-sm text-gray-800 dark:text-white font-semibold sm:px-6">
                Payment Type
              </td>
              <td className="whitespace-normal py-4 text-sm text-gray-800 dark:text-white font-semibold sm:px-6">
                Currency
              </td>
              <td className="whitespace-normal py-4 text-sm text-gray-800 dark:text-white font-semibold sm:px-6">
                Date
              </td>
              <td className="whitespace-normal py-4 text-sm text-gray-800 dark:text-white font-semibold sm:px-6">
                Amount
              </td>
              <td className="whitespace-normal py-4 text-sm text-gray-800 dark:text-white font-semibold sm:px-6">
                Status
              </td>
            </tr>
          </thead>
          <tbody className="lg:border-gray-300">
            {!error && currentTransactions && currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 dark:text-white sm:px-6">
                    {transaction.paymentIntentId}
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-700 sm:px-6">
                    {transaction.paymentType}
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-700 sm:px-6">
                    {transaction.currency}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-700 sm:px-6 lg:table-cell">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 lg:text-left">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-700 sm:px-6 lg:table-cell">
                    <div
                      className={`inline-flex w-[90px]  items-center justify-center  rounded-full ${
                        transaction.paymentStatus === "succeeded"
                          ? "bg-blue-600"
                          : transaction.paymentStatus === "canceled"
                          ? "bg-red-400"
                          : "bg-blue-500"
                      } py-2 px-3 text-xs text-white`}
                    >
                      {transaction.paymentStatus === "succeeded"
                        ? "Completed"
                        : transaction.paymentStatus === "canceled"
                        ? "Canceled"
                        : "Pending"}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No transactions found
                </td>
              </tr>
            )}
            {error && <p>{error.message}</p>}
          </tbody>
        </table>
      </div>

      {!hidePagination && totalPages > 1 && (
        <div className="mt-4 text-gray-900 dark:text-white flex px-[20px] flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span>Showing Page</span>
            <p>{currentPage}</p>
            <span>of {totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="w-[150px] text-center border dark:bg-navy-600 rounded-md px-2 py-1"
            />
          </div>
          <div className="flex dark:text-gray-900 items-center gap-[20px]">
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-4 border rounded-full bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === 1}
            >
              <MdOutlineFirstPage />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-4 border rounded-full bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === 1}
            >
              <MdNavigateBefore />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-4 border rounded-full bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === totalPages}
            >
              <MdNavigateNext />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-4 border rounded-full bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === totalPages}
            >
              <MdOutlineLastPage />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
