export function getTotalHoursOfSleep(dates: string[], data: any) {
  let normalizeData = new Array(dates.length).fill(0);

  data.session.forEach((segment: any) => {
    const segmentStartDate = new Date(parseInt(segment.startTimeMillis));
    let duration =
      (segment.endTimeMillis - segment.startTimeMillis) / (1000 * 60 * 60);
    const startDateString = segmentStartDate.toISOString().split("T")[0];
    const index = dates.indexOf(startDateString);

    console.log(index, startDateString, duration, "duration");

    normalizeData[index] = normalizeData[index] + duration;
  });
  console.log(dates, "dates");

  return normalizeData;
}

export function getDates(daysBefore: number) {
  var date = new Date(1674604800000);
  var dates = [];
  for (var i = 0; i < daysBefore; i++) {
    var newDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
    var dateString = newDate.toISOString().split("T")[0];
    dates.push(dateString);
  }
  return dates.reverse();
}
