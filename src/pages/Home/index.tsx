import { useState, useMemo } from "react";
import { Grid, SvgIcon } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import OverviewGraph from "../../components/OverviewGraph";
import DailyJogging from "../../components/DailyJogging";
import OverviewWork from "../../components/OverviewWork";
import DashboardMetricCard from "../../components/DashboardMetricCard";
import ReactApexChart from "react-apexcharts";

const Home = () => {
  const [sleephours, setSleepHours] = useState(0);
  const [dailyStepsForTheDay, setDailyStepsForTheDay] = useState(0);

  const sleepProgress = useMemo(() => {
    if (sleephours) {
      if (sleephours > 8) {
        return 100;
      }
      return (sleephours / 8) * 100;
    }
    return 0;
  }, [sleephours]);

  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        columnSpacing={4}
      >
        <Grid item xs={8}>
          <OverviewGraph setSleepHoursForToday={setSleepHours} />
        </Grid>
        <Grid
          item
          xs={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          rowSpacing={4}
        >
          <DailyJogging
            setDailyStepsForTheDay={setDailyStepsForTheDay}
            dailyStepsForTheDay={dailyStepsForTheDay}
          />
          <OverviewWork />
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        marginTop={12}
        columnSpacing={4}
      >
        <Grid item xs={4}>
          <DashboardMetricCard
            heading="Bicycle Drill"
            subHeading="10KM/day"
            icon={DirectionsBikeIcon}
          />
        </Grid>
        <Grid item xs={4}>
          <DashboardMetricCard
            heading="Sleepy Hours"
            subHeading={`${sleephours} hours`}
            icon={BedtimeIcon}
          />
        </Grid>
        <Grid item xs={4}>
          <DashboardMetricCard
            heading="Happy Hours"
            subHeading="4 hangouts / week"
            icon={EmojiEmotionsIcon}
          />
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        marginTop={12}
        columnSpacing={4}
      ></Grid>
    </Grid>
  );
};

export default Home;
