import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// import sleepSegment from "../../assets/mockData/sleepSegemts.json";
import { RootState } from "../../store/reducer";
import { getTodaysSleepSegements } from "../../services/sleepServices";
import ErrorIcon from "@mui/icons-material/Error";
import { Text } from "../../styles";
import { Grid, SvgIcon, useMediaQuery, useTheme } from "@mui/material";
import { UnableDiv } from "./styles";

const MIN_POSSIBLE = -4.6;
const HIGHEST_POSSIBLE = 3.8;

interface IDailySleepSegmentChart {
  setPoints: (p: number) => void;
}

const DailySleepSegmentChart = ({ setPoints }: IDailySleepSegmentChart) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [series, setSeries] = React.useState<any>(new Array(6).fill(0));
  const { isSignedIn } = useSelector((state: RootState) => state.user);

  const options: ApexCharts.ApexOptions = {
    colors: ["#E5E0DF", "#716C6A", "#FFFFFF", "#7F7F7F", "#BFBFBF", "#7F7474"],
    plotOptions: {
      pie: {
        donut: {
          size: "7%",
        },
      },
    },
    labels: [
      "Awake",
      "Sleep",
      "Out-of-bed",
      "Light sleep",
      "Deep sleep",
      "REM",
    ],
    legend: {
      show: isMobileScreen,
      position: "top",
      // offsetY: isMobileScreen ? 1 : 100,
      // offsetX: isMobileScreen ? 2 : 200,
      // fontSize: "16px",
      // itemMargin: {
      //   horizontal: 10,
      //   // vertical: 20,
      // },
      fontSize: "12px",
      labels: {
        colors: ["#FFFFFF"],
      },
    },
  };

  function calculateScore(data: number[]) {
    // (0.2 * awake) + (0.1 * light sleep) + (0.6 * REM) + (0.3 * sleep duration) - (0.3 * deep sleep) - (0.2 * out-of-bed)
    const score =
      0.2 * data[0] +
      0.1 * data[3] +
      0.6 * data[5] +
      0.3 * data[1] -
      0.3 * data[4] -
      0.2 * data[2];

    const normalizedScore =
      ((score - MIN_POSSIBLE) / (HIGHEST_POSSIBLE - MIN_POSSIBLE)) * 10;
    setPoints(normalizedScore);
  }

  function calculateDuration(data: any) {
    let durations = new Array(7).fill(0);
    for (let i = 0; i < data.bucket.length; i++) {
      for (let j = 0; j < data.bucket[i].dataset.length; j++) {
        for (let k = 0; k < data.bucket[i].dataset[j].point.length; k++) {
          let start = data.bucket[i].dataset[j].point[k].startTimeNanos;
          let end = data.bucket[i].dataset[j].point[k].endTimeNanos;
          let duration = (end - start) / 1e6;
          let intVal = data.bucket[i].dataset[j].point[k].value[0].intVal;
          console.log(intVal, "int val");
          durations[intVal - 1] += duration / 3600000;
        }
      }
    }
    setSeries(durations);
    calculateScore(durations);
  }
  const getTodaysSleepData = async () => {
    const result = await getTodaysSleepSegements();
    console.log(result, "From todays sleep data segments");

    calculateDuration(result);
  };

  const checkIfZero = (currentvalue: number) => currentvalue == 0;

  React.useEffect(() => {
    if (isSignedIn) {
      getTodaysSleepData();
    }
  }, [isSignedIn]);

  // if (series.every(checkIfZero)) return <UnableToFetch />;
  // showing deep sleep if no sleep segments are available for last night
  return (
    <Grid>
      <ReactApexChart
        options={options}
        series={series.every(checkIfZero) ? [1, 1, 1, 1, 1, 1] : series}
        type="donut"
        height={280}
        width={280}
      />
    </Grid>
  );
};
export default DailySleepSegmentChart;

const UnableToFetch = () => {
  return (
    <UnableDiv>
      <SvgIcon component={ErrorIcon} sx={{ color: "#7164ba" }}></SvgIcon>
      <Text size={20} sx={{ marginLeft: "2%" }}>
        Unable to get your last night's sleep details
      </Text>
    </UnableDiv>
  );
};

//logic behind the scoring
// "Awake",
// "Sleep",
// "Deep sleep",
// "Out-of-bed",
// "Light sleep",
// "REM"

// score =
// (0.2 * awake) + (0.1 * light sleep) + (0.6 * REM) + (0.3 * sleep duration) - (0.3 * deep sleep) - (0.2 * out-of-bed)

// For example,
// if the maximum possible value for each metric is 8 hours,
// then the maximum possible raw score would be
// (0.2 * 8) + (0.1 * 8) + (0.6 * 8) + (0.3 * 8) - (0.3 * 8) - (0.2 * 0) = 3.8,

// and the minimum possible raw score would be
// (0.2 * 0) + (0.1 * 0) + (0.6 * 0) + (0.3 * 0) - (0.3 * 8) - (0.2 * 8) = -4.6.

//For example, if the raw score is 2.5
// and the maximum and minimum possible raw scores are 3.8 and -4.6, respectively,
// then the normalized score would be:

// normalized score = (2.5 - (-4.6)) / (3.8 - (-4.6)) * 10 = 6.34
// This would give a normalized score between 0 and 10, with higher scores indicating better overall sleep quality.
