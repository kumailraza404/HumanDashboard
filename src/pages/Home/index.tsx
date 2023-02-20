import { Grid } from "@mui/material";
import DailyJogging from "../../components/DailyJogging";
import OverviewSleep from "../../components/OverviewSleep";

const Home = () => {
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-between"}
      columnSpacing={40}
      rowSpacing={4}
    >
      <Grid item md={6} xs={12}>
        <DailyJogging />
      </Grid>
      <Grid item md={6} xs={12}>
        <OverviewSleep />
      </Grid>
    </Grid>
  );
};

export default Home;
