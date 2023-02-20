import React, { useEffect } from "react";
import { Button, Text } from "../../styles";
import { useGoogleLogin } from "@react-oauth/google";
import {
  ConnectWalletContainer,
  HeaderButtons,
  HeaderChild,
  HeaderChild2,
  HeaderStyled,
  ProfileCircle,
} from "./styles";
import Axios from "../../services/axiox";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setIsSignedIn,
  setName,
  setPicture,
} from "../../store/slice/userSlice";
import { RootState } from "../../store/reducer";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatAddress, injected, WalletConnect } from "../../utils/index";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import TemporaryDrawer from "../Drawer";
import { useMediaQuery, useTheme } from "@mui/material";
import ConnectWallet from "../../components/ConnectWallet";

export default function Header() {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isSignedIn, email, name, picture } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/fitness.nutrition.read",
    "https://www.googleapis.com/auth/fitness.location.read",
  ];

  const scopeString = scopes.join(" ");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        localStorage.setItem(
          "token",
          JSON.stringify(tokenResponse.access_token),
        );
        const userInfo = await Axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
        );
        dispatch(setName(userInfo.name));
        dispatch(setEmail(userInfo.email));
        dispatch(setPicture(userInfo.picture));
        dispatch(setIsSignedIn(true));
      } catch (e) {
        console.log(e);
      }
    },
    scope: scopeString,
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <HeaderStyled container>
      <Text size={40} weight={700}>
        Fit flor
      </Text>

      {isSignedIn ? (
        <ProfileCircle src={picture} referrerPolicy="no-referrer" />
      ) : (
        <Button onClick={() => login()}>Sign In</Button>
      )}
    </HeaderStyled>
  );
}
