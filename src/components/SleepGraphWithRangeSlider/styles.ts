import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const OverviewGraphWrapper = styled("div")(() => ({
  minHeight: "400px",
  background: "#6a5daf",
  borderRadius: "20px",
  padding: "10px",
  paddingTop: "40px",
}));

export const SleepGraphHeader = styled(Stack)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  paddingX: "10px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));
