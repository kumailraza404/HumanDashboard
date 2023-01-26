import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Axios from "../../services/axiox";
import { OverviewGraphWrapper } from "./styles";
import { getWeekByRange } from "../../utils";
import { Text } from "../../styles";

function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
const series = [
  {
    name: "South",
    data: generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 8, {
      min: 10,
      max: 100,
    }),
  },
];
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

  // const getSleepData = async () =>{
  //   const access_token = gapi.auth?.getToken()?.access_token
  //   console.log(access_token)

  //   let config = {
  //     headers: {
  //       'Authorization': 'Bearer ' + access_token
  //     }
  //   }

  //   const res = await axios.get('https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=2019-12-05T00:00:00.000Z&endTime=2019-12-17T23:59:59.999Z&activityType=72',config)
  //   console.log(res)
  // }

  React.useEffect(() => {
    if (isSignedIn) {
      getSleepData();
    }
  }, [isSignedIn]);

  const getSleepData = async () => {
    const { startTime, endTime } = getWeekByRange();

    console.log(startTime, endTime);

    // const res = await Axios.get(
    //   "https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=2019-12-05T00:00:00.000Z&endTime=2019-12-17T23:59:59.999Z&activityType=72",
    // );
    // console.log(res);
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
