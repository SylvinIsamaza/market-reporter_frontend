import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        setTotalPages(pdf.numPages);

        // Render the first page
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });

        // Set canvas size
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [fileUrl, pageNumber]);

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrevPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={pageNumber >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
