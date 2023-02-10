import { styled } from "@mui/system";

export const MetricDiv = styled("div")(({ theme }) => ({
  background: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  borderRadius: "20px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",
  boxShadow: "10px 5px 5px rgba(0,0,0,0.2)",
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
