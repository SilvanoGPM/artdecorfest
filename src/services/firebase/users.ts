import { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { createCollection } from './firebase';

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export const usersCollection = createCollection<User>('users');

export async function newUser(userToCreate: FirebaseUser) {
  const { uid, displayName, email, photoURL } = userToCreate;

  const user = {
    id: uid,
    displayName,
    email,
    photoURL,
  };

  await setDoc(doc(usersCollection, uid), user);

  return user;
}
