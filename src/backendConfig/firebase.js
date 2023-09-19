import { initializeApp } from "firebase/app";
import { getAuth }  from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6mCwtvWGTF6HommpXvOLzA2pdv3Y-zCc",
  authDomain: "finance-tracker-ba2ca.firebaseapp.com",
  projectId: "finance-tracker-ba2ca",
  storageBucket: "finance-tracker-ba2ca.appspot.com",
  messagingSenderId: "114309773446",
  appId: "1:114309773446:web:84432a36a104c441ca3907",
  measurementId: "G-NVD4LJHH5J"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);