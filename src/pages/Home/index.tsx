import { Grid } from "@mui/material";
import { OverviewGraph } from "./styles";

const Home = () => {

    return(
        <Grid>

            <Grid container display={"flex"} justifyContent={"space-between"}>
                <Grid item xs={7}>
                    <OverviewGraph />
                </Grid>
                <Grid item xs={4} sx={{ border:"1px solid orange"}}></Grid>
            </Grid>
            
        </Grid>

    )
}

export default Home;