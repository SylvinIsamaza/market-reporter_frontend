import client from "./client"

export const fetchTransaction = async () => {
    try {
      const response = await client.get("/transaction/me", {
        withCredentials: true,
      });
      const fetchedPayments = response.data.map((transaction) => {
        return {
          id: transaction.paymentIntentId,
          plan: transaction.plan,
          date: new Date(transaction.createdAt).toLocaleDateString(),
          amount: transaction.amount,
          status: transaction.paymentStatus,
        };
      });
      return fetchedPayments;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  