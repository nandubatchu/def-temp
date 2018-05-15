const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.question = functions.https.onRequest((request, response) => {
    const question = admin.database().ref("question");
    const nextQuestion = admin.database().ref("nextQuestion");

    nextQuestion.once('value', (dataSnapshot)=>{
        for (i=0; i<dataSnapshot.val().length; i++) {
            let q = question.set(dataSnapshot.val()[i]);
            setTimeout(()=>{ console.log("Q", i)} , 5000);
        }
        nextQuestion.remove()
    })
    
    response.send(200);
});
