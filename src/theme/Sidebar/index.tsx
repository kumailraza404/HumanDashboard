import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Drawer } from "./styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { SvgIcon, Tooltip } from "@mui/material";
// import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { signOut } from "../../store/slice/userSlice";
import { googleLogout } from "@react-oauth/google";

export const navItems = [
  { name: "Dashboard", icon: DashboardIcon, link: "/" },
  { name: "Sleep", icon: NightShelterIcon, link: "/sleep" },
  { name: "Work Life", icon: WorkIcon, link: "/work-life" },
  { name: "Fitness", icon: FitnessCenterIcon, link: "/fitness" },
  { name: "Wealth", icon: AttachMoneyIcon, link: "/wealth" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector((state: RootState) => state.user);

  const { pathname } = useLocation();

  const matches = useMediaQuery("(min-width:600px)");

  const logoutUser = () => {
    dispatch(signOut());
    googleLogout();
  };

  return (
    <Drawer>
      <div>
        {navItems.map((item) => {
          return (
            <div
              style={{
                marginTop: "25px",
                background:
                  pathname === item.link
                    ? "rgba(96.1,96.1,96.1,0.3)"
                    : "transparent",
                height: "40px",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "40px",
                cursor: "pointer",
              }}
              onClick={() => navigate(item.link)}
              key={`navlinks_${item.name}`}
            >
              <Tooltip title={item.name} placement="right">
                <SvgIcon component={item.icon} sx={{ color: "#FFFFFF" }} />
              </Tooltip>
            </div>
          );
        })}
      </div>

      {isSignedIn && (
        <div
          style={{
            height: "40px",
            width: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Tooltip title={"Logout"} placement="right">
            <SvgIcon
              component={LogoutIcon}
              sx={{ color: "#FFFFFF" }}
              onClick={logoutUser}
            />
          </Tooltip>
        </div>
      )}
    </Drawer>
  );
}
