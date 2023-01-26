export function getWeekByRange() {
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  var end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  end.setDate(end.getDate() - 7);

  console.log(start.toISOString(), end.toISOString());

  return {
    endTime: start.toISOString(),
    startTime: end.toISOString(),
  };
}
