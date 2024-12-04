

import Report from "../Report";
import {  useGetReports } from "../../hooks/report";



const MainSection = () => {
  const { data: reports, isLoading: reportLoading, error: reportError } = useGetReports();
 

  if (reportLoading) return <div>Loading...</div>;
  if (reportError) return <div>Error: {reportError.message}</div>;

  return (
    <div className="flex flex-col flex-grow bg-slate-100">
  
      <div className="p-8 flex flex-col gap-10">

        <div className="flex flex-wrap gap-5">
          {reports?.length > 0 ? (
            reports.map((report) => <Report key={report.id} report={report} />)
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-[300px]">
              <img src="/no_report.png" alt="No Reports" className="h-[200px]" />
              <p className="text-[20px] font-[500]">No reports available</p>
              <button
                onClick={() => setReportModal(true)}
                className="mt-4 p-2 bg-primary text-white rounded-md"
              >
                Generate Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
