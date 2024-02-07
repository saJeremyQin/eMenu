// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from "firebase/auth";

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
export const auth = getAuth(app);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}