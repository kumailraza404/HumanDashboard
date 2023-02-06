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
