import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDnVnyxCQ96NawAeLssmyQ8LMI4R0g53eY",
  authDomain: "pokemon-game-5bf37.firebaseapp.com",
  databaseURL: "https://pokemon-game-5bf37-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-5bf37",
  storageBucket: "pokemon-game-5bf37.appspot.com",
  messagingSenderId: "236205823934",
  appId: "1:236205823934:web:d1522b018f9c14da310bef"
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const dataBase = fire.database();

export default dataBase;