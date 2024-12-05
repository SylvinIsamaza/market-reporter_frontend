import React from "react";
import MainDashboard from "@/pages/admin/default";

import Profile from "@/pages/admin/profile";

import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import Transaction from "@/pages/Transaction";
import EditProfile from "@/pages/admin/profile/components/EditProfile";
import NotFound from "@/pages/NotFound";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },  
  {
    name: "Transactions",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "transactions",
    component: <Transaction />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Edit Profile",
    layout: "/",
    path: "/profile/edit",
    icon: <MdPerson className="h-6 w-6" />,
    component: <EditProfile />,
  },
  {
    name: "Not found",
    layout: "/",
    path: "/*",
    components:<NotFound/>
  }

];
export default routes;