const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.question = functions.https.onRequest((request, response) => {
    var question = admin.database().ref("question");

    question.child('q').set("Server triggered question?");
    // question.once('value').then((dataSnapshot)=>{
    //     return response.send(JSON.stringify(dataSnapshot.val()));
    // }).catch(err => console.log(err));

    response.send(200);
});
