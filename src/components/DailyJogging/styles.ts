import { SvgIcon } from "@mui/material";
import { styled } from "@mui/system";

// export const OverviewSteps = styled("div")(() => ({
//   minHeight: "80vh",
//   background: "#6a5daf",
//   borderRadius: "20px",
//   width: "100%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   boxShadow: "10px 5px 5px rgba(0,0,0,0.2)",
// }));

export const OverviewSteps = styled("div", {
  shouldForwardProp: (prop) => prop !== "background",
})<{
  background?: string;
}>(({ background = "#FFFFFF" }) => ({
  minHeight: "80vh",
  background: background || "#6a5daf",
  borderRadius: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "10px 5px 5px rgba(0,0,0,0.2)",
  border: "2px solid #1d1d1d",
}));

export const StepIconDiv = styled("div")(() => ({
  height: "10rem",
  border: "1px solid #1d1d1d",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "40%",
  transform: "rotate(40deg)",
  padding: "10px",
}));

export const StepDetailDiv = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));
