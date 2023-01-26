import { Grid, SvgIcon } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import OverviewGraph from "../../components/OverviewGraph";
import DailyJogging from "../../components/DailyJogging";
import OverviewWork from "../../components/OverviewWork";
import DashboardMetricCard from "../../components/DashboardMetricCard";

const Home = () => {
  return (
    <Grid>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Grid item xs={7}>
          <OverviewGraph />
        </Grid>
        <Grid
          item
          xs={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <DailyJogging />
          <OverviewWork />
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        marginTop={12}
      >
        <Grid item xs={3}>
          <DashboardMetricCard
            heading="Bicycle Drill"
            subHeading="10KM/day"
            icon={DirectionsBikeIcon}
            progress={70}
          />
        </Grid>
        <Grid item xs={3}>
          <DashboardMetricCard
            heading="Sleepy Hours"
            subHeading="4 Hours / day"
            icon={BedtimeIcon}
            progress={70}
          />
        </Grid>
        <Grid item xs={3}>
          <DashboardMetricCard
            heading="Happy Hours"
            subHeading="4 hangouts / week"
            icon={EmojiEmotionsIcon}
            progress={70}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
