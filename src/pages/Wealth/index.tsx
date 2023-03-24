import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import { Button, Text } from "../../styles";
import { getWealthData } from "../../services/wealthServices";
import DashboardMetricCard from "../../components/DashboardMetricCard";
import { useMediaQuery, useTheme } from "@mui/material";

import BasicTable from "./table";
import { injected, WalletConnect } from "../../utils";
import { UserRejectedRequestError } from "@web3-react/injected-connector";

export interface TokenDetails {
  token_address: string;
  name: string;
  symbol: string;
  logo?: null;
  thumbnail?: null;
  decimals: number;
  balance: string;
  changeIn24h: number;
  usdPriceCurrent: number;
  usdPricePast: number;
}

const Wealth = () => {
  const [tokenList, setTokenList] = useState<TokenDetails[]>([]);
  const [totalAssetinUSD, setTotalAssetinUSD] = useState(0);
  const [loading, setLoading] = useState(false);

  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();

  const formatResult = async (res: any) => {
    console.log(res.data, "Check res.data from format api call");
    if (res.data.length > 0) {
      let result = res.data;
      setTokenList(result);
    }
  };

  const getWealth = async () => {
    setLoading(true);
    const res = await getWealthData(account || "");
    if (res.data != "Address not found" || res.data.length > 0) {
      formatResult(res);
    }

    setLoading(false);
  };

  const calculateSum = () => {
    const sum = tokenList.reduce(
      (total: number, current) => total + current.usdPriceCurrent,
      0,
    );
    setTotalAssetinUSD(sum);
  };

  const switchNetwork = async () => {
    try {
      if (library)
        // @ts-ignore
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + (1).toString(16) }],
        });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      console.log(switchError, "error on switching network");
    }
  };

  useEffect(() => {
    calculateSum();
  }, [tokenList]);

  useEffect(() => {
    if (active) {
      getWealth();
    }
  }, [active, account]);

  if (!active) return <ConnectWallet />;
  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        columnSpacing={4}
        alignItems={"center"}
        justifyContent={"center"}
        marginBottom={12}
      >
        <Grid item xs={12} md={4} display={"flex"} alignSelf={"center"}>
          <DashboardMetricCard
            heading="Wealth"
            subHeading={
              loading
                ? `Your current asset holding is estimated to be ...`
                : `Your current asset holding is estimated to be ${totalAssetinUSD.toFixed(
                    4,
                  )}$`
            }
            icon={CurrencyExchangeIcon}
          />
        </Grid>
      </Grid>
      {loading ? (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container>
          {tokenList.length && <BasicTable tokenList={tokenList} />}
        </Grid>
      )}
    </Grid>
  );
};

export default Wealth;

const ConnectWallet = () => {
  const { chainId, account, activate, setError, active, library, connector } =
    useWeb3React<Web3Provider>();

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
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

interface IAssetCard {
  heading: string;
  percentageChange: number;
  currentPrice: number;
  icon: string;
}
