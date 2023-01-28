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
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

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
const SleepGraphWithRangeSlider = ({
  setSleepHoursForToday,
}: IOverviewGraph) => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [seriesData, setSeriesData] = React.useState<number[][]>([]);
  const [range, setRange] = React.useState<string>("weekly");

  const series: ApexAxisChartSeries = [
    {
      name: "Hours",
      data: seriesData,
    },
  ];

  const getSleepDataWeekly = () => {
    const dateRangeWeekly = getDates(7);
    getSleepDataByRange().then((res) => {
      formatWeekSleepData(dateRangeWeekly, res);
    });
  };
  const getSleepDataMonthly = () => {
    const dateRangeMonthly = getDates(30);
    getMonthlySleepData().then((res) => {
      formatWeekSleepData(dateRangeMonthly, res);
      console.log(dateRangeMonthly, res, "res");
    });
  };

  const formatWeekSleepData = (dateRange: string[], data: any) => {
    // console.log(dateRange, "range");
    const sleepRange = getTotalHoursOfSleep(dateRange, data);
    const normalized = dateRange.map((e, i) => [Date.parse(e), sleepRange[i]]);
    setSeriesData(normalized);
    if (setSleepHoursForToday) {
      setSleepHoursForToday(sleepRange[sleepRange.length - 1]);
    }
  };

  const handleRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string,
  ) => {
    if (newRange) {
      setRange(newRange);
    }
  };

  React.useEffect(() => {
    if (isSignedIn) {
      if (range === "weekly") {
        getSleepDataWeekly();
      } else if (range === "monthly") {
        getSleepDataMonthly();
      }
    }
  }, [isSignedIn, range]);

  return (
    <OverviewGraphWrapper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingX="10px"
      >
        <Text customColor="#FFFFFF" size={30} sx={{ marginLeft: "2%" }}>
          Sleep Overview
        </Text>
        <ToggleButtonGroup
          value={range}
          exclusive
          onChange={handleRangeChange}
          aria-label="text alignment"
          sx={{ background: "rgba(256,256,256,0.5)" }}
          color="primary"
        >
          <ToggleButton value="weekly" aria-label="left aligned">
            <Text customColor="#fff" size={12}>
              Weekly
            </Text>
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="centered">
            <Text customColor="#fff" size={12}>
              Monthly
            </Text>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        widtgh={"100%"}
      />
    </OverviewGraphWrapper>
  );
};

export default SleepGraphWithRangeSlider;
