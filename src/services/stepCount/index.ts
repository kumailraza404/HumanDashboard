import Axios from "../axiox";

export const getStepCountsForTheDay = async () => {
  const date = new Date();
  const start = date.setHours(0, 0, 0);
  const end = date.setHours(23, 59, 59);

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
        },
      ],
      endTimeMillis: end,
      startTimeMillis: start,
    },
  );
};

export const getStepCountsForTheWeek = async () => {
  const date = new Date();
  const start = new Date(date.setDate(1)).setHours(0, 0, 0);
  const end = new Date(
    date.setDate(date.getDate() + (7 - date.getDay())),
  ).setHours(23, 59, 59);

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
        },
      ],
      endTimeMillis: end,
      startTimeMillis: start,
    },
  );
};

export const getStepCountsForTheMonth = async () => {
  const date = new Date();
  const start = new Date(
    date.setDate(date.getDate() - date.getUTCDay()),
  ).setHours(0, 0, 0);
  const end = new Date(
    date.setDate(date.getDate() + (8 - date.getDate())),
  ).setHours(23, 59, 59);

  return await Axios.post(
    `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
    {
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
        },
      ],
      endTimeMillis: end,
      startTimeMillis: start,
    },
  );
};
