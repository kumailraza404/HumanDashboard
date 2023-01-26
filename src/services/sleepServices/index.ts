import Axios from "../axiox";

export const getSleepDataByRange = async (dateRange: string[]) => {
  const startTime = new Date(dateRange[0]).toISOString();
  const endTime = new Date(dateRange[dateRange.length - 1]).toISOString();

  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}&activityType=72`,
  );
};
