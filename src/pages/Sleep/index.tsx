import { Grid } from "@mui/material";
import DailySleepSegmentChart from "../../components/DailySleepSegmentChart";
import SleepGraphWithRangeSlider from "../../components/SleepGraphWithRangeSlider";
import { Text } from "../../styles";

const Sleep = () => {
  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        columnSpacing={4}
      >
        <Grid
          item
          xs={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          rowSpacing={4}
        >
          <div
            style={{
              background: "#eb5f8c",
              borderRadius: "20px",
              paddingBottom: "40px",
            }}
          >
            <div style={{ padding: "20px", paddingTop: "40px" }}>
              <Text customColor="#FFFFFF" size={30} sx={{ marginLeft: "2%" }}>
                Last Sleep Quality
              </Text>
            </div>
            <DailySleepSegmentChart />
          </div>
        </Grid>
        <Grid item xs={8}>
          <SleepGraphWithRangeSlider />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sleep;
