import { initializeApp } from "firebase/app";
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "artdecorfest-6cce4.firebaseapp.com",
  projectId: "artdecorfest-6cce4",
  storageBucket: "artdecorfest-6cce4.appspot.com",
  messagingSenderId: "926990050042",
  appId: "1:926990050042:web:418b5bd210b2dc7df09f43",
  measurementId: "G-355PVHZMV2"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export function createCollection<T = DocumentData>(
  collectionName: string
): CollectionReference<T> {
  return collection(db, collectionName) as CollectionReference<T>;
}
