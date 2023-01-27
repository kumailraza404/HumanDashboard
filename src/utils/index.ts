export function getByRange(pastDaysCount: number) {
  let end = new Date();
  end.setHours(23, 59, 59);
  if (pastDaysCount === 1) {
    let start = new Date();
    start.setHours(0, 0, 0);
    return {
      endTime: end.toISOString(),
      startTime: start.toISOString(),
    };
  }

  let start = new Date();
  start.setHours(0, 0, 0);
  start.setDate(end.getDate() - pastDaysCount);

  return {
    endTime: end.toISOString(),
    startTime: start.toISOString(),
  };
}
export function getTotalHoursOfSleep(dates: string[], data: any) {
  let normalizeData = new Array(dates.length).fill(0);

  data.session.forEach((segment: any) => {
    const segmentStartDate = new Date(parseInt(segment.startTimeMillis));
    let duration =
      (segment.endTimeMillis - segment.startTimeMillis) / (1000 * 60 * 60);
    const startDateString = segmentStartDate.toISOString().split("T")[0];
    const index = dates.indexOf(startDateString);

    normalizeData[index] =
      normalizeData[index] + parseFloat(duration.toFixed(2));
  });
  // console.log(dates, "dates");

  return normalizeData;
}

export function getDates(daysBefore: number) {
  var date = new Date();
  var dates = [];
  for (var i = 0; i < daysBefore; i++) {
    var newDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var dateString = newDate.toISOString().split("T")[0];
    dates.push(dateString);
  }
  return dates.reverse();
}
