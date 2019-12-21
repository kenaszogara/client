import React , {Component} from 'react';
import './signin.css';
import { Redirect } from 'react-router-dom';
import md5 from 'md5';



class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      re_pass: '',
      pass_alert: '',
      query_alert: ''
    };
  }

  //form handling before submission
  handleInputChange = (event) => {
    const target = event.target;
    let value = event.target.value;
    const name = target.name;

    if(target.name === "password" || target.name === "re_pass") {
      document.getElementById(name).type = "password";
      value = md5(event.target.value);
    }

    this.setState({
      [name] : value
    });

    document.getElementById(name).style.fontFamily = "Montserrat black";
  }

  setDefaultvalue = (event) => {
    const name = event.target.name
    document.getElementById(name).value = "";
    
  }


  // form handling after submission
  handleSubmit = (event) => {

    this.setState({
      query_alert: ""
    })

    // if blank input, throw alert
    if (this.anyBlankInput()) {
      return alert("username or email or password, cannot be empty");
    }

    // must re enter password, if not throw alert
    if(this.state.re_pass === ''){
      return alert("you must re enter your password");
    }

    // if password didn't match re_pass, throw alert
    if(this.state.pass_alert !== ''){
      return alert("you make a mistake");
    }

    // else execute query post
    this.createAccount();

    event.preventDefault();
  }

  anyBlankInput = () => {
    let username, password, email;
    username = this.state.username;
    password = this.state.password;
    email = this.state.email;

    if(username === '' || email === '' || password === '' ){
      return true;
    } else {
      return false;
    }
  }

  handleRepassAlert = () => {
    if (this.state.password !== this.state.re_pass) {
      this.setState({ pass_alert: "password did not match" });
    } else {
      this.setState({ pass_alert: '' });
    }
  }

  // need fix
  createAccount = () => {
    fetch('/api/post/' + this.state.username + '/' + this.state.password + '/' + this.state.email, {
      method: 'POST',
      headers: { "Content-type": "aplication/json" }
    })
      .then(res => res.json())
      .then(msg => this.setState({
        query_alert: msg
      }))
      .then(msg => console.log(msg))
  }

  clearMsg = () => {
    this.setState({
      query_alert: ''
    });
  }
 
  render(){
    if(this.state.query_alert === 'success') {
      console.log(this.state.query_alert)
      alert("sucessfully added! Please sign in first");
      return (
        <Redirect to={{
          pathname: '/signin'
        }} />
      )
    } else {
      let msg = this.state.query_alert + ", Please use another username or email <3";
      if (this.state.query_alert === 'username or email already exists'){
        alert(msg);
        this.clearMsg();
      }
      return (
        <div className="signin">
          <h4>Sign Up</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="text_area">
              <input
                type="text"
                id="username"
                name="username"
                defaultValue="username"
                className="text_input"
                onFocus={this.setDefaultvalue}
                onChange={this.handleInputChange}

              />
            </div>
            <div className="text_area">
              <input
                type="text"
                id="email"
                name="email"
                defaultValue="email"
                className="text_input"
                onFocus={this.setDefaultvalue}
                onChange={this.handleInputChange}

              />
            </div>
            <div className="text_area">
              <input
                type="text"
                id='password'
                name="password"
                defaultValue="password"
                className="text_input"
                onFocus={this.setDefaultvalue}
                onChange={this.handleInputChange}

              />
            </div>
            <p className="alert">{this.state.pass_alert}</p>
            <div className="text_area">
              <input
                type="text"
                id='re_pass'
                name="re_pass"
                defaultValue="re-enter password"
                className="text_input"
                onFocus={this.setDefaultvalue}
                onChange={this.handleInputChange}
                onBlur={this.handleRepassAlert}

              />
            </div>
            <input type="submit" value="SIGN IN" className="btn" />
          </form>
        </div>
      )
    }
  }
}

export default Signup;