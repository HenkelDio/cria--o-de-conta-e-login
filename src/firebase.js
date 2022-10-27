import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB-fR6zz-RIzhlGC8_vXJDvsR88oehMWJg",
    authDomain: "login-system-henkel.firebaseapp.com",
    projectId: "login-system-henkel",
    storageBucket: "login-system-henkel.appspot.com",
    messagingSenderId: "259237131696",
    appId: "1:259237131696:web:adc6caafe70170bed05275",
    measurementId: "G-VJLCZWWHPN"
  });

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export {db, auth, storage};