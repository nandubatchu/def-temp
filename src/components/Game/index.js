import { h, Component } from 'preact';

import { auth, database } from '../firebase';

export default class question extends Component {
    constructor(){
        super();

        this.state = {
            answerLock: false,
            question: {
                id: 0,
                q: "Question placeholder",
                a: "Option A",
                b: "Option B",
                c: "Option C"
            }
        }
    }

    componentDidMount(){
        const question = database.ref('/' + 'question');

        question.on('value', snapshot => {
            this.setState({ question: snapshot.val(), answerLock: false });
            console.log(this.state.question);
        });
    }

    logout() {
        auth.signOut()
    }   

    select(e) {
        if (this.state.answerLock) { return }

        const user = database.ref('/users/'+ auth.currentUser.uid );
        const responses = user.child("responses");

        const answer = {};
        answer[this.state.question.id] = e.target.id;

        responses.update(answer, () => {
            this.setState({answerLock: true})
            console.log("answered");
        })
    }

    render() {
        
        return (
            <div>
                {this.state.question.q}
                <ul>
                    <li id="a" onClick={this.select.bind(this)} >{this.state.question.a}</li>
                    <li id="b" onClick={this.select.bind(this)} >{this.state.question.b}</li>
                    <li id="c" onClick={this.select.bind(this)} >{this.state.question.c}</li>
                </ul>
                
                <br/>
                <button onClick={this.logout.bind(this)} >Logout</button>
            </div>
        
        );
    }
}