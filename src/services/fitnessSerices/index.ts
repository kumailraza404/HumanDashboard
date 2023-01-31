import moment from "moment";
import { getByRange } from "../../utils";
import Axios from "../axiox";

export const getCaloriesExpendedForTheDay = async () => {
  const date = new Date();
  const start = moment(date).format("YYYY-MM-DD") + " 00:00:00";
  const end = moment(date).format("YYYY-MM-DD") + " 23:59:59";

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.calories.expended",
        },
      ],
      endTimeMillis: Date.parse(end),
      startTimeMillis: Date.parse(start),
    },
  );
};

export const getDistanceCoveredForTheDay = async () => {
  const date = new Date();
  const start = moment(date).format("YYYY-MM-DD") + " 00:00:00";
  const end = moment(date).format("YYYY-MM-DD") + " 23:59:59";

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.distance.delta",
        },
      ],
      endTimeMillis: Date.parse(end),
      startTimeMillis: Date.parse(start),
    },
  );
};

export const getHydrationForTheDay = async () => {
  const date = new Date();
  const start = moment(date).format("YYYY-MM-DD") + " 00:00:00";
  const end = moment(date).format("YYYY-MM-DD") + " 23:59:59";

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.distance.delta",
        },
      ],
      endTimeMillis: Date.parse(end),
      startTimeMillis: Date.parse(start),
    },
  );
};

export const getSleepDataByRange = async () => {
  const { startTime, endTime } = getByRange(30);

  // console.log(startTime, endTime, "start and end Time");

  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}&activityType=72`,
  );
};

export const getMonthlyActivityData = async () => {
  console.log("monthly called");
  var date = new Date();
  var firstDay = new Date(
    new Date(date.getFullYear(), date.getMonth(), 2).setHours(0, 0, 0),
  );
  var lastDay = new Date(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59),
  );
  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${firstDay.toISOString()}&endTime=${lastDay.toISOString()}`,
  );
};

export const getWeeklyActivityData = async () => {
  const { startTime, endTime } = getByRange(7);

  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}`,
  );
};

// const sum = result?.bucket[0]?.dataset[0]?.point?.reduce(
//   (total, current) => {
//     return total + parseFloat(current.value[0].fpVal);
//   },
//   0,
// );
