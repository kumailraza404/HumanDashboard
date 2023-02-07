import { Box, Grid, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import { getBalanceOfEth, injected } from "../../utils/index";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Button, Text } from "../../styles";
import {
  getWealthData,
  getWealthDataForEth,
} from "../../services/wealthServices";
import DashboardMetricCard from "../../components/DashboardMetricCard";

import BasicTable from "./table";

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

  const { chainId, account, activate, deactivate, setError, active } =
    useWeb3React<Web3Provider>();

  const formatResult = async (res: any) => {
    console.log(res.data, "Check res.data from format result");
    if (res.data.length > 0) {
      let result = res.data;
      const ethData = await getResultForEth();
      console.log(ethData, "check eth data");
      if (parseFloat(ethData.balance) > 0) result.push(ethData);
      setTokenList(result);
    }
  };

  const getResultForEth = async (): Promise<TokenDetails> => {
    const ethBalance = await getBalanceOfEth(account || "");
    const response = await getWealthDataForEth();
    console.log(response, "check response getWealthDataForEth");

    let obj: TokenDetails = {
      token_address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      name: "Ethereum",
      symbol: "Eth",
      decimals: 18,
      balance: ethBalance,
      changeIn24h: response.data.weth.usd_24h_change,
      usdPriceCurrent: response.data.weth.usd * parseFloat(ethBalance),
      usdPricePast: 0,
    };
    return obj;
  };

  const getWealth = async () => {
    const res = await getWealthData(account || "");
    if (res.data == "Address not found") {
      const ethData = await getResultForEth();
      console.log(ethData, "check eth data");
      if (parseFloat(ethData.balance) > 0) setTokenList([ethData]);
    } else formatResult(res);
    // await getResultForEth();
  };

  const calculateSum = () => {
    const sum = tokenList.reduce(
      (total: number, current) => total + current.usdPriceCurrent,
      0,
    );
    setTotalAssetinUSD(sum);
  };

  useEffect(() => {
    calculateSum();
  }, [tokenList]);

  useEffect(() => {
    if (active) {
      getWealth();
    }
  }, [active]);

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
        <Grid item xs={4} display={"flex"} alignSelf={"center"}>
          <DashboardMetricCard
            heading="Wealth"
            subHeading={`Your current asset holding is estimated to be ${totalAssetinUSD.toFixed(
              4,
            )}$`}
            icon={CurrencyExchangeIcon}
          />
        </Grid>
      </Grid>

      <Grid container>
        {tokenList.length && <BasicTable tokenList={tokenList} />}
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
