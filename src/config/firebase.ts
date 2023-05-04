import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCJ6DQdWIaMtJ1OgqBHk159bdfG1BoMoGM",
  authDomain: "spotify-clone-dd7e8.firebaseapp.com",
  projectId: "spotify-clone-dd7e8",
  storageBucket: "spotify-clone-dd7e8.appspot.com",
  messagingSenderId: "139969349142",
  appId: "1:139969349142:web:c735d56a429e1be67e9737",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
