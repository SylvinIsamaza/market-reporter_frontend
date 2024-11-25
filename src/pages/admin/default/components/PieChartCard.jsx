import PieChart from "@/components/charts/PieChart";
import Card from "@/components/card";
import { getOSColor, sortObjectByByValues, returnPercentage } from "@/utils/formatter";

const PieChartCard = ({ data }) => {
  // Handle undefined or null data
  const validData = data && Object.keys(data).length > 0 ? data : {};

  const pieChartOptions = {
    labels: Object.keys(validData),
    colors: Object.keys(validData).map((key) => getOSColor(key.toLowerCase())),
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: Object.keys(validData).map((key) => getOSColor(key.toLowerCase())),
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
    },
  };

  const pieChartData = Object.values(validData);
  const topVisitorDevices = sortObjectByByValues(validData);
  const totalVisitorByDevice = Object.values(validData).reduce((acc, value) => acc + value, 0);

  return (
    <Card extra="rounded-[20px] p-3 flex-1">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Visitor By Device
          </h4>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {pieChartData.length > 0 ? (
          <PieChart options={pieChartOptions} series={pieChartData} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        )}
      </div>

      {Object.keys(topVisitorDevices).length > 1 && (
        <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          {/* Top Device */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: getOSColor(Object.keys(topVisitorDevices)[0].toLowerCase()),
                }}
              />
              <p className="ml-1 text-sm font-normal text-gray-600">
                {Object.keys(topVisitorDevices)[0]}
              </p>
            </div>
            <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
              {returnPercentage(
                topVisitorDevices[Object.keys(topVisitorDevices)[0]],
                totalVisitorByDevice
              ).toFixed(2)}
              %
            </p>
          </div>

          <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

          {/* Second Device */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: getOSColor(Object.keys(topVisitorDevices)[1].toLowerCase()),
                }}
              />
              <p className="ml-1 text-sm font-normal text-gray-600">
                {Object.keys(topVisitorDevices)[1]}
              </p>
            </div>
            <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
              {returnPercentage(
                topVisitorDevices[Object.keys(topVisitorDevices)[1]],
                totalVisitorByDevice
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PieChartCard;
