import { styled } from "@mui/system";
import { transform } from "typescript";

export const OverviewGraph = styled("div")(
    () => ({
      height:"400px",
      background:"#6a5daf",
      borderRadius:"20px"
    })
  );

export const OverviewSteps = styled("div")(
    () => ({
      height:"150px",
      background:"#6a5daf",
      borderRadius:"20px",
      width:"100%",
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around"
    })
);

export const OverviewWork = styled("div")(
    () => ({
      height:"200px",
      background:"#ec628e",
      borderRadius:"20px",
      width:"100%"

    })
);

export const OverviewWorkHeading = styled("div")(
    () => ({
      width:"100%",
      height:"60%",
      background:"#fd91b4",
      borderRadius:"20px",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center"
    })
);

export const OverviewWorkDetail = styled("div")(
    () => ({
    width:"100%",
      height:"40%",
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
    })
);


export const StepIconDiv = styled("div")(
    () => ({
        height:"70px", width:"125px", 
        background:"rgba(96.1,96.1,96.1,0.3)",
        borderRadius:"20px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    })
);


export const MetricDiv = styled("div")(
    () => ({
        background:"#FFFFFF", 
        height:"200px", 
        width:"100%", 
        borderRadius:"20px",
        position:"relative",
        display:"flex",
        flexDirection:"column"
    })
);

export const MetricImageDiv = styled("div")(
    () => ({
        background:"#6a5daf", 
        height:"80px", 
        width:"80px", 
        borderRadius:"20px",
        position:"absolute",
        top:"-40px",
        right:"50%",
        transform: "translate(50%,0)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    })
);


