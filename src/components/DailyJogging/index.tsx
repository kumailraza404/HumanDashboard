import { useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import { useSelector } from "react-redux";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { OverviewSteps, StepDetailDiv, StepIconDiv } from "./styles";

import { Text } from "../../styles";
import { RootState } from "../../store/reducer";
import { getStepCountsForTheDay } from "../../services/stepCount";

const ShoeIcon = "../../assets/shoes.svg";
import sh from "../../assets/shoes.svg";
console.log(ShoeIcon, "check it");

const DailyJogging = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [dailyStepsForTheDay, setDailyStepsForTheDay] = useState(0);

  const getStepCountData = async () => {
    const result = await getStepCountsForTheDay();
    // console.log(result);
    const sum = result?.bucket[0]?.dataset[0]?.point?.reduce(
      (total: number, current: any) => {
        return total + current.value[0].intVal;
      },
      0,
    );

    setDailyStepsForTheDay(sum);
  };
  useEffect(() => {
    if (isSignedIn) {
      getStepCountData();
    }
  }, [isSignedIn]);
  return (
    <OverviewSteps>
      <StepIconDiv>
        <img
          src={sh}
          style={{ height: "50%", width: "50%", transform: "rotate(300deg)" }}
          alt="running"
        />
        {/* <SvgIcon
          component={shoes}
          sx={{
            color: "#1d1d1d",
            height: "8rem",
            width: "8rem",
            transform: "rotate(300deg)",
          }}
        /> */}
      </StepIconDiv>

      <StepDetailDiv sx={{ marginTop: "28%" }}>
        <Text size={22} weight={700} align={"center"}>
          {dailyStepsForTheDay} Steps
        </Text>
      </StepDetailDiv>
    </OverviewSteps>
  );
};

export default DailyJogging;
