import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA0d0J0K5jVvcH0tEty4wNmwtzgBnicn5E",
  authDomain: "reactfirebase-5182a.firebaseapp.com",
  databaseURL: "https://reactfirebase-5182a-default-rtdb.firebaseio.com",
  projectId: "reactfirebase-5182a",
  storageBucket: "reactfirebase-5182a.appspot.com",
  messagingSenderId: "902903646528",
  appId: "1:902903646528:web:ecefc0b70f9a049c33d2a5",
  measurementId: "G-KB0S3M6DY5"
};


firebase.initializeApp(firebaseConfig);



export default firebase;