import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";


// Rohit


// const firebaseConfig = {
//   apiKey: "AIzaSyCipnksEaouCdOyl9QozEuthjZSNEB0ksk",
//   authDomain: "forwebpro.firebaseapp.com",
//   projectId: "forwebpro",
//   storageBucket: "forwebpro.appspot.com",
//   messagingSenderId: "723936823851",
//   appId: "1:723936823851:web:ff75a2f6876bc062e6386e",
//   measurementId: "G-9XJMVE4074"
// };



//Partha

// const firebaseConfig = {
//   apiKey: "AIzaSyDohrxecKPqdr6WgzWndt5QDZDl2KiHh8A",
//   authDomain: "webpartha-81685.firebaseapp.com",
//   projectId: "webpartha-81685",
//   storageBucket: "webpartha-81685.appspot.com",
//   messagingSenderId: "23256996081",
//   appId: "1:23256996081:web:12fa2d9fc84a6d2617b150",
//   measurementId: "G-97WZKSKXKK"
// };

//Main

const firebaseConfig = {
  apiKey: "AIzaSyD7JvziZbU2Q0RBilePt3iV_JP_trC8bZk",
  authDomain: "aechostel-b775b.firebaseapp.com",
  databaseURL: "https://aechostel-b775b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aechostel-b775b",
  storageBucket: "aechostel-b775b.appspot.com",
  messagingSenderId: "219417250385",
  appId: "1:219417250385:web:8165d94b3eb93d58bbc670",
  measurementId: "G-QHRP3R05TQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);