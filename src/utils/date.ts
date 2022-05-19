export const currentDayName = () => {
  const date = new Date();
  const day = date.toLocaleString('en-us', { weekday: 'long' });
  return day;
};

export const lastDaysDate = (days: number) => {
  const daysDate = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    daysDate.push(date.toISOString().split('T')[0]);
  }

  return daysDate;
};
