import { h, Component } from 'preact';

import { auth, database } from '../firebase';

export default class Game extends Component {
    constructor(){
        super();

        this.state = {
            game: {
                q: "before"
            }
        }
    }

    componentDidMount(){
        const game = database.ref('/' + 'game');

        game.on('value', snapshot => {
            this.setState({ game: snapshot.val() });
            console.log(this.state.game);
        });
    }

    logout() {
        auth.signOut()
    }   

    render() {
        
        return (
            <div>
                {this.state.game.q}
                <br/>
                <button onClick={this.logout.bind(this)} >Logout</button>
            </div>
        
        );
    }
}