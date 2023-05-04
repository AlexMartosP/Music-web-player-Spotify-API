function formatTime(timeToFormat: number, ms: boolean = false) {
  let secondsToFormat = ms ? timeToFormat / 1000 : timeToFormat;

  // Get minutes
  const minutes = Math.floor(secondsToFormat / 60);
  // Get seconds remaining after minutes got calculated
  const seconds = Math.floor(secondsToFormat % 60);
  const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formatedMinutes}:${formatedSeconds}`;
}

export default formatTime;
