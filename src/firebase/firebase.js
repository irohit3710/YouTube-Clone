// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBPqOvQzaxVuuHWekwb8-03JOaozTEb0Y",
  authDomain: "fir-authentication-4b2f4.firebaseapp.com",
  projectId: "fir-authentication-4b2f4",
  storageBucket: "fir-authentication-4b2f4.appspot.com",
  messagingSenderId: "306876529379",
  appId: "1:306876529379:web:6d3b57eca76f1a5bd3a3d6",
  measurementId: "G-M2336FGP2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getAuth(app);

//Get Currently Signed in User Details 
// let user_data = "null";
// const data = auth.currentUser;
// onAuthStateChanged(auth,(user)=>{
//   if(user){
//     user_data = user;
//   }
//   // console.log(user_data)
// })

export  {app,auth,database};
// const analytics = getAnalytics(app);