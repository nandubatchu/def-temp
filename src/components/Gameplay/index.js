import { h, Component } from 'preact';

import SignIn from '../SignIn';
import Game from '../Game';
import Admin from '../Admin';

import { auth } from '../firebase';

import style from './style';

export default class Gameplay extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(currentUser => {
        this.setState({ currentUser });
    })
  }

  render() {

    return (
      <div className={style.page} >
        {this.state.currentUser ? (this.state.currentUser.phoneNumber === "+919986179372" ? <Game /> : <Game />) : <SignIn />}
      </div>
    );
  }
}