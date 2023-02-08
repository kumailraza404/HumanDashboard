import { Grid, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import { getCalendarData } from "../../services/calendarServices";
import GaugeChart from "react-gauge-chart";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { MetricDiv, MetricImageDiv } from "./styles";
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
  const { isSignedIn } = useSelector((state: RootState) => state.user);

  const [workData, setWorkData] = useState<IEvent[]>([]);
  const [happinessData, setHappinessData] = useState<IEvent[]>([]);
  const [happinessHours, setHappinessHours] = useState(0);
  const [workHours, setWorkHours] = useState(0);
  const [workHoursinPercent, setWorkHoursinPercent] = useState(0);
  const [happinessHoursinPercent, setHappinessHoursinPercent] = useState(0);

  console.log(
    workData,
    "space",
    happinessData,
    "space",
    happinessHours,
    workHours,
    workHoursinPercent,
    "in percent",
  );

  const formatResult = (res: ResponseEvent[]) => {
    let tempWork: IEvent[] = [];
    let tempHappiness: IEvent[] = [];
    res.map((event: any) => {
      let obj: IEvent = { name: "", duration: 0 };
      if (
        event.summary.includes("happy") ||
        event.summary.includes("hangout") ||
        event.summary.includes("friend") ||
        event.summary.includes("Hanging") ||
        event.summary.includes("dinner") ||
        event.summary.includes("lunch") ||
        event.summary.includes("breakfast") ||
        event.summary.includes("outing") ||
        event.summary.includes("picnic")
      ) {
        obj.name = event.summary;
        obj.duration =
          (new Date(event.end.dateTime).valueOf() -
            new Date(event.start.dateTime).valueOf()) /
          (1000 * 60 * 60);
        tempHappiness.push(obj);
      } else {
        obj.name = event.summary;
        obj.duration =
          (new Date(event.end.dateTime).valueOf() -
            new Date(event.start.dateTime).valueOf()) /
          (1000 * 60 * 60);
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

  useEffect(() => {
    if (workHours <= 8) {
      const temp = (workHours / 8 / 20) * 10;
      setWorkHoursinPercent(temp);
    } else if (workHours > 8 && workHours <= 12) {
      const temp = (workHours / 12 / 12.5) * 10;
      setWorkHoursinPercent(temp);
    } else {
      setWorkHoursinPercent(1);
    }
  }, [workHours]);

  useEffect(() => {
    if (happinessHours <= 8) {
      const temp = (happinessHours / 8 / 20) * 10;
      setHappinessHoursinPercent(temp);
    } else if (happinessHours > 8 && happinessHours <= 12) {
      const temp = (happinessHours / 12 / 12.5) * 10;
      setHappinessHoursinPercent(temp);
    } else {
      setHappinessHoursinPercent(1);
    }
  }, [happinessHours]);

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
    if (isSignedIn) getCalendarDataForMonth();
  }, []);

  return (
    <Grid>
      <Grid container display={"flex"} columnSpacing={4}>
        <Grid item xs={6} display={"flex"} justifyContent={"center"}>
          <MetricDiv>
            <MetricImageDiv>
              <SvgIcon
                component={WorkIcon}
                sx={{ color: "#FFFFFF", height: "40px", width: "40px" }}
              />
            </MetricImageDiv>
            <Text
              size={30}
              weight={700}
              align={"center"}
              sx={{ paddingTop: "40px" }}
            >
              Work Hours
            </Text>
            <Text
              size={18}
              weight={400}
              align={"center"}
              sx={{ paddingTop: "10px" }}
            >
              {Number(workHours).toFixed(2)} hour(s) spent working today
            </Text>
            <Grid>
              <GaugeChart
                id="gauge-chart1"
                nrOfLevels={3}
                arcsLength={[0.5, 0.3, 0.2]}
                percent={workHoursinPercent}
                hideText
                // needleColor={"#7164ba"}
                // needleBaseColor={"#7164ba"}

                style={{
                  height: 100,
                  width: 250,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              />
            </Grid>
          </MetricDiv>
        </Grid>

        <Grid item xs={6} display={"flex"} justifyContent={"center"}>
          <MetricDiv>
            <MetricImageDiv>
              <SvgIcon
                component={EmojiEmotionsIcon}
                sx={{ color: "#FFFFFF", height: "40px", width: "40px" }}
              />
            </MetricImageDiv>
            <Text
              size={30}
              weight={700}
              align={"center"}
              sx={{ paddingTop: "40px" }}
            >
              Happy Hours
            </Text>
            <Text
              size={18}
              weight={400}
              align={"center"}
              sx={{ paddingTop: "10px" }}
            >
              {Number(happinessHours).toFixed(2)} hour(s) spent being happy
              today
            </Text>
            <Grid>
              <GaugeChart
                id="gauge-chart1"
                nrOfLevels={3}
                percent={happinessHoursinPercent}
                hideText
                arcsLength={[0.5, 0.3, 0.2]}
                style={{
                  height: 100,
                  width: 250,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              />
            </Grid>
          </MetricDiv>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorkLife;
