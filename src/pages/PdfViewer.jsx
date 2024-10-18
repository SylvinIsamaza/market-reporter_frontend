import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDownload } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from '../components/UserDashboard/Sidebar';
import Header from '../components/Header';



function PdfViewer() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const pdfUrl = queryParams.get('url');
  const navigate = useNavigate()
  return (
    <div className="h-screen w-full flex">
      <Sidebar/>
      <div className=' ml-[22rem] h-full overflow-scroll flex flex-col flex-grow bg-slate-100 flex-1  gap-[20px]'>
        <Header/>
      {/* <div className='flex justify-between'>
        <button className='flex w-fit gap-[5px] items-center rounded-full px-[10px] py-[5px] text-white bg-primary' onClick={()=>{navigate(-1)}}>
        <IoChevronBackOutline />

      Back
        </button>
        
        
      </div> */}
 
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}`}
          width="100%"
          className='h-[calc(100vh-100px)]'
          style={{ border: 'none' }}
          title="PDF Viewer"
        >
          This browser does not support PDFs. Please download the PDF to view it: <a href={pdfUrl}>Download PDF</a>.
        </iframe>
      ) : (
        <p>No PDF URL provided.</p>
      )}
    </div>
    </div>
  
  );
}

export default PdfViewer;
