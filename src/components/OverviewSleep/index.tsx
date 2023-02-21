import { useState } from "react";
import { OverviewSteps, StepDetailDiv } from "../DailyJogging/styles";
import { Text } from "../../styles";
import DailySleepSegmentChart from "../DailySleepSegmentChart";

const OverviewSleep = () => {
  const [points, setPoints] = useState(0);
  return (
    <OverviewSteps background={"#1d1d1d"}>
      <DailySleepSegmentChart setPoints={setPoints} />
      <StepDetailDiv sx={{ marginTop: "15%" }}>
        <Text customColor="#FFFFFF" size={22} align={"center"}>
          Sleep Score: {points}
        </Text>
      </StepDetailDiv>
    </OverviewSteps>
  );
};

export default OverviewSleep;
