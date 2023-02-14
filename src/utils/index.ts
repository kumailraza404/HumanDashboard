import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const WalletConnect = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
    97: "https://data-seed-prebsc-2-s1.binance.org:8545/",
    56: "https://bsc-dataseed.binance.org/",
    42: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    137: "https://polygon-rpc.com",
    80001: "https://rpc-mumbai.maticvigil.com/",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 10, 42, 31337, 42161, 137, 80001],
});

export const formatAddress = (address: string) => {
  return address.substring(0, 3) + "..." + address.slice(-3);
};

export function getByRange(pastDaysCount: number) {
  let end = new Date();
  end.setHours(23, 59, 59);
  if (pastDaysCount === 1) {
    let start = new Date();
    start.setHours(0, 0, 0);
    return {
      endTime: end.toISOString(),
      startTime: start.toISOString(),
    };
  }

  let start = new Date();
  start.setHours(0, 0, 0);
  start.setDate(end.getDate() - pastDaysCount);

  return {
    endTime: end.toISOString(),
    startTime: start.toISOString(),
  };
}
export function getTotalHoursOfSleep(dates: string[], data: any) {
  let normalizeData = new Array(dates.length).fill(0);

  data.session.forEach((segment: any) => {
    const segmentEndDate = new Date(parseInt(segment.endTimeMillis));
    let duration =
      (segment.endTimeMillis - segment.startTimeMillis) / (1000 * 60 * 60);

    const startDateString = segmentEndDate.toISOString().split("T")[0];
    const index = dates.indexOf(startDateString);

    normalizeData[index] =
      normalizeData[index] + parseFloat(duration.toFixed(2));
  });
  // console.log(dates, "dates");

  return normalizeData;
}

export function getDates(daysBefore: number) {
  var date = new Date();
  var dates = [];
  for (var i = 0; i < daysBefore; i++) {
    var newDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var dateString = newDate.toISOString().split("T")[0];
    dates.push(dateString);
  }
  return dates.reverse();
}

export function getTotalHoursOfActivities(dates: string[], data: any) {
  let normalizeData = {
    running: new Array(dates.length).fill(0),
    walking: new Array(dates.length).fill(0),
  };

  // console.log(data.session, "session.data");
  data.session.forEach((segment: any) => {
    const segmentEndDate = new Date(parseInt(segment.endTimeMillis));
    let duration =
      (segment.endTimeMillis - segment.startTimeMillis) / (1000 * 60 * 60);

    const startDateString = segmentEndDate.toISOString().split("T")[0];
    const index = dates.indexOf(startDateString);

    // console.log(segment.activityType, "Check type");

    if (segment.activityType == "7" || segment.activityType == "93") {
      normalizeData.walking[index] =
        normalizeData.walking[index] + parseFloat(duration.toFixed(2));
    }

    if (segment.activityType == "8" || segment.activityType == "58") {
      normalizeData.running[index] =
        normalizeData.running[index] + parseFloat(duration.toFixed(2));
    }
  });
  // console.log(dates, "dates");

  return normalizeData;
}

export const getBalanceOfEth = async (address: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.utils.formatEther(balance);
  return balanceInEth;
};
