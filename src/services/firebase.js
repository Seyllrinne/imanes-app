import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {initializeAuth} from 'firebase/auth';
import {getReactNativePersistence} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
//import {REACT_APP_API_KEY,REACT_APP_PROJECT_ID} from '@env';
/*const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_PROJECT_ID + '.firebaseapp.com',
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_PROJECT_ID + ".appspot.com",
};*/
/*const firebaseConfig = {
    apiKey: "AIzaSyDvwH0kLVXmad9zVRIZNouQez12I_CoW3k",
    authDomain: "imanes-app.firebaseapp.com",
    projectId: "imanes-app",
    storageBucket: "imanes-app.appspot.com",
    messagingSenderId: "984603348869",
    appId: "1:984603348869:web:2bd38026f399fb897efeec",
    measurementId: "G-KW8Y8ZLK52"
};*/
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = initializeAuth(firebaseApp,{
    persistence: getReactNativePersistence(AsyncStorage)
});
export const storage = getStorage(firebaseApp);
export default firebaseApp;