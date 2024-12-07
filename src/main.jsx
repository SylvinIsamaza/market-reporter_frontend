import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast"
import { store } from "./redux/store"; 
import App from './App.jsx'
import './index.css'
import pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = "https://d2v5g.csb.app/pdf.worker.js";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <App />
        <Toaster/>
    </Provider>
    </QueryClientProvider>
  // </StrictMode>
);
