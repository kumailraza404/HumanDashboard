import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

import Axios from "../../services/axiox";
// import { getWeekByRange } from "../../utils";
import { Text } from "../../styles";
import { OverviewGraphWrapper } from "./styles";
import { RootState } from "../../store/reducer";
import { getDates, getTotalHoursOfSleep } from "./utils";
import sleepData from "../../assets/mockData/sleepData.json";
import { getSleepDataByRange } from "../../services/sleepServices";

const options: ApexCharts.ApexOptions = {
  chart: {
    foreColor: "#ffffff",
    events: {
      selection: function (_chart, e) {
        console.log(new Date(e.xaxis.min));
      },
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#CED4DC", "#008FFB", "#00E396"],
  dataLabels: {
    enabled: false,
    style: {
      fontSize: "26px",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: "bold",
      colors: undefined,
    },
  },
  tooltip: {
    theme: "dark",
  },
  stroke: {
    curve: "smooth",
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.8,
    },
  },
  grid: {
    borderColor: "#fff",
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
  },
  xaxis: {
    type: "datetime",
  },
};

const OverviewGraph = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [seriesData, setSeriesData] = React.useState<number[][]>([]);
  const dateRange = getDates(7);
  const series: ApexAxisChartSeries = [
    {
      name: "South",
      data: seriesData,
    },
  ];

  console.log(series, "series");

  React.useEffect(() => {
    if (isSignedIn) {
      getSleepData();
    }
  }, [isSignedIn]);

  const getSleepData = async () => {
    const result = await getSleepDataByRange(dateRange);
    console.log(result);
    formatWeekSleepData(result);
  };

  const formatWeekSleepData = (data: any) => {
    console.log(dateRange, "range");
    const sleepRange = getTotalHoursOfSleep(dateRange, data);
    console.log(sleepRange, "sleep Data after normalization");
    const normalized = dateRange.map((e, i) => [Date.parse(e), sleepRange[i]]);
    setSeriesData(normalized);
  };

  return (
    <OverviewGraphWrapper>
      <Text customColor="#FFFFFF" size={30} sx={{ marginLeft: "2%" }}>
        Sleep Overview
      </Text>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
        widtgh={"100%"}
      />
    </OverviewGraphWrapper>
  );
};

export default OverviewGraph;
