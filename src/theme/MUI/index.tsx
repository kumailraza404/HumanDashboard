import { CSSProperties, FC, useMemo } from "react";
import { PaletteMode, ThemeOptions } from "@mui/material";
import { ThemeProvider, alpha, createTheme } from "@mui/material/styles";

const theme = (): ThemeOptions => ({
  typography: {
    // fontFamily: "Inter",
    h1: {
      fontWeight: 800,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.7rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.4rem",
    },
    subtitle1: {
      fontWeight: 800,
      fontSize: "1.2rem",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    body1: {
      fontWeight: 600,
      fontSize: "1.2rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
});

interface Props {
  children: React.ReactNode;
}
const Theme: FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
