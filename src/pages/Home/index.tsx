import { Grid, SvgIcon } from "@mui/material";
import { MetricDiv, MetricImageDiv,  OverviewSteps, OverviewWork, OverviewWorkDetail, OverviewWorkHeading, StepIconDiv } from "./styles";
import data from "./testData"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Text } from "../../styles";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import OverviewGraph from "../../components/OverviewGraph";


const Home = () => {

    return(
        <Grid>

            <Grid container display={"flex"} justifyContent={"space-between"}>
                <Grid item xs={7}>
                    <OverviewGraph />


                </Grid>
                <Grid item xs={4} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <OverviewSteps>
                        <StepIconDiv>
                            <SvgIcon component={DirectionsRunIcon} sx={{color:"white", height:"45px", width:"45px"}}/>
                        </StepIconDiv>
                        <div style={{display:"flex", flexDirection:"column", marginRight:"20px"}}>
                            <Text customColor="#FFFFFF" size={38} weight={700}>Daily Jogging</Text>
                            <Text customColor="#FFFFFF" size={22} align={"center"}>0 Steps</Text>

                        </div>
                    </OverviewSteps>
                    <OverviewWork>
                        <OverviewWorkHeading>
                        <StepIconDiv sx={{marginLeft:"50px"}}>
                            <SvgIcon component={WorkIcon} sx={{color:"white", height:"45px", width:"45px"}}/>
                        </StepIconDiv>
                        <div style={{display:"flex", flexDirection:"column", marginRight:"20px"}}>
                            <Text customColor="#FFFFFF" size={38} weight={700}>Work Completed</Text>
                        </div>
                        </OverviewWorkHeading>
                        <OverviewWorkDetail>
                        <Text customColor="#FFFFFF" size={22} align={"center"}>Completed 6/8 Tasks</Text>

                        </OverviewWorkDetail>
                    </OverviewWork>
                </Grid>
            </Grid>
            
            <Grid container display={"flex"} justifyContent={"space-between"} marginTop={12}>
                <Grid item xs={3}>
                    <MetricDiv>
                        <MetricImageDiv>
                            <SvgIcon component={DirectionsBikeIcon} sx={{color:"#FFFFFF", height:"40px", width:"40px"}}/>
                        </MetricImageDiv>
                        <Text size={30} weight={700} align={"center"} sx={{paddingTop:"40px"}}>Bicycle Drill</Text>
                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>10 KM / Day</Text>
                        <div style={{marginTop:"10px", width:"80%", alignSelf:"center",}}>
                        
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>Progress</Text>
                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>70%</Text>

                        </div>

                        
                        <LinearProgress variant="determinate" value={70} sx={{ marginTop:"20px"}}/>

                        </div>

                    </MetricDiv>
                </Grid>
                <Grid item xs={3}>
                <MetricDiv>
                        <MetricImageDiv>
                            <SvgIcon component={BedtimeIcon} sx={{color:"#FFFFFF", height:"40px", width:"40px"}}/>
                        </MetricImageDiv>
                        <Text size={30} weight={700} align={"center"} sx={{paddingTop:"40px"}}>Sleepy Hours</Text>
                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>4 Hours / Day</Text>
                        <div style={{marginTop:"10px", width:"80%", alignSelf:"center",}}>
                        
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>Progress</Text>
                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>70%</Text>

                        </div>

                        
                        <LinearProgress variant="determinate" value={70} sx={{ marginTop:"20px"}}/>

                        </div>

                    </MetricDiv>
                </Grid>
                <Grid item xs={3}>
                <MetricDiv>
                        <MetricImageDiv>
                            <SvgIcon component={DirectionsBikeIcon} sx={{color:"#FFFFFF", height:"40px", width:"40px"}}/>
                        </MetricImageDiv>
                        <Text size={30} weight={700} align={"center"} sx={{paddingTop:"40px"}}>EmojiEmotionsIcon</Text>
                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>4 hangouts / Week</Text>
                        <div style={{marginTop:"10px", width:"80%", alignSelf:"center",}}>
                        
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>Progress</Text>
                        <Text size={18} weight={400} align={"center"} sx={{paddingTop:"5px"}}>70%</Text>

                        </div>

                        
                        <LinearProgress variant="determinate" value={70} sx={{ marginTop:"20px"}}/>

                        </div>

                    </MetricDiv>
                    
                </Grid>

            </Grid>

            
        </Grid>

    )
}

export default Home;