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

export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
