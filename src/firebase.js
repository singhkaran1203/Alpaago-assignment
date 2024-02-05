import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "alpaago-1d613.firebaseapp.com",
  projectId: "alpaago-1d613",
  storageBucket: "alpaago-1d613.appspot.com",
  messagingSenderId: "826715211714",
  appId: "1:826715211714:web:db81c42ca48ce35036b85b",
  measurementId: "G-CSL3C56C0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
