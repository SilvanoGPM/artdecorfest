import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'artdecorfest-6cce4.firebaseapp.com',
  projectId: 'artdecorfest-6cce4',
  storageBucket: 'artdecorfest-6cce4.appspot.com',
  messagingSenderId: '926990050042',
  appId: '1:926990050042:web:418b5bd210b2dc7df09f43',
  measurementId: 'G-355PVHZMV2',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const googleAuthProvider = new GoogleAuthProvider();

export const auth = getAuth();

export function createCollection<T = DocumentData>(
  collectionName: string
): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}

const authProviders = {
  'google': googleAuthProvider,
};

export async function login(type: 'google'): Promise<UserCredential> {
  return signInWithPopup(auth, authProviders[type]);
}
