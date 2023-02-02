import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { formatAddress, injected } from "../../utils/index";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Button, Text } from "../../styles";

const Wealth = () => {
  const [category, setCategory] = useState<string>("work");

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

  useEffect(() => {}, []);

  if (!active) return <ConnectWallet />;
  return (
    <Grid>
      <Grid container display={"flex"} columnSpacing={4}>
        <Grid item xs={12} display={"flex"}>
          Wealth
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Wealth;

const ConnectWallet = () => {
  const { chainId, account, activate, setError, active, library, connector } =
    useWeb3React<Web3Provider>();

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

  useEffect(() => {
    console.log(chainId, account, active, library, connector);
  });

  return (
    <Grid
      container
      sx={{ height: "70vh" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Button onClick={onClickConnect}>Connect Wallet</Button>
      <Text sx={{ marginTop: "20px" }} size={20} weight={600}>
        Connect your account to continue
      </Text>
    </Grid>
  );
};
