import { Grid, SvgIcon } from "@mui/material";
import DailySleepSegmentChart from "../../components/DailySleepSegmentChart";
import SleepGraphWithRangeSlider from "../../components/SleepGraphWithRangeSlider";
import { Text } from "../../styles";
import { MetricImageDiv } from "./styles";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

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
            <DailySleepSegmentChart />
          </div>
        </Grid>
        {/* <Grid item xs={6}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              paddingBottom: "40px",
              position: "relative",
              height: "435px",
            }}
          >
            <MetricImageDiv>
              <SvgIcon
                component={SportsScoreIcon}
                sx={{ color: "#FFFFFF", height: "40px", width: "40px" }}
              ></SvgIcon>
            </MetricImageDiv>
            <div
              style={{
                padding: "20px",
                paddingTop: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text size={30}>Sleep Score</Text>
              <Text size={15}>For last night</Text>
            </div>
          </div>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Sleep;
