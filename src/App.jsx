import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import SelectPlan from "./pages/SelectPlan";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Landing from "./pages/Landing";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import PdfViewer from "./pages/PdfViewer";
import Report from "./pages/Report";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Setting";
import CreditPage from "./pages/Credits";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/view-pdf" element={<PdfViewer/>}/>
        <Route path="/user-dashboard" element={<ProtectedRoutes><UserDashboard /></ProtectedRoutes>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
        <Route path="/select-plan" element={<SelectPlan />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/report" element={<Report />}></Route>
        <Route path="/transactions" element={<Transaction />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/credits" element={<CreditPage />}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
