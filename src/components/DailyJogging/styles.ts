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
  justifyContent: "center",
  boxShadow: "-10px 5px 5px rgba(0,0,0,0.5)",
  border: "1px solid #1d1d1d",
}));

export const StepIconDiv = styled("div")(() => ({
  height: "150px",
  width: "150px",
  border: "1px solid #1d1d1d",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // marginTop: "40%",
  transform: "rotate(45deg)",
  padding: "10px",
  marginTop: "13%",
}));

export const StepDetailDiv = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));
