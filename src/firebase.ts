import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5WEN1Bsu-t30onVnk1nNvJtwOob4IqM4",
  authDomain: "cafe-de-gatos-app.firebaseapp.com",
  projectId: "cafe-de-gatos-app",
  storageBucket: "cafe-de-gatos-app.firebasestorage.app",
  messagingSenderId: "344429497500",
  appId: "1:344429497500:web:f03363fd2f9fec37917159",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
