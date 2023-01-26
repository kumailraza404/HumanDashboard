import { SvgIcon } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { OverviewSteps, StepDetailDiv, StepIconDiv } from "./styles";
import { Text } from "../../styles";

const DailyJogging = () => {
  return (
    <OverviewSteps>
      <StepIconDiv>
        <SvgIcon
          component={DirectionsRunIcon}
          sx={{ color: "white", height: "45px", width: "45px" }}
        />
      </StepIconDiv>
      <StepDetailDiv>
        <Text customColor="#FFFFFF" size={38} weight={700}>
          Daily Jogging
        </Text>
        <Text customColor="#FFFFFF" size={22}>
          0 Steps
        </Text>
      </StepDetailDiv>
    </OverviewSteps>
  );
};

export default DailyJogging;
