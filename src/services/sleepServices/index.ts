import moment from "moment";

import Axios from "../axiox";
import { getByRange } from "../../utils";

export const getSleepDataByRange = async () => {
  const { startTime, endTime } = getByRange(7);

  // console.log(startTime, endTime, "start and end Time");

  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}&activityType=72`,
  );
};

export const getMonthlySleepData = async () => {
  console.log("monthly called");
  var date = new Date();
  var firstDay = new Date(
    new Date(date.getFullYear(), date.getMonth(), 2).setHours(0, 0, 0),
  );
  var lastDay = new Date(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59),
  );
  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${firstDay.toISOString()}&endTime=${lastDay.toISOString()}&activityType=72`,
  );
};

export const getWeeklySleepData = async () => {
  var firstDay = new Date(moment().startOf("week").toDate().setHours(0, 0, 0));
  var lastDay = new Date(moment().endOf("week").toDate().setHours(23, 59, 59));

  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${firstDay.toISOString()}&endTime=${lastDay.toISOString()}&activityType=72`,
  );
};

export const getTodaysSleepSegements = async () => {
  const date = new Date();
  const startDate = date.setHours(0, 0, 0);
  const endDate = date.setHours(23, 59, 59);

  return await Axios.post(
    "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.sleep.segment",
        },
      ],
      endTimeMillis: endDate,
      startTimeMillis: startDate,
    },
  );
};
