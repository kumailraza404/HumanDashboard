import { styled } from "@mui/system";

export const HeaderStyled = styled("div")(
  () => ({
    width:"90vw",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    height:"fit-content",
    marginTop:"1%",
  })
);


export const ProfileCircle = styled("img")(
  () => ({
    height:"50px",
    width:"50px",
    borderRadius:"50%",
    marginLeft: "20px"
  })
);

