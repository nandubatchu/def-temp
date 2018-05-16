const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const qtemp = {
    id: 0,
    q: "Wait for the question!",
    a: "Option A",
    b: "Option B",
    c: "Option C"
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.question = functions.https.onRequest((request, response) => {
    const question = admin.database().ref("question");
    const nextQuestion = admin.database().ref("nextQuestion");
    const nextGame = admin.database().ref("nextGame");

    nextGame.once('value', (snapshot)=>{
        nextQuestion.once('value', (dataSnapshot)=>{
            let time = snapshot.val();
            let gameInterval = setIntervalAndExecute(()=>{
                let now = new Date();
                if (Date.parse(now) >= Date.parse(time)) {
                    clearInterval(gameInterval);
                    let counter = 0;
                    let interval = setIntervalAndExecute(()=>{ 
                        if (counter === dataSnapshot.val().length) {
                            console.log("here")
                            nextQuestion.remove();
                            clearInterval(interval);
                            question.set(qtemp);
                        } else {
                            question.set(dataSnapshot.val()[counter], ()=>{
                                counter += 1;
                                console.log(counter);
                            });
                        }
                    } , 5000);
                } 
            }, 1000);
        })
    });   
    response.send(200);
});

function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
}