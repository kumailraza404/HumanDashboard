import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

import { Text } from "../../styles";
import { SvgIcon, useMediaQuery, useTheme } from "@mui/material";
import { navItems } from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/slice/userSlice";
import { RootState } from "../../store/reducer";
import { googleLogout } from "@react-oauth/google";

type Anchor = "top";

export default function TemporaryDrawer() {
  const dispatch = useDispatch();

  const { isSignedIn } = useSelector((state: RootState) => state.user);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [toggle, setToggle] = React.useState(false);

  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
    toggleDrawer(false);
    setToggle(false);
  };

  const logoutUser = () => {
    dispatch(signOut());
    googleLogout();
    toggleDrawer(false);
    setToggle(false);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setToggle(open);
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        background: "#7164ba",
      }}
      role="presentation"
    >
      <List>
        {navItems.map((item, index: number) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => {
              handleNavigation(item.link);
            }}
          >
            <ListItemButton>
              <SvgIcon
                component={item.icon}
                sx={{
                  color: "#FFFFFF",
                  height: `${16 / 8}em`,
                  marginRight: "1em",
                }}
              />
              <Text size={16} weight={500} customColor={"#FFFFFF"}>
                {item.name}
              </Text>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"logout"} disablePadding onClick={logoutUser}>
          {isSignedIn && (
            <ListItemButton>
              <SvgIcon
                component={LogoutIcon}
                sx={{
                  color: "#FFFFFF",
                  height: `${16 / 8}em`,
                  marginRight: "1em",
                }}
              />
              <Text size={16} weight={500} customColor={"#FFFFFF"}>
                Logout
              </Text>
            </ListItemButton>
          )}
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {(["top"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <div>
            {isMobileScreen && (
              <SvgIcon
                component={MenuIcon}
                onClick={toggleDrawer(true)}
                sx={{ color: "#6a5daf", height: "45px", width: "45px" }}
              />
            )}
          </div>

          <Drawer anchor={anchor} open={toggle} onClose={toggleDrawer(false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
