import { positions } from "@mui/system";
import { styled } from "@mui/system";

export const Drawer = styled("div")(
  () => ({
    // minHeight: "400px",
    width:"70px",
    borderRadius:"15px",
    backgroundColor:"#7164ba",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    padding:"50px 5px",
    height:"85vh",
    marginTop:"1%",
    position:"sticky",
    top:"1%"
  })
);