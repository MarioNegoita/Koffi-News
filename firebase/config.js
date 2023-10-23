import { initializeApp, getApp, getApps } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  increment,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  initializeAuth,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const configKeys = {
  apiKey: "AIzaSyAQxi2217lbl34kgBRhVSeSIJHwoAut81w",
  authDomain: "news-concept.firebaseapp.com",
  projectId: "news-concept",
  storageBucket: "news-concept.appspot.com",
  messagingSenderId: "167001015496",
  appId: "1:167001015496:web:8c56840bc8dc2ebc5c11fd",
};

let firebaseApp;
let auth;

if (getApps().length < 1) {
  firebaseApp = initializeApp(configKeys);
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebaseApp = getApp();
  auth = getAuth(firebaseApp);
}

const db = getFirestore(firebaseApp);

export {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  increment,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  db,
  auth,
  where,
};
