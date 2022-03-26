// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { initializeApp } from 'firebase/app';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOZ_iAOxdSdYRteVzkbHbEvWaok_Im8NY",
  authDomain: "chatapp-react-native-88776.firebaseapp.com",
  projectId: "chatapp-react-native-88776",
  storageBucket: "chatapp-react-native-88776.appspot.com",
  messagingSenderId: "294186911658",
  appId: "1:294186911658:web:88b1f7c5ba887e8db40dd3"
  };

// Initialize Firebase
!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app()

const db = firebase.firestore()

// const storage = firebase.storage()

export {firebase , db }