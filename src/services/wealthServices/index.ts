import axios from "axios";

export const getWealthData = async (account: string) => {
  console.log("getting wealth");
  return await axios.get(
    `https://humandashboardserver-production.up.railway.app/?address=${account}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};

export const getTotalWealth = async (account: string) => {
  console.log("getting total wealth in USD");
  return await axios.get(
    `https://humandashboardserver-production.up.railway.app/checkTotalBalance/?address=${account}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};

export const getWealthDataForEth = async () => {
  return await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=weth&vs_currencies=usd&include_24hr_change=true",
  );
};
