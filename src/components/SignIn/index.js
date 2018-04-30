import { h, Component } from 'preact';
import firebase from 'firebase';
import { auth, phoneAuthProvider, recaptchaVerifier } from '../firebase';

export default class SignIn extends Component {

  constructor() {
    super()
    this.state = {
      number: '+919986179372',
      code: 'test'
    }
  }

  handleNumberChange(e){
    this.setState({number: e.target.value});
  }

  handleCodeChange(e){
    this.setState({code: e.target.value});
  }

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
      }
    });
  }

  onSignInSubmit() {
    alert(this.state.code)
  }

  sendOTP() {
    auth.signInWithPhoneNumber(this.state.number, window.recaptchaVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
  }

  login() {
    window.confirmationResult.confirm(this.state.code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
    });
    
  }


  render() {
    return (
      <section>
          <input value={this.state.number} onChange={this.handleNumberChange.bind(this)} />
          <button id="sign-in-button" onClick={this.sendOTP.bind(this)}>
            Send OTP
          </button>
          <input value={this.state.code} onChange={this.handleCodeChange.bind(this)} />
          <button onClick={this.login.bind(this)} >Login</button>
          
      </section>
    );
  }
}