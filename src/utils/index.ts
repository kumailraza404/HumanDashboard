import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 10, 42, 31337, 42161],
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
    biking: new Array(dates.length).fill(0),
    running: new Array(dates.length).fill(0),
    swimming: new Array(dates.length).fill(0),
  };

  // console.log(data.session, "session.data");
  data.session.forEach((segment: any) => {
    const segmentEndDate = new Date(parseInt(segment.endTimeMillis));
    let duration =
      (segment.endTimeMillis - segment.startTimeMillis) / (1000 * 60 * 60);

    const startDateString = segmentEndDate.toISOString().split("T")[0];
    const index = dates.indexOf(startDateString);

    // console.log(segment.activityType, "Check type");

    if (segment.activityType == "1") {
      normalizeData.biking[index] =
        normalizeData.biking[index] + parseFloat(duration.toFixed(2));
    }

    if (segment.activityType == "35") {
      normalizeData.running[index] =
        normalizeData.running[index] + parseFloat(duration.toFixed(2));
    }
    if (segment.activityType == "100") {
      normalizeData.swimming[index] =
        normalizeData.swimming[index] + parseFloat(duration.toFixed(2));
    }
  });
  // console.log(dates, "dates");

  return normalizeData;
}
