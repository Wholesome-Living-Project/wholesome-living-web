export const getLast7Days = () => {
  let dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};
