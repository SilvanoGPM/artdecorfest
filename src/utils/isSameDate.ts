import { isSameDay, isSameMonth, isSameYear } from 'date-fns';

export function isSameDate(leftDate: Date, rightDate: Date) {
  return (
    isSameDay(leftDate, rightDate) &&
    isSameMonth(leftDate, rightDate) &&
    isSameYear(leftDate, rightDate)
  );
}
