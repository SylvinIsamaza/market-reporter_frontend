export const exportToCSV = (data, filename = "payments.csv") => {
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