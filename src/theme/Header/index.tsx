import React from "react";
import { Button, Text } from "../../styles";
import { useGoogleLogin } from '@react-oauth/google';
import { HeaderStyled, ProfileCircle } from "./styles";
import Axios from "../../services/axiox";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setIsSignedIn, setName, setPicture } from "../../store/slice/userSlice";
import { RootState } from "../../store/reducer";



export default function Header() {


  const {isSignedIn , email, name, picture} = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.activity.write",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.settings.readonly",
    "https://www.googleapis.com/auth/calendar",
    ]

  const scopeString = scopes.join(' ')

  
  const login = useGoogleLogin({
    onSuccess:  async (tokenResponse) => {
      try{
        localStorage.setItem('token', JSON.stringify(tokenResponse.access_token))
        const userInfo = await Axios.get('https://www.googleapis.com/oauth2/v3/userinfo');
        dispatch(setName(userInfo.name))
        dispatch(setEmail(userInfo.email))
        dispatch(setPicture(userInfo.picture))
        dispatch(setIsSignedIn(true))
      }
      catch(e){
        console.log(e)
      }
    },
    scope: scopeString,
    onError: errorResponse => console.log(errorResponse),
  });

  


  return (
    <HeaderStyled>
      <Text size={38} weight={700} >
        Human Dashboard
      </Text>

      
      <div style={{ display: "flex", height: "100%" }}>
        <Button>Connect Wallet</Button>

        {
          isSignedIn ? 
          <ProfileCircle src={"https://lh3.googleusercontent.com/a/AEdFTp7iyw3Os_fl6zhT3otdH8P-ZJzwBSEqGHE3TTAV=s96-c"}/>
          :
          <Button sx={{ marginLeft: "20px" }} onClick={() => login()}>Sign In</Button>
        }
      </div>
    </HeaderStyled>
  );
}
