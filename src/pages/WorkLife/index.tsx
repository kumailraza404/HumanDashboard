import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getCalendarData } from "../../services/calendarServices";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Text } from "../../styles";

interface IEvent {
  name: string;
  duration: number;
}

interface ResponseEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: {
    email: string;
  };
  organizer: {
    email: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  attendees: [
    {
      email: string;
      organizer: boolean;
      responseStatus: string;
    },
    {
      email: string;
      self: boolean;
      responseStatus: string;
    },
  ];
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
      },
      {
        entryPointType: string;
        uri: string;
        pin: string;
      },
      {
        regionCode: string;
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
      },
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
  };
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}

const WorkLife = () => {
  const [workData, setWorkData] = useState<IEvent[]>([]);
  const [happinessData, setHappinessData] = useState<IEvent[]>([]);
  const [happinessHours, setHappinessHours] = useState(0);
  const [workHours, setWorkHours] = useState(0);

  console.log(
    workData,
    "space",
    happinessData,
    "space",
    happinessHours,
    workHours,
  );

  const formatResult = (res: ResponseEvent[]) => {
    let tempWork: IEvent[] = [];
    let tempHappiness: IEvent[] = [];
    res.map((event: any) => {
      let obj: IEvent = { name: "", duration: 0 };
      if (
        event.summary.includes("happy") ||
        event.summary.includes("hangout")
      ) {
        obj.name = event.summary;
        obj.duration =
          (new Date(event.end.dateTime).valueOf() -
            new Date(event.start.dateTime).valueOf()) /
          60000;
        tempHappiness.push(obj);
      } else {
        obj.name = event.summary;
        obj.duration =
          (new Date(event.end.dateTime).valueOf() -
            new Date(event.start.dateTime).valueOf()) /
          60000;
        tempWork.push(obj);
      }
    });
    setWorkData(tempWork);
    setHappinessData(tempHappiness);
  };

  const getCalendarDataForMonth = async () => {
    const res = await getCalendarData();
    console.log(res, "Check resss");
    if (res.items.length) formatResult(res.items as ResponseEvent[]);
  };

  const arr = new Array(7).fill(1);

  useEffect(() => {
    const sumForHappiness = happinessData.reduce(
      (total, current) => total + current.duration,
      0,
    );
    const sumForWork = workData.reduce(
      (total, current) => total + current.duration,
      0,
    );

    setHappinessHours(sumForHappiness);
    setWorkHours(sumForWork);
  }, [workData, happinessData]);

  useEffect(() => {
    getCalendarDataForMonth();
  }, []);

  return (
    <Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        columnSpacing={4}
      >
        <Grid item xs={12} display={"flex"} justifyContent={"center"}></Grid>
        {/* <Grid
          xs={12}
          sx={{
            border: "1px solid green",
          }}
          container
          columnSpacing={4}
        >
          {arr.map((e) => {
            return (
              <Grid
                xs={4}
                sx={{ border: "1px solid red", height: "200px", width: "100%" }}
              ></Grid>
            );
          })}
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default WorkLife;
