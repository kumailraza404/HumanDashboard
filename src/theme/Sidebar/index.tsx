import React from "react";
import { useNavigate } from "react-router-dom";

import { Drawer } from "./styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Icon, SvgIcon } from "@mui/material";

export default function Sidebar() {
  const navigate = useNavigate();
  const items = [
    { name: "Home", icon: DashboardIcon, link: "/" },
    { name: "Sleep", icon: NightShelterIcon, link: "/sleep" },
    { name: "Work", icon: WorkIcon, link: "/work" },
    { name: "Fitness", icon: FitnessCenterIcon, link: "/fitness" },
    { name: "Nutrition", icon: RestaurantIcon, link: "/nutrition" },
    { name: "Happiness", icon: SentimentSatisfiedAltIcon, link: "/happiness" },
    { name: "Wealth", icon: AttachMoneyIcon, link: "/wealth" },
  ];
  return (
    <Drawer>
      {items.map((item) => {
        return (
          <div
            style={{ marginTop: "25px" }}
            onClick={() => navigate(item.link)}
            key={`navlinks_${item.name}`}
          >
            <SvgIcon component={item.icon} sx={{ color: "#FFFFFF" }} />
          </div>
        );
      })}
    </Drawer>
  );
}
