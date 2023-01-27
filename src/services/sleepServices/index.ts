import { getByRange } from "../../utils";
import Axios from "../axiox";

export const getSleepDataByRange = async () => {
  const { startTime, endTime } = getByRange(1);

  // console.log(startTime, endTime, "start and end Time");

  return await Axios.get(
    `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}&activityType=72`,
  );
};
