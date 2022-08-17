import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBFZn3M6LbL74YV6VRTXIc_Mi88LB2-6eA",
  authDomain: "todo-app-dda58.firebaseapp.com",
  projectId: "todo-app-dda58",
  storageBucket: "todo-app-dda58.appspot.com",
  messagingSenderId: "807972100742",
  appId: "1:807972100742:web:fc61b9fce471ee9ce0cf07"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);