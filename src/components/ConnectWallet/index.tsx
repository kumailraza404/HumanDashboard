import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useMediaQuery, useTheme } from "@mui/material";
import { formatAddress, injected, WalletConnect } from "../../utils";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { ConnectWalletContainer } from "../../theme/Header/styles";
import { Button } from "../../styles";

const ConnectWallet = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { account, activate, deactivate, setError, active } =
    useWeb3React<Web3Provider>();

  const onClickConnect = () => {
    activate(
      isMobileScreen ? WalletConnect : injected,
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
    <ConnectWalletContainer>
      {active && typeof account === "string" ? (
        <Button onClick={onClickDisconnect}>{formatAddress(account)}</Button>
      ) : (
        <Button onClick={onClickConnect}>Connect Wallet</Button>
      )}
    </ConnectWalletContainer>
  );
};

export default ConnectWallet;
