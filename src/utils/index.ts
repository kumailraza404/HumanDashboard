export function getWeekByRange() {
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  var end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  end.setDate(end.getDate() - 7);

  return {
    endTime: start.toISOString(),
    startTime: end.toISOString(),
  };
}
