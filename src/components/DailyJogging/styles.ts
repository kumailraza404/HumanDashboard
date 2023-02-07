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
  boxShadow: "10px 5px 5px rgba(0,0,0,0.2)",
}));

export const StepIconDiv = styled("div")(() => ({
  height: "70px",
  width: "125px",
  background: "rgba(256,256,256,0.2)",
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
