import BarChart from "@/components/charts/BarChart";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import Card from "@/components/card";
import { formatDateShort } from "@/utils/formatter";

const DailyTraffic = ({ data }) => {
  const trafficData = [
    {
      name: "Daily Traffic",
      data: data ? Object.values(data) : [],
    },
  ];

  const barChartOptionsDailyTraffic = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: Object.keys(data).map((key) => formatDateShort(key)),
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };

  const currentDayValue = Object.values(data)[7];
  const previousDayValue = Object.values(data)[6];
  const percentageChange = previousDayValue? ((currentDayValue - previousDayValue) / previousDayValue) * 100
    : 0;

  return (
    <Card extra="pb-7 p-[20px] md:min-w-[500px] flex-1 max-w-[1000px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">
            Daily Traffic
          </p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            {currentDayValue}{" "}
            <span className="text-sm font-medium leading-6 text-gray-600">
              Visitors
            </span>
          </p>
        </div>
        <div className="mt-2 flex items-start">
          <div
            className={`flex items-center text-sm ${
              percentageChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentageChange >= 0 ? (
              <MdArrowDropUp className="h-5 w-5" />
            ) : (
              <MdArrowDropDown className="h-5 w-5" />
            )}
            <p className="font-bold">
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pt-10 pb-0">
        <BarChart
          chartData={trafficData}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </Card>
  );
};

export default DailyTraffic;
