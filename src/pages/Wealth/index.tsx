import { Box, Grid, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import { formatAddress, injected } from "../../utils/index";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Button, Text } from "../../styles";
import { getWealthData } from "../../services/wealthServices";
import DashboardMetricCard from "../../components/DashboardMetricCard";
import {
  MetricDiv,
  MetricImageDiv,
} from "../../components/DashboardMetricCard/styles";
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

  const formatResult = (res: any) => {
    if (res.data.length > 0) {
      setTokenList(res.data);
      const sum = res.data.reduce(
        (total: number, current: any) => total + current.usdPriceCurrent,
        0,
      );
      setTotalAssetinUSD(sum.toFixed(2));
    }

    // if (res.length > 0) {
    //   setTokenList(res);
    //   const sum = res.reduce(
    //     (total: number, current: any) => total + current.usdPriceCurrent,
    //     0,
    //   );
    //   setTotalAssetinUSD(sum.toFixed(2));
    // }
  };

  const getWealth = async () => {
    const res = await getWealthData(account || "");
    console.log(res, "res from wealth");
    if (res.data == "Address not found") {
      console.log("error");
    } else formatResult(res);
  };

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
            subHeading={`Your current asset holding is estimated to be ${totalAssetinUSD}$`}
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

interface IAssetCard {
  heading: string;
  percentageChange: number;
  currentPrice: number;
  icon: string;
}

const AssetCard = ({
  heading,
  percentageChange,
  currentPrice,
  icon,
}: IAssetCard) => {
  return (
    <MetricDiv>
      <MetricImageDiv>
        <img src={icon} style={{ height: "40px", width: "40px" }} />

        <Text
          size={30}
          weight={700}
          align={"center"}
          sx={{ paddingTop: "40px" }}
        >
          {heading}
        </Text>
        <Grid container>
          <Text
            size={30}
            weight={700}
            align={"center"}
            sx={{ paddingTop: "40px" }}
          >
            {currentPrice}
          </Text>

          <Text
            size={30}
            weight={700}
            align={"center"}
            sx={{ paddingTop: "40px" }}
          >
            {percentageChange}
          </Text>
        </Grid>
      </MetricImageDiv>
    </MetricDiv>
  );
};
