import { styled } from "@mui/system";

export const MetricDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<{
  height?: string;
}>(({ height }) => ({
  background: "#FFFFFF",
  height: "150px",
  width: "100%",
  borderRadius: "20px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));
