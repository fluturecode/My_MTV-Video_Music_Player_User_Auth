import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBxFfKlWV_pJRoiFQKVRUYpQ3o6HjXUD8c",
	authDomain: "my-mtv-89687.firebaseapp.com",
	databaseURL: "https://my-mtv-89687.firebaseio.com",
	projectId: "my-mtv-89687",
	storageBucket: "my-mtv-89687.appspot.com",
	messagingSenderId: "513704955210",
	appId: "1:513704955210:web:d7cd5b3d43432c5fd685b3",
	measurementId: "G-MS3L5WQWBB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
