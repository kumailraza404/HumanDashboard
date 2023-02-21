import { Grid } from "@mui/material";
import DailyJogging from "../../components/DailyJogging";
import OverviewSleep from "../../components/OverviewSleep";

const Home = () => {
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      rowSpacing={6}
    >
      <Grid item md={2.5} xs={11} sx={{ marginRight: "3rem" }}>
        <OverviewSleep />
      </Grid>
      <Grid item md={2.5} xs={11}>
        <DailyJogging />
      </Grid>
    </Grid>
  );
};

export default Home;
