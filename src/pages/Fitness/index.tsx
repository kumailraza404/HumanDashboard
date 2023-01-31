import { useEffect, useState } from "react";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import WaterIcon from "@mui/icons-material/Water";

import { Text } from "../../styles";
import { RootState } from "../../store/reducer";
import {
  getMonthlyActivityData,
  getWeeklyActivityData,
  getCaloriesExpendedForTheDay,
  getDistanceCoveredForTheDay,
  getHydrationForTheDay,
} from "../../services/fitnessSerices";
import { getDates, getTotalHoursOfActivities } from "../../utils";
import { OverviewGraphWrapper } from "./styles";
import { Stack } from "@mui/system";
import DashboardMetricCard from "../../components/DashboardMetricCard";

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
  // colors: ["#red", "blue", "#00E396"],
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
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
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

const Fitness = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [range, setRange] = useState<string>("weekly");
  const [bikingSeriesData, setBikingSeriesData] = useState<number[][]>([]);
  const [runningSeriesData, setRunningSeriesData] = useState<number[][]>([]);
  const [swimmingSeriesData, setSwimmingSeriesData] = useState<number[][]>([]);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [hydration, setHydration] = useState(0);

  const handleRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string,
  ) => {
    if (newRange) {
      setRange(newRange);
    }
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Biking",
      data: bikingSeriesData,
    },
    {
      name: "Running",
      data: runningSeriesData,
    },
    {
      name: "Swimming",
      data: swimmingSeriesData,
    },
  ];

  const filterDataByRange = (days: number, res: any) => {
    const dates = getDates(days);
    const normalizedData = getTotalHoursOfActivities(dates, res);
    const normalizedBiking = dates.map((e, i) => [
      Date.parse(e),
      normalizedData.biking[i],
    ]);
    setBikingSeriesData(normalizedBiking);
    const normalizedRunning = dates.map((e, i) => [
      Date.parse(e),
      normalizedData.running[i],
    ]);
    setRunningSeriesData(normalizedRunning);

    const normalizedSwimming = dates.map((e, i) => [
      Date.parse(e),
      normalizedData.swimming[i],
    ]);
    setSwimmingSeriesData(normalizedSwimming);

    console.log(normalizedData, "normalized activity data");
  };

  const sumResultData = (res: any): number => {
    const result = res?.bucket[0]?.dataset[0]?.point?.reduce(
      (total: number, current: any) => {
        return total + parseFloat(current.value[0].fpVal);
      },
      0,
    );
    return result;
    console.log(result, "calories sum for the day");
  };

  const getActivitiesByMonth = async () => {
    const res = await getMonthlyActivityData();
    filterDataByRange(30, res);
  };

  const getActivitiesByWeek = async () => {
    const res = await getWeeklyActivityData();
    filterDataByRange(7, res);
  };

  const getCaloriesBurnedToday = async () => {
    const res = await getCaloriesExpendedForTheDay();
    console.log(res, "calories data");
    const sum = sumResultData(res);
    setCaloriesBurned(sum);
  };

  const getDistanceCoveredToday = async () => {
    const res = await getDistanceCoveredForTheDay();
    console.log(res, "distance data");
    const sum = sumResultData(res);
    setDistanceCovered(sum);
  };
  const getHydrationToday = async () => {
    const res = await getHydrationForTheDay();
    console.log(res, "distance data");
    const sum = sumResultData(res);
    setHydration(sum);
  };

  useEffect(() => {
    if (isSignedIn) {
      getCaloriesBurnedToday();
      getDistanceCoveredToday();
      getHydrationToday();
      if (range === "weekly") {
        getActivitiesByWeek();
      }
      if (range === "monthly") {
        getActivitiesByMonth();
      }
    }
  }, [isSignedIn, range]);
  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        columnSpacing={4}
      >
        <Grid item xs={12}>
          <OverviewGraphWrapper>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              paddingX="10px"
            >
              <Text customColor="#FFFFFF" size={30}>
                Activity Overview
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
              type="area"
              height={350}
              widtgh={"100%"}
            />
          </OverviewGraphWrapper>
        </Grid>
      </Grid>
      <Grid container display={"flex"} marginTop={12} columnSpacing={4}>
        <Grid item xs={4}>
          <DashboardMetricCard
            heading={`Calories Burned`}
            subHeading={`${caloriesBurned.toFixed(2)} in kcal`}
            icon={WhatshotIcon}
            height="150px"
          />
        </Grid>

        <Grid item xs={4}>
          <DashboardMetricCard
            heading={`Hydration`}
            subHeading={`${hydration.toFixed(2)} litres`}
            icon={WaterIcon}
            height="150px"
          />
        </Grid>

        <Grid item xs={4}>
          <DashboardMetricCard
            heading={`Distance Covered`}
            subHeading={`${distanceCovered.toFixed(2)} meters`}
            icon={WhatshotIcon}
            height="150px"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Fitness;
