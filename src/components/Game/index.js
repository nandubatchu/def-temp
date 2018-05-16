import { h, Component } from 'preact';

import { auth, database } from '../firebase';
import Timer  from 'easytimer';

import style from './style';

export default class question extends Component {
    constructor(){
        super();

        this.state = {
            answerLock: false,
            timer: 0,
            question: {
                id: 0,
                q: "Wait for the question!",
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

            var timer = new Timer();
            timer.start({precision: 'secondTenths', countdown: true, startValues: {seconds: 5}});
            timer.addEventListener('secondTenthsUpdated', (e) => {
                let newTime = timer.getTimeValues().toString(['seconds', 'secondTenths']);
                this.setState({timer: newTime});
            });
            timer.addEventListener('targetAchieved', (e) => {
                this.setState({answerLock: true});
            });  
        });

        
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
                Question ID: {this.state.question.id}
                <div className={style.timer} >
                    {this.state.timer}
                </div>
                <div className={style.question} >
                    {this.state.question.q}
                </div>
                <div className={style.options} >
                    <button className={style.option} id="a" onClick={this.select.bind(this)} disabled={this.state.answerLock} >{this.state.question.a}</button>
                    <button className={style.option} id="b" onClick={this.select.bind(this)} disabled={this.state.answerLock} >{this.state.question.b}</button>
                    <button className={style.option} id="c" onClick={this.select.bind(this)} disabled={this.state.answerLock} >{this.state.question.c}</button>
                </div>
            </div>
        
        );
    }
}