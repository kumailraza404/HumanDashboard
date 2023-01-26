import styled from "@emotion/styled";

export const OverviewWork = styled("div")(() => ({
  height: "200px",
  background: "#ec628e",
  borderRadius: "20px",
  width: "100%",
}));

export const OverviewWorkHeading = styled("div")(() => ({
  width: "100%",
  height: "60%",
  background: "#fd91b4",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const OverviewWorkDetail = styled("div")(() => ({
  width: "100%",
  height: "40%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));
