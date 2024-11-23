// these 3 lines allow me to use env vars here instead of exposing em
import { loadEnvConfig } from '@next/env' 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

// app/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig ={
  apiKey:process.env.FB_apiKey,
  authDomain: process.env.FB_authDomain,
  projectId:process.env.FB_projectId,
  storageBucket:process.env.FB_storageBucket,
  messagingSenderId: process.env.FB_messagingSenderId,
  appId: process.env.FB_appId
}
//console.log(firebaseConfig);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };