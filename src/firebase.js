// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAz7Hq67fwIRmQgOwHW5vaaHpbQUsYvk-s",
  authDomain: "note-taking-c2665.firebaseapp.com",
  projectId: "note-taking-c2665",
  storageBucket: "note-taking-c2665.appspot.com",
  messagingSenderId: "830601237489",
  appId: "1:830601237489:android:378bb1e61ce9ba7e6eaa50" // Если у тебя в консоли есть appId — вставь сюда, иначе можно временно убрать
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получаем нужные сервисы
export const auth = getAuth(app);
export const db = getFirestore(app);
