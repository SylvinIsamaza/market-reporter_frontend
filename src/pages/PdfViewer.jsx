import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "@/components/UserDashboard/Sidebar";
import Header from "@/components/Header";

function PdfViewer() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const pdfUrl = queryParams.get("url");
  const navigate = useNavigate();
  return (
    <div className="h-[calc(100vh -100px)] w-full flex justify-center pt-[100px]">


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
