export function setTimeInDate(date: Date, time: string) {
  const dateClone = new Date(date.getTime());

  const [hours, minutes] = time.split(':');

  dateClone.setHours(Number(hours));
  dateClone.setMinutes(Number(minutes));

  return dateClone;
}
