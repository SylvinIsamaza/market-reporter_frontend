import TotalSpent from "@/pages/admin/default/components/TotalSpent";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "@/components/widget/Widget";
import DailyTraffic from "@/pages/admin/default/components/DailyTraffic";
import TransactionTable from "@/components/table/TransactionTable";

import { useGetAdminDashboardData } from "@/hooks/analytic";
import PieChartCard from "./components/PieChartCard";

const Dashboard = () => {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    status,
  } = useGetAdminDashboardData("monthly");

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="w-full flex items-center justify-center h-[calc(100vh-100px)]">
        {error?.message || "An error occurred."}
      </div>
    );
  return (
    <>
      {dashboardData && (
        <div className="col-span-1">
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title="Earning"
              subtitle={`$${dashboardData?.overAllIncome || 0}`}
            />
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title="Demographic Statistics"
              subtitle={`${dashboardData?.latestDemographicYear || 0}`}
            />
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title="Criminal Statistics"
              subtitle={`${dashboardData?.latestCriminalYear || 0}`}
            />
            <Widget
              icon={<MdDashboard className="h-6 w-6" />}
              title="Reports Generated"
              subtitle={`${dashboardData?.totalReportsCount || 0}`}
            />
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title="New Users"
              subtitle={`${dashboardData?.newUsersThisWeek?.length || 0}`}
            />
            <Widget
              icon={<IoMdHome className="h-6 w-6" />}
              title="Weekly new reports"
              subtitle={`${dashboardData?.totalProjects || 0}`}
            />
          </div>

          {/* Charts */}
          <div className="mt-5 flex gap-5">
            <TotalSpent data={dashboardData} />
          </div>
          <div className="pt-[40px] flex gap-[40px]">
            <DailyTraffic data={dashboardData.dailyVisitors} />
            <PieChartCard data={dashboardData.visitorsByDevice}/>

          </div>
          <div className="py-[40px]">
           
            
          <TransactionTable title="Recent Transactions" hidePagination={true} transactions={dashboardData.allTransactions.slice(0,5)} />
           </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
