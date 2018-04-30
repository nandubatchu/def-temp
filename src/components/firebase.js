import firebase from 'firebase';

const config = require('../firebase_config.json');
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();