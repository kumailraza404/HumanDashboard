export function getByRange(pastDaysCount: number) {
  var start = new Date();

  var end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  end.setDate(end.getDate() - pastDaysCount);

  return {
    endTime: start.toISOString(),
    startTime: end.toISOString(),
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
