// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore';
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDnIMhCEZq-i58SasDAGMqh9JQrsoNaw-k',
//   authDomain: 'expensify-7eb9a.firebaseapp.com',
//   projectId: 'expensify-7eb9a',
//   storageBucket: 'expensify-7eb9a.appspot.com',
//   messagingSenderId: '1087326471215',
//   appId: '1:1087326471215:web:15abffe23e2853eda032da',
// };
//my config
const firebaseConfig = {
  apiKey: 'AIzaSyBImHx7-hMM7dAfdmS2JgM39fcKBIfVVaA',
  authDomain: 'expensify-7480c.firebaseapp.com',
  projectId: 'expensify-7480c',
  storageBucket: 'expensify-7480c.appspot.com',
  messagingSenderId: '713681478913',
  appId: '1:713681478913:web:dca16830ec35bdb35fe700',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
