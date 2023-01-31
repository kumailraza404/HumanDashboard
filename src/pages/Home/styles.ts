import { styled } from "@mui/system";

// export const MetricDiv = styled("div")(() => ({
//   background: "#FFFFFF",
//   height: "200px",
//   width: "100%",
//   borderRadius: "20px",
//   position: "relative",
//   display: "flex",
//   flexDirection: "column",
// }));

export const MetricDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<{
  height?: string;
}>(({ height }) => ({
  background: "#FFFFFF",
  height: height ? height : "200px",
  width: "100%",
  borderRadius: "20px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

export const MetricImageDiv = styled("div")(() => ({
  background: "#6a5daf",
  height: "80px",
  width: "80px",
  borderRadius: "20px",
  position: "absolute",
  top: "-40px",
  right: "50%",
  transform: "translate(50%,0)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
