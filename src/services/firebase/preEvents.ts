import {
  doc,
  DocumentReference,
  FieldValue,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { createAny, mapValue, removeAny } from './core';

import { createCollection } from './firebase';
import { User, usersCollection } from './users';

interface PreEvent {
  id: string;
  userRef: DocumentReference<User>;
  title: string;
  start: string;
  end: string;
  date: Timestamp;
}

interface PreEventToCreate extends Omit<PreEvent, 'id' | 'userRef'> {
  userRef?: DocumentReference<User>;
}

export const preEventsCollection = createCollection<PreEvent>('preEvents');
export const preEventsToCreateCollection =
  createCollection<PreEventToCreate>('preEvents');

export function createPreEvent(
  userId: string,
  { ...preEventToCreate }: PreEventToCreate
) {
  const userRef = doc(usersCollection, userId);

  return createAny<PreEventToCreate>(preEventsToCreateCollection, {
    ...preEventToCreate,
    userRef,
  });
}

export function streamUserPrevEvents(
  userId: string,
  callback: (events: PreEvent[]) => void
) {
  const userRef = doc(usersCollection, userId);

  return onSnapshot(
    query(preEventsCollection, where('userRef', '==', userRef)),
    (snapshot) => {
      callback(mapValue<PreEvent>(snapshot));
    }
  );
}

export function streamPrevEvents(callback: (events: PreEvent[]) => void) {
  return onSnapshot(preEventsCollection, (snapshot) => {
    callback(mapValue<PreEvent>(snapshot));
  });
}

export function removePreEvent(id: string) {
  return removeAny<PreEvent>(preEventsCollection, id);
}

