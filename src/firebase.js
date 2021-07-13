import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBck1e-dWvV1MM2VaU31nZj7OT35dU_1Kk",
    authDomain: "snake-a5537.firebaseapp.com",
    projectId: "snake-a5537",
    storageBucket: "snake-a5537.appspot.com",
    messagingSenderId: "254310595978",
    appId: "1:254310595978:web:926ee778f9d9746e615c73"
};

firebase.initializeApp(firebaseConfig)

export default firebase