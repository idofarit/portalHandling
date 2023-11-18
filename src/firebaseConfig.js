import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY9gjGoF0znygOUUeKSF22uZKFiKbaY_M",
  authDomain: "portalhandling.firebaseapp.com",
  projectId: "portalhandling",
  storageBucket: "portalhandling.appspot.com",
  messagingSenderId: "874011483866",
  appId: "1:874011483866:web:1faffd05ce58ef313f0fe3",
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: "truejob-5b61f.firebaseapp.com",
//   projectId: "truejob-5b61f",
//   storageBucket: "truejob-5b61f.appspot.com",
//   messagingSenderId: "927605262100",
//   appId: "1:927605262100:web:979bd8ce8ec63653a92401",
// };

export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
