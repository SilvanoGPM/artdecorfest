import { User as FirebaseUser } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getAny } from './core';

import { createCollection } from './firebase';

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  admin: boolean;
}

export const usersCollection = createCollection<User>('users');

export async function newUser(userToCreate: FirebaseUser) {
  const { uid, displayName, email, photoURL } = userToCreate;

  const user = {
    id: uid,
    displayName,
    email,
    photoURL,
    admin: false,
  };

  await setDoc(doc(usersCollection, uid), user);

  const { admin, ...rest } = user;

  return rest;
}

export async function getUser(id: string) {
  return getAny<User>(usersCollection, id);
}

export async function verifyIfUserIsAdmin(id: string) {
  const user = await getUser(id);

  return user.admin;
}
