import React from "react";
import Profile from "@/pages/admin/profile";

import { MdHome, MdBarChart, MdPerson, MdReport, MdPayment, MdPayments } from "react-icons/md";
import PdfViewer from "@/pages/PdfViewer";
import ProtectedRoutes from "./ProtectedRoutes";
import UserDashboard from "@/pages/UserDashboard";
import CreditPage from "@/pages/Credits";
import Transaction from "@/pages/Transaction";
import Report from "@/pages/Report";
import { GrDocument, GrMastercard } from "react-icons/gr";
import { FaFilePdf } from "react-icons/fa";
import NotFound from "@/pages/NotFound";
import EditProfile from "@/pages/admin/profile/components/EditProfile";
import Planes from "@/components/Landing/Plans";
import { IdCard, SubscriptIcon } from "lucide-react";
import { CardStackIcon } from "@radix-ui/react-icons";

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
  },
  {
    name: "Not found",
    layout: "",
    path: "*",
    component: <NotFound />,

  },
  {
    name: "Edit Profile",
    layout: "/",
    path: "/profile/edit",
    icon: <MdPerson className="h-6 w-6" />,
    component: <EditProfile />,
  },
  {
    name: "PDF Viewer",
    layout: "/",
    path: "/report/:url",
    icon: <FaFilePdf  />,
    component:<PdfViewer/>
  },
  {
    name: "Plans",
    layout: "/user",
    path: "plans",
    icon:   <MdPayments/>,
    component:<Planes/>
  },
  
];
export default routes;
