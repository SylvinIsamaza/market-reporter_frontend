import React from "react";
import Profile from "@/pages/admin/profile";

import { MdHome, MdBarChart, MdPerson, MdReport } from "react-icons/md";
import PdfViewer from "@/pages/PdfViewer";
import ProtectedRoutes from "./ProtectedRoutes";
import UserDashboard from "@/pages/UserDashboard";
import CreditPage from "@/pages/Credits";
import Transaction from "@/pages/Transaction";
import Report from "@/pages/Report";
import { GrDocument } from "react-icons/gr";
import { FaFilePdf } from "react-icons/fa";

const routes = [
  {
    name: "Pdf Viewer",
    layout: "/user",
    path: "view-pdf",
    icon: <MdHome className="h-6 w-6" />,
    component: <PdfViewer />,
  },
  {
    name: "Dashboard",
    layout: "/user",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: (
     
        <UserDashboard />
     
    ),
  },

  {
    name: "Transactions",
    layout: "/user",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "transactions",
    component: (
     
        <Transaction />
     
    ),
  },
 
  {
    name: "Informe",
    layout: "/user",
    path: "report",
    icon: <FaFilePdf  />,
    component:<Report/>
  },
  {
    name: "Profile",
    layout: "/user",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  }
];
export default routes;
