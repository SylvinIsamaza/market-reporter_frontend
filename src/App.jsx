import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import SelectPlan from "./pages/SelectPlan";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Landing from "./pages/Landing";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminLayout from "./layouts/admin";
import Report from "./pages/Report";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Setting";
import CreditPage from "./pages/Credits";
import Dashboard from "./pages/admin/default";
import UserLayout from "./layouts/user";
import { useInitVisitor } from "@/hooks/analytic";
import { useEffect } from "react";
import ResetPassword from "@/pages/auth/ResetPassword";
import NotFound from "@/pages/NotFound";
import ChangePassword from "@/pages/ChangePassword";
import PdfViewer from "@/pages/PdfViewer";
import AdminProtectedRoutes from "@/routes/AdminRoutes";
import Terms from "@/pages/terms/Terms";
import Legal from "@/pages/legal/Legal";
import CookiePolicy from "@/pages/cookiePolicy/CookiePolicy";
import Contact from "@/pages/Contact";

function App() {
  const { mutate: initVisitor, isLoading } = useInitVisitor();
  useEffect(() => {
    initVisitor();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>

        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/legal-notice" element={<Legal />}></Route>
        <Route path="/cookie-policy" element={<CookiePolicy />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
        <Route path="/select-plan" element={<SelectPlan />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/credits" element={<CreditPage />}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />}></Route>
        <Route
          path="admin/*"
          element={
            <AdminProtectedRoutes>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/user/*"
          element={
            <ProtectedRoutes>

            <UserLayout>
              <Dashboard />
            </UserLayout>
            </ProtectedRoutes>
          }
        />
        <Route path="/change-password" element={<ChangePassword />}></Route>

        <Route path="/report/:url" element={<PdfViewer />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
