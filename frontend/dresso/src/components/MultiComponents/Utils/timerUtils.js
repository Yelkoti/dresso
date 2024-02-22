export const getDaysDifference = (time) => {
  const usedDate = new Date(time);
  const curDate = new Date(Date.now());
  const daysDifference = Math.floor(
    Math.abs(curDate - usedDate) / (1000 * 60 * 60 * 24)
  );
  return daysDifference;
};
