import {
  doc,
  DocumentReference,
  FieldValue,
  Timestamp,
} from 'firebase/firestore';
import { createAny } from './core';

import { createCollection } from './firebase';
import { User, usersCollection } from './users';

interface PreEvent {
  userRef: DocumentReference<User>;
  title: string;
  start: string;
  end: string;
  date: Timestamp;
}

interface PreEventToCreate extends Omit<PreEvent, 'userRef'> {
  userId: string;
}

export const preEventsCollection = createCollection<PreEvent>('preEvents');
export const preEventsToCreateCollection =
  createCollection<PreEventToCreate>('preEvents');

export function createPreEvent({
  userId,
  ...preEventToCreate
}: PreEventToCreate) {
  const userRef = doc(usersCollection, userId);

  return createAny<PreEvent>(preEventsCollection, {
    ...preEventToCreate,
    userRef,
  });
}
