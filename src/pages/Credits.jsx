import Sidebar from "../components/UserDashboard/Sidebar";
import MainSection from "../components/Credits/MainSection";

const CreditPage = () => {
    return (
    <div className="h-screen w-full flex">
        <Sidebar />
        <MainSection />
    </div>
  );
};

export default CreditPage;
