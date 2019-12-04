//const firebase = require('firebase-admin');
const firebase = require('firebase');

const firebaseConfig = {
	apiKey: "AIzaSyA3LtyZvHmSe2ZGTa5AceFdpd7y-iBs16s",
	authDomain: "hbc-equipment-return.firebaseapp.com",
	databaseURL: "https://hbc-equipment-return.firebaseio.com",
	projectId: "hbc-equipment-return",
	storageBucket: "hbc-equipment-return.appspot.com",
	messagingSenderId: "131179393473",
	appId: "1:131179393473:web:161d1f444f71507c"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();