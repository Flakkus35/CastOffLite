import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyASi5TgMmvBSctUaJwJHDOMajICWoLMplo",
    authDomain: "cast-off.firebaseapp.com",
    databaseURL: "https://cast-off.firebaseio.com",
    projectId: "cast-off",
    storageBucket: "cast-off.appspot.com",
    messagingSenderId: "104875473503"
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
	db,
	auth
};