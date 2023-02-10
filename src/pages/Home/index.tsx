import { useState, useMemo, useEffect } from "react";
import { Grid, SvgIcon } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import OverviewGraph from "../../components/OverviewGraph";
import DailyJogging from "../../components/DailyJogging";
import OverviewWork from "../../components/OverviewWork";
import DashboardMetricCard from "../../components/DashboardMetricCard";
import ReactApexChart from "react-apexcharts";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { getTotalWealth } from "../../services/wealthServices";
import { setTotalBalanceInUSD } from "../../store/slice/wealthSlice";

const Home = () => {
  const [sleephours, setSleepHours] = useState(0);
  const [happyHours, setHappyHours] = useState(0);
  const [dailyStepsForTheDay, setDailyStepsForTheDay] = useState(0);
  const { totalBalanceInUSD } = useSelector((state: RootState) => state.wealth);
  const dispatch = useDispatch();
  console.log(totalBalanceInUSD, "totalBalanceInUSD yeh bana abhi");

  const { account, active } = useWeb3React<Web3Provider>();

  const getTotalWealthOfUser = async () => {
    try {
      const response = await getTotalWealth(account || "");
      console.log("response getTotalWealthOfUser", response);
      dispatch(setTotalBalanceInUSD(response.data.total));
    } catch (e) {
      console.log("unable to get balance for user");
    }
  };

  useEffect(() => {
    if (active && totalBalanceInUSD == 0) {
      getTotalWealthOfUser();
    }
  }, [active, account]);

  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        columnSpacing={4}
        rowSpacing={4}
      >
        <Grid item md={8} xs={12}>
          <OverviewGraph setSleepHoursForToday={setSleepHours} />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          rowSpacing={4}
          columnSpacing={4}
        >
          <DailyJogging
            setDailyStepsForTheDay={setDailyStepsForTheDay}
            dailyStepsForTheDay={dailyStepsForTheDay}
          />
          <OverviewWork setHappyHours={setHappyHours} />
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        marginTop={12}
        columnSpacing={4}
        rowSpacing={8}
      >
        <Grid item xs={12} md={4}>
          <DashboardMetricCard
            heading="Sleepy Hours"
            subHeading={`${sleephours} hours`}
            icon={BedtimeIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardMetricCard
            heading="Total Assets"
            subHeading={`$` + `${totalBalanceInUSD}`}
            icon={AttachMoneyIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardMetricCard
            heading="Happy Hours"
            subHeading={`${happyHours}`}
            icon={EmojiEmotionsIcon}
          />
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        marginTop={12}
        columnSpacing={4}
      ></Grid>
    </Grid>
  );
};

export default Home;
