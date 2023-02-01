import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCalendarData } from "../../services/calendarServices";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Text } from "../../styles";

const WorkLife = () => {
  const [category, setCategory] = useState<string>("work");

  const getCalendarDataForMonth = async () => {
    const res = await getCalendarData();
    console.log(res, "Check resss");
  };

  const handleCategoryChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string,
  ) => {
    if (newRange) {
      setCategory(newRange);
    }
  };

  const arr = new Array(7).fill(1);

  useEffect(() => {
    getCalendarDataForMonth();
  }, []);

  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        columnSpacing={4}
      >
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            aria-label="text alignment"
            sx={{ background: "rgba(256,256,256,0.5)" }}
            color="primary"
          >
            <ToggleButton value="work" aria-label="left aligned">
              <Text size={12}>Work</Text>
            </ToggleButton>
            <ToggleButton value="life" aria-label="centered">
              <Text size={12}>Life</Text>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {/* <Grid
          xs={12}
          sx={{
            border: "1px solid green",
          }}
          container
          columnSpacing={4}
        >
          {arr.map((e) => {
            return (
              <Grid
                xs={4}
                sx={{ border: "1px solid red", height: "200px", width: "100%" }}
              ></Grid>
            );
          })}
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default WorkLife;
