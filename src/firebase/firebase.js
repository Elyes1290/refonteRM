import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Importer Firebase Auth

const firebaseConfig = {
  apiKey: "AIzaSyDAAbQ2mcINUVD70j9YAy2CyBlkHYdHvTw",
  authDomain: "rmsportsagency-91b59.firebaseapp.com",
  databaseURL:
    "https://rmsportsagency-91b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rmsportsagency-91b59",
  storageBucket: "rmsportsagency-91b59.appspot.com",
  messagingSenderId: "945211150282",
  appId: "1:945211150282:web:7d93d7bff03c4bb1da4933",
  measurementId: "G-515MPT5LZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app); // Ajouter l'authentification Firebase

export { db, storage, auth };
