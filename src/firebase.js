// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAz7Hq67fwIRmQgOwHW5vaaHpbQUsYvk-s",
  authDomain: "note-taking-c2665.firebaseapp.com",
  projectId: "note-taking-c2665",
  storageBucket: "note-taking-c2665.appspot.com",
  messagingSenderId: "830601237489",
  appId: "1:830601237489:android:378bb1e61ce9ba7e6eaa50"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Ссылка на коллекцию заметок
const notesCollection = collection(db, 'notes');

export async function fetchNotesByUserId(userId) {
  // Выгружаем заметки конкретного пользователя
  const q = query(notesCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  const notes = [];
  snapshot.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  return notes;
}

export async function createNote(note) {
  // note должен содержать userId, title, text, createdAt
  const docRef = await addDoc(notesCollection, note);
  return { id: docRef.id, ...note };
}

export async function updateNote(id, updatedFields) {
  const noteDoc = doc(db, 'notes', id);
  await updateDoc(noteDoc, updatedFields);
}

export async function deleteNote(id) {
  const noteDoc = doc(db, 'notes', id);
  await deleteDoc(noteDoc);
}
