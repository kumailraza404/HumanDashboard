import moment from "moment";
import Axios from "../axiox";

export const getStepCountsForTheDay = async () => {
  const date = new Date();
  const start = moment(date).format("YYYY-MM-DD") + " 00:00:00";
  const end = moment(date).format("YYYY-MM-DD") + " 23:59:59";
  console.log(start, end, "start and end dates");

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
        },
      ],
      endTimeMillis: Date.parse(end),
      startTimeMillis: Date.parse(start),
    },
  );
};

// export const getStepCountsForTheWeek = async () => {
//   const date = new Date();
//   const start = new Date(date.setDate(1)).setHours(0, 0, 0);
//   const end = new Date(
//     date.setDate(date.getDate() + (7 - date.getDay())),
//   ).setHours(23, 59, 59);

//   return await Axios.post(
//     `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
//     {
//       aggregateBy: [
//         {
//           dataTypeName: "com.google.step_count.delta",
//         },
//       ],
//       endTimeMillis: end,
//       startTimeMillis: start,
//     },
//   );
// };

// export const getStepCountsForTheMonth = async () => {
//   const date = new Date();
//   const start = new Date(
//     date.setDate(date.getDate() - date.getUTCDay()),
//   ).setHours(0, 0, 0);
//   const end = new Date(
//     date.setDate(date.getDate() + (8 - date.getDate())),
//   ).setHours(23, 59, 59);

//   return await Axios.post(
//     `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
//     {
//       aggregateBy: [
//         {
//           dataTypeName: "com.google.step_count.delta",
//         },
//       ],
//       endTimeMillis: end,
//       startTimeMillis: start,
//     },
//   );
// };
