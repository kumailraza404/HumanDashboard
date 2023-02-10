import React, { useEffect } from "react";
import { Button, Text } from "../../styles";
import { useGoogleLogin } from "@react-oauth/google";
import { HeaderStyled, ProfileCircle } from "./styles";
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
import { formatAddress, injected } from "../../utils/index";
import { UserRejectedRequestError } from "@web3-react/injected-connector";

export default function Header() {
  const { isSignedIn, email, name, picture } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.settings.readonly",
    "https://www.googleapis.com/auth/calendar",
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
    <HeaderStyled>
      <Text size={20} weight={700}>
        Human Dashboard
      </Text>

      <div style={{ display: "flex", height: "100%" }}>
        <ConnectWallet />

        {isSignedIn ? (
          <ProfileCircle src={picture} referrerPolicy="no-referrer" />
        ) : (
          <Button sx={{ marginLeft: "20px" }} onClick={() => login()}>
            Sign In
          </Button>
        )}
      </div>
    </HeaderStyled>
  );
}

const ConnectWallet = () => {
  const {
    chainId,
    account,
    activate,
    deactivate,
    setError,
    active,
    library,
    connector,
  } = useWeb3React<Web3Provider>();

  const onClickConnect = () => {
    activate(
      injected,
      (error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log("user refused");
        } else {
          setError(error);
        }
      },
      false,
    );
  };

  const onClickDisconnect = () => {
    deactivate();
  };

  return (
    <div>
      {active && typeof account === "string" ? (
        <Button onClick={onClickDisconnect}>{formatAddress(account)}</Button>
      ) : (
        <Button onClick={onClickConnect}>Connect Wallet</Button>
      )}
    </div>
  );
};
