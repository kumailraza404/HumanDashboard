import styled from "@emotion/styled";

export const MetricDiv = styled("div")(() => ({
  background: "#FFFFFF",
  height: "200px",
  width: "100%",
  borderRadius: "20px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
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
