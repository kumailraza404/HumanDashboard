import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCalendarData } from "../../services/calendarServices";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Text } from "../../styles";

const Wealth = () => {
  const [category, setCategory] = useState<string>("work");

  const getCalendarDataForMonth = async () => {
    const res = await getCalendarData();
    console.log(res, "Check resss");
  };

  useEffect(() => {
    getCalendarDataForMonth();
  }, []);

  return (
    <Grid>
      <Grid container display={"flex"} columnSpacing={4}>
        <Grid item xs={12} display={"flex"}>
          Wealth
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Wealth;
