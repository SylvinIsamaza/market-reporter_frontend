import React from "react";
import PdfViewer from "@/components/PdfViewer"


const TestPdfView = () => {
  const pdfUrl = "http://localhost:5000/output/report_1732056194668.pdf";

  return (
    <div>
      <h1>PDF Viewer</h1>
      <PdfViewer fileUrl={pdfUrl} />
    </div>
  );
};

export default TestPdfView;
