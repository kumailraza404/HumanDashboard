import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const HeaderStyled = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "fit-content",
}));

export const ProfileCircle = styled("img")(() => ({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  marginLeft: "20px",
}));

export const HeaderButtons = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const HeaderChild = styled(Grid)(({ theme }) => ({
  display: "flex",
}));
export const HeaderChild2 = styled(Grid)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
    marginTop: "0.2em",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
  },
}));

export const ConnectWalletContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginRight: "0em",
    marginBottom: "2em",
  },
  [theme.breakpoints.up("md")]: {
    marginRight: "2em",
  },
}));
