import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

import { Text } from "../../styles";
import { OverviewGraphWrapper } from "./styles";
import { RootState } from "../../store/reducer";
import {
  getMonthlySleepData,
  getSleepDataByRange,
  getWeeklySleepData,
} from "../../services/sleepServices";
import { getDates, getTotalHoursOfSleep } from "../../utils";
import { getStepCountsForTheDay } from "../../services/stepCount";

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
interface IOverviewGraph {
  setSleepHoursForToday?: (args: number) => void;
}
const OverviewGraph = ({ setSleepHoursForToday }: IOverviewGraph) => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [seriesData, setSeriesData] = React.useState<number[][]>([]);
  const dateRange = getDates(7);
  const series: ApexAxisChartSeries = [
    {
      name: "Hours",
      data: seriesData,
    },
  ];

  const getSleepData = async () => {
    const result = await getSleepDataByRange();
    // const result2 = await getMonthlySleepData();
    // const result3 = await getWeeklySleepData();
    // console.log(result2, "result 2");
    // console.log(result3, "result 3");
    console.log(result, "check result");

    formatWeekSleepData(result);
  };

  const formatWeekSleepData = (data: any) => {
    // console.log(dateRange, "range");
    const sleepRange = getTotalHoursOfSleep(dateRange, data);
    const normalized = dateRange.map((e, i) => [Date.parse(e), sleepRange[i]]);
    setSeriesData(normalized);
    if (setSleepHoursForToday) {
      setSleepHoursForToday(sleepRange[sleepRange.length - 1]);
    }
  };

  React.useEffect(() => {
    if (isSignedIn) {
      getSleepData();
    }
  }, [isSignedIn]);

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
