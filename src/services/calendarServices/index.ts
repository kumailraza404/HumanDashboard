import { getByRange } from "../../utils";
import Axios from "../axiox";

export const getCalendarData = async () => {
  // const { startTime, endTime } = getByRange(30);

  // console.log(startTime, endTime, "start and end Time");
  const startToday = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
  const endToday = new Date(
    new Date().setUTCHours(23, 59, 59, 999),
  ).toISOString();

  return await Axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startToday}&timeMax=${endToday}`,
  );
};
