import { useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import { useSelector } from "react-redux";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { OverviewSteps, StepDetailDiv, StepIconDiv } from "./styles";

import { Text } from "../../styles";
import { RootState } from "../../store/reducer";
import { getStepCountsForTheDay } from "../../services/stepCount";

const DailyJogging = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [steps, setSteps] = useState(0);

  const getStepCountData = async () => {
    const result = await getStepCountsForTheDay();
    // console.log(result);
    const sum = result?.bucket[0]?.dataset[0]?.point?.reduce(
      (total: number, current: any) => {
        return total + current.value[0].intVal;
      },
      0,
    );

    // console.log(sum, "total steps");
    setSteps(sum);
  };
  useEffect(() => {
    if (isSignedIn) {
      // getSleepData();
      getStepCountData();
    }
  }, [isSignedIn]);
  return (
    <OverviewSteps>
      <StepIconDiv>
        <SvgIcon
          component={DirectionsRunIcon}
          sx={{ color: "white", height: "45px", width: "45px" }}
        />
      </StepIconDiv>
      <StepDetailDiv>
        <Text customColor="#FFFFFF" size={28} weight={700}>
          Daily Steps
        </Text>
        <Text customColor="#FFFFFF" size={22}>
          {steps} Steps
        </Text>
      </StepDetailDiv>
    </OverviewSteps>
  );
};

export default DailyJogging;
