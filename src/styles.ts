import { styled } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CSSProperties } from "react";
import { ButtonBase } from "@mui/material";

export const Button = styled(ButtonBase)(() => ({
  background: "#1F1F1F",
  height: "50px",
  color: "#FFFFFF",
  minWidth: "120px",
  borderRadius: "10px",
  fontSize: "20px",
  fontWeight: "400",
}));

export const DropDownBox = styled(Select)(() => ({
  textAlign: "start",
  color: "#6A27EA",
  fontWeight: "500",
  height: "60px",
  fontSize: "16px",
  width: "533px",
  marginBottom: "20px",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#6A27EA",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6A27EA",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6A27EA",
  },
  ".MuiSvgIcon-root ": {
    fill: "#6A27EA !important",
  },
  ".MuiSelect-iconOpen": {
    rotate: "rotate(190deg)",
  },
}));

export const Text = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "weight" &&
    prop !== "primary" &&
    prop !== "dim" &&
    prop !== "lineHeight" &&
    prop !== "customColor" &&
    prop !== "opacity" &&
    prop !== "align" &&
    prop !== "customStyle" &&
    prop !== "isClickable",
})<{
  size?: number;
  weight?: number;
  primary?: boolean;
  dim?: boolean;
  lineHeight?: number | string;
  customColor?: string;
  customStyle?: CSSProperties;
  isNumber?: boolean;
  opacity?: number;
  align?: CSSProperties["textAlign"];
  isClickable?: boolean;
}>(
  ({
    theme,
    size = 15,
    weight = 600,
    primary = true,
    dim = false,
    lineHeight = "normal",
    customColor,
    opacity = 1,
    align = "left",
    customStyle,
    isClickable = true,
  }) => ({
    fontFamily: "'Merriweather', serif", // this is working now
    fontWeight: weight,
    fontSize: `${size / 18}em`,
    lineHeight: lineHeight,
    opacity: dim ? 0.5 : opacity,
    textAlign: align,

    userSelect: isClickable ? "unset" : "none",
    WebkitUserSelect: isClickable ? "unset" : "none",
    MozUserSelect: isClickable ? "unset" : "none",
    msUserSelect: isClickable ? "unset" : "none",
    color: customColor ? customColor : "#1F1F1F",
    ...customStyle,
  }),
);
