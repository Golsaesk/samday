export function convertDateToString(currentDate = new Date(), dateSeparator = '-') {
  return currentDate.getFullYear() + dateSeparator
      + (currentDate.getMonth() + 1) + dateSeparator
      + currentDate.getDate() + ' '
      + currentDate.getHours() + ':'
      + currentDate.getMinutes() + ':'
      + currentDate.getSeconds();
}

export function convertStringToDate(date: string, dateSeparator = '-') {
  if (date) {
    const currentDate = new Date(date);
    return currentDate.getFullYear() + dateSeparator
        + (currentDate.getMonth() + 1) + dateSeparator
        + currentDate.getDate() + '  '
        + currentDate.getHours() + ':'
        + currentDate.getMinutes() + ':'
        + currentDate.getSeconds();
  }
  return '';
}

export function addMinutes(date: any, minutes: number) {
  const d = new Date(date);
  d.setMinutes(date.getMinutes() + minutes);
  return d;
}