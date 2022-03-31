import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBTzjV-IaMKcDWasTNHo_5PAzFRXPoOrXc",
  authDomain: "room-chat-33550.firebaseapp.com",
  projectId: "room-chat-33550",
  storageBucket: "room-chat-33550.appspot.com",
  messagingSenderId: "394890379193",
  appId: "1:394890379193:web:ff81a286bdd84692100068",
  measurementId: "G-JW7KNW77TT",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const storage = firebase.storage();
export const database = firebase.database();

export default firebase;
