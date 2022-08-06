import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCvpjiPgfeyow24ArfqG1rhP9aCH6b0TtQ",
    authDomain: "fir-crypto-portfolio.firebaseapp.com",
    projectId: "fir-crypto-portfolio",
    storageBucket: "fir-crypto-portfolio.appspot.com",
    messagingSenderId: "44649677332",
    appId: "1:44649677332:web:22acebb9178b7f680a9d01",
    measurementId: "G-0F7L14QNVT"
  };

  const app = initializeApp(firebaseConfig)
  export const db = getFirestore(app)
  