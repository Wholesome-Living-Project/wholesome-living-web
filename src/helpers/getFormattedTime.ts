// @ts-ignore
export const getFormattedTime = (seconds: number) => {
  if (seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  if (minutes === 0) {
    return `${seconds} sec`;
  } else if (seconds === 0) {
    return `${minutes} min`;
  } else {
    return `${minutes} min ${seconds} sec`;
  }
};
