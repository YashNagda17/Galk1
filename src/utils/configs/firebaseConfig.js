// **** FINAL PROD DB **** //
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
	apiKey: "AIzaSyCwARlrA3Up0ZJflkGst0roFkHi33HANZo",
	authDomain: "galk-company-clone.firebaseapp.com",
	projectId: "galk-company-clone",
	storageBucket: "galk-company-clone.appspot.com",
	messagingSenderId: "846786905904",
	appId: "1:846786905904:web:723d07dd4c2f670682aaf5",
	measurementId: "G-W15DH7RELX"
  };
firebase.initializeApp(config);

const database = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { firebase, database, storage, auth, config };
