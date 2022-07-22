import { FieldValue, onSnapshot, QuerySnapshot } from 'firebase/firestore';

import { createAny, getAll, mapValue, removeAny, streamAny } from './core';
import { createCollection } from './firebase';

export interface Event {
  id: string;
  title: string;
  date: { seconds: number };
  start: string;
  end: string;
}

export interface EventToCreate extends Omit<Event, 'id' | 'date'> {
  date: FieldValue;
}

export const eventsCollection = createCollection<Event>('events');
export const eventsCreateCollection = createCollection<EventToCreate>('events');

export function getAllEvents() {
  return getAll<Event>(eventsCollection);
}

export function streamEvents(callback: (events: Event[]) => void) {
  return onSnapshot(eventsCollection, (snapshot) => {
    callback(mapValue<Event>(snapshot));
  });
}

export function createEvent(event: EventToCreate) {
  return createAny(eventsCreateCollection, event);
}

export function removeEvent(id: string) {
  return removeAny<Event>(eventsCollection, id);
}
