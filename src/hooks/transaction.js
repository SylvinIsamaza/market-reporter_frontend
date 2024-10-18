export const useFetchTtransaction=  useEffect(() => {
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
      setTransactions(fetchTransactions);
      setPayments(fetchedPayments);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  fetchTransactions();
}, []);