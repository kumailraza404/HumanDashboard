import { Grid, SvgIcon } from "@mui/material";
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
        <Grid item xs={12}>
          <SleepGraphWithRangeSlider />
        </Grid>
      </Grid>
      <Grid container display={"flex"} marginTop={12} columnSpacing={4}>
        <Grid item xs={12}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              paddingBottom: "40px",
              height: "435px",
            }}
          >
            <div style={{ padding: "20px", paddingTop: "40px" }}>
              <Text size={30} sx={{ marginLeft: "2%" }}>
                Last Night's Sleep Quality
              </Text>
            </div>
            {/* <DailySleepSegmentChart /> */}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sleep;
