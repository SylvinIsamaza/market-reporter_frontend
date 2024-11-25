import client from "./client";

export const fetchTransaction = async () => {
  try {
    const response = await client.get("/transactions/me", {
      withCredentials: true,
    });
    const fetchedPayments = response.data
    return fetchedPayments;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
