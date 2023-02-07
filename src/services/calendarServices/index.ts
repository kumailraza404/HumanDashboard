import { getByRange } from "../../utils";
import Axios from "../axiox";

export const getCalendarData = async () => {
  const { startTime, endTime } = getByRange(30);

  // console.log(startTime, endTime, "start and end Time");
  console.log(startTime, endTime, "check start and end time");

  return await Axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startTime}&timeMax=${endTime}`,
  );
};
