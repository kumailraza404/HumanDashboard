import {
  LinearProgress,
  SvgIcon,
  SvgIconClassKey,
  SvgIconTypeMap,
} from "@mui/material";
import { MetricDiv, MetricImageDiv } from "../../pages/Home/styles";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { Text } from "../../styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface DashboardMetricCardProps {
  heading: string;
  subHeading: string;
  progress: number;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

const DashboardMetricCard = ({
  heading,
  subHeading,
  progress,
  icon,
}: DashboardMetricCardProps) => {
  return (
    <MetricDiv>
      <MetricImageDiv>
        <SvgIcon
          component={icon}
          sx={{ color: "#FFFFFF", height: "40px", width: "40px" }}
        />
      </MetricImageDiv>
      <Text size={30} weight={700} align={"center"} sx={{ paddingTop: "40px" }}>
        {heading}
      </Text>
      <Text size={18} weight={400} align={"center"} sx={{ paddingTop: "5px" }}>
        {subHeading}
      </Text>
      <div style={{ marginTop: "10px", width: "80%", alignSelf: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            size={18}
            weight={400}
            align={"center"}
            sx={{ paddingTop: "5px" }}
          >
            Progress
          </Text>
          <Text
            size={18}
            weight={400}
            align={"center"}
            sx={{ paddingTop: "5px" }}
          >
            {progress}%
          </Text>
        </div>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ marginTop: "20px" }}
        />
      </div>
    </MetricDiv>
  );
};

export default DashboardMetricCard;
