import { onSnapshot, QuerySnapshot } from 'firebase/firestore';

import { getAll, mapValue, streamAny } from './core';
import { createCollection } from './firebase';

export interface Event {
  id: string;
  title: string;
  date: { seconds: number };
  start: string;
  end: string;
}

export const eventsCollection = createCollection<Event>('events');

export function getAllEvents() {
  return getAll<Event>(eventsCollection);
}

export function streamEvents(
  callback: (events: Event[]) => void
) {
  return onSnapshot(eventsCollection, (snapshot) => {
    callback(mapValue<Event>(snapshot));
  });
}
