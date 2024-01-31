// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDU6dBm1Gucaaint0ZBM-52y_YeAQgJSlw",
  authDomain: "emenu-41e86.firebaseapp.com",
  projectId: "emenu-41e86",
  storageBucket: "emenu-41e86.appspot.com",
  messagingSenderId: "982308644131",
  appId: "1:982308644131:web:e1e071c37c05a95c73d896",
  measurementId: "G-YYE6CERTJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;