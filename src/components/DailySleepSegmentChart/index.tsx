import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// import sleepSegment from "../../assets/mockData/sleepSegemts.json";
import { RootState } from "../../store/reducer";
import { getTodaysSleepSegements } from "../../services/sleepServices";
import { current } from "@reduxjs/toolkit";
import ErrorIcon from "@mui/icons-material/Error";
import { Text } from "../../styles";
import { SvgIcon } from "@mui/material";
import { UnableDiv } from "./styles";

const DailySleepSegmentChart = () => {
  const [series, setSeries] = React.useState<any>(new Array(7).fill(0));
  const { isSignedIn } = useSelector((state: RootState) => state.user);

  const options: ApexCharts.ApexOptions = {
    labels: [
      "Awake",
      "Sleep",
      "Deep sleep",
      "Out-of-bed",
      "Light sleep",
      "Deep sleep",
      "REM",
    ],
    legend: {
      position: "left",
      offsetY: 100,
    },
  };

  function calculateDuration(data: any) {
    let durations = new Array(7).fill(1);
    console.log(data, "check data");
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
  }
  const getTodaysSleepData = async () => {
    const result = await getTodaysSleepSegements();

    calculateDuration(result);
  };

  const checkIfZero = (currentvalue: number) => currentvalue == 0;

  React.useEffect(() => {
    if (isSignedIn) {
      getTodaysSleepData();
    }
  }, [isSignedIn]);

  if (series.every(checkIfZero)) return <UnableToFetch />;
  return (
    <ReactApexChart
      options={options}
      series={series || new Array(7).fill(0)}
      type="donut"
      height={300}
      widtgh={"100%"}
    />
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
