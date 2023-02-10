import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { SvgIcon } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import {
  OverviewWorkDetail,
  OverviewWorkHeading,
  OverviewWork as StyledOverviewWork,
} from "./styles";
import { StepIconDiv } from "../DailyJogging/styles";
import { Text } from "../../styles";
import { getCalendarData } from "../../services/calendarServices";
import { IEvent, ResponseEvent } from "../../pages/WorkLife";

interface IOverviewWork {
  setHappyHours: (hours: number) => void;
}

const OverviewWork = ({ setHappyHours }: IOverviewWork) => {
  const { isSignedIn } = useSelector((state: RootState) => state.user);
  const [totalTasks, setTotalTasks] = useState(0);

  const formatResult = (res: ResponseEvent[]) => {
    let sumForWork = 0;
    let sumForHappines = 0;
    res.map((event: ResponseEvent) => {
      if (
        event.summary.includes("happy") ||
        event.summary.includes("hangout") ||
        event.summary.includes("friend") ||
        event.summary.includes("Hanging") ||
        event.summary.includes("dinner") ||
        event.summary.includes("lunch") ||
        event.summary.includes("breakfast") ||
        event.summary.includes("outing") ||
        event.summary.includes("picnic")
      ) {
        let duration =
          (new Date(event.end.dateTime).valueOf() -
            new Date(event.start.dateTime).valueOf()) /
          (1000 * 60 * 60);
        sumForHappines = sumForHappines + duration;
      } else {
        let duration =
          (new Date(event.end.dateTime).valueOf() -
            new Date(event.start.dateTime).valueOf()) /
          (1000 * 60 * 60);
        sumForWork = sumForWork + duration;
      }
    }, 0);
    console.log(sumForWork, "value for total hours in work from dashboard");
    setTotalTasks(Number(sumForWork.toFixed(2)));
    setHappyHours(Number(sumForHappines.toFixed(2)));
  };

  const getCalendarDataForWeek = async () => {
    const res = await getCalendarData();
    console.log(res);
    if (res.items.length) formatResult(res.items as ResponseEvent[]);
  };

  useEffect(() => {
    if (isSignedIn) getCalendarDataForWeek();
  }, [isSignedIn]);

  return (
    <StyledOverviewWork>
      <OverviewWorkHeading>
        <StepIconDiv>
          <SvgIcon
            component={WorkIcon}
            sx={{ color: "white", height: "45px", width: "45px" }}
          />
        </StepIconDiv>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <Text customColor="#FFFFFF" size={28} weight={700}>
            Work Completed
          </Text>
        </div>
      </OverviewWorkHeading>
      <OverviewWorkDetail>
        <Text customColor="#FFFFFF" size={22} align={"center"}>
          {totalTasks} hours of tasks
        </Text>
      </OverviewWorkDetail>
    </StyledOverviewWork>
  );
};

export default OverviewWork;
