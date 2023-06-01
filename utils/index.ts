export const calculateSleepScore = (
  durationInBed: number,
  durationAsleep: number,
) => {
  // Account for cases where both values are 0
  if (durationAsleep === durationInBed) {
    return 100;
  }
  const score = (durationAsleep / durationInBed) * 100;

  // Round to nearest whole percent
  return Number(score.toFixed(0));
};
