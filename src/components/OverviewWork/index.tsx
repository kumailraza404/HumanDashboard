import { SvgIcon } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import {
  OverviewWorkDetail,
  OverviewWorkHeading,
  OverviewWork as StyledOverviewWork,
} from "./styles";
import { StepIconDiv } from "../DailyJogging/styles";
import { Text } from "../../styles";

const OverviewWork = () => {
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
          Completed 6/8 Tasks
        </Text>
      </OverviewWorkDetail>
    </StyledOverviewWork>
  );
};

export default OverviewWork;
