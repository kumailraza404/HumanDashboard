import { Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const Sleep = () => {
  const options: ApexCharts.ApexOptions = {
    series: [100, 100, 100, 100],
    labels: ["Deep sleep", "Light sleep", "Deep sleep", "REM"],
    legend: {
      position: "left",
      offsetY: 100,
    },
  };

  const series = [4, 2, 3, 1];
  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        marginTop={12}
        columnSpacing={4}
      >
        graph for week and month
      </Grid>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Grid
          item
          xs={4}
          sx={{
            background: "#FFFFFF",
            // height: "600px",
            width: "100%",
            borderRadius: "20px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={350}
            widtgh={"100%"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sleep;
