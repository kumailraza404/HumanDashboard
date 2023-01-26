import { styled } from "@mui/system";

export const OverviewSteps = styled("div")(() => ({
  height: "150px",
  background: "#6a5daf",
  borderRadius: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
}));

export const StepIconDiv = styled("div")(() => ({
  height: "70px",
  width: "125px",
  background: "rgba(96.1,96.1,96.1,0.3)",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StepDetailDiv = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  marginRight: "20px",
}));
