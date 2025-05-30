import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_IRL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BOCKET,
    messagingSenderId: process.env.MESSANGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
