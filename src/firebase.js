// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBct5ZsCFE8SmgBZ8SO2O99pz8dThDeIt4",
  authDomain: "cloudmate-391ef.firebaseapp.com",
  projectId: "cloudmate-391ef",
  storageBucket: "cloudmate-391ef.appspot.com",
  messagingSenderId: "356885509297",
  appId: "1:356885509297:web:2ae543573d68861b09de90",
  measurementId: "G-ZH6FMFLK24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);