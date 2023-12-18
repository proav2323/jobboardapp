import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCQ-fwCkC-cwGwFB79C-YQc6pe3gFRgdiw",
  authDomain: "jobboard-c1aa7.firebaseapp.com",
  projectId: "jobboard-c1aa7",
  storageBucket: "jobboard-c1aa7.appspot.com",
  messagingSenderId: "221180437043",
  appId: "1:221180437043:web:bd3c8b6dedc79f8b12b946",
  measurementId: "G-QLBMKWFJ1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);