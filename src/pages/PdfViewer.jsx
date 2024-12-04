import React from "react";
import { useParams } from "react-router-dom";
import { useGetReportById } from "@/hooks/report";

function PdfViewer() {
  const { url } = useParams();
  const { data: report, isLoading, error } = useGetReportById(url);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(error)

  const pdfUrl = `http://localhost:5000${report.reportUrl}`;

  return (
    <div className="h-[calc(100vh -100px)] w-full flex justify-center pt-[30px]">
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}`}
          width="100%"
          className="h-[calc(100vh-100px)]"
          style={{ border: "none" }}
          title="PDF Viewer"
        >
          This browser does not support PDFs. Please download the PDF to view
          it: <a href={pdfUrl}>Download PDF</a>.
        </iframe>
      ) : (
        <p>No PDF URL provided.</p>
      )}
    </div>
  );
}

export default PdfViewer;
