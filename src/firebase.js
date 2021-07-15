import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREABSE_APIKEY,
    authDomain: process.env.REACT_APP_FIREABSE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREABSE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREABSE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREABSE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREABSE_APPID
};

firebase.initializeApp(firebaseConfig)

export default firebase