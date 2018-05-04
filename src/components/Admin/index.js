import { h, Component } from 'preact';

import { auth, database } from '../firebase';

export default class admin extends Component {
    constructor(){
        super();

        this.state = {
            newQuestion: {
                id:"FakeID#00",
                q:"Question",
                a:"Option A",
                b:"Option B",
                c:"Option C"
            }
        }
    }

    handleChange(e) {
        const state = this.state.newQuestion
        state[e.target.id] = e.target.value;
        this.setState({newQuestion: state});
    }

    postLive() {
        const question = database.ref('/' + 'question');
        const newQuestion = this.state.newQuestion;
        question.update(newQuestion, ()=>{
            console.log("Question posted!")
        })
    }

    render(){
        return(
            
            <form>
                <input value={this.state.newQuestion.id} id="id" onChange={this.handleChange.bind(this)} />
                <input value={this.state.newQuestion.q} id="q" onChange={this.handleChange.bind(this)} />
                <input value={this.state.newQuestion.a} id="a" onChange={this.handleChange.bind(this)} />
                <input value={this.state.newQuestion.b} id="b" onChange={this.handleChange.bind(this)} />
                <input value={this.state.newQuestion.c} id="c" onChange={this.handleChange.bind(this)} />
                <button onClick={this.postLive.bind(this)} >Live</button>
            </form>
            
        );
    }
}