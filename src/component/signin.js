import React, {Component} from 'react';
import "./signin.css";
import {Redirect} from 'react-router-dom';
import md5 from 'md5';


class Signin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password', 
      data: []
    }
  }

  //form handling before submission
  handleInputChange = (event) => {
    const target = event.target;
    let value = event.target.value;
    const name = target.name;

    if (target.name === "password" || target.name === "re_pass") {
      document.getElementById(name).type = "password";
      value = md5(event.target.value);
    }

    this.setState({
      [name]: value
    });

    document.getElementById(name).style.fontFamily = "Montserrat black";
  }

  setDefaultvalue = (event) => {
    const name = event.target.name
    document.getElementById(name).value = "";

  }

  // handle when submit button clicked
  handleSubmit = (event) => {
    event.preventDefault();

    let username = this.state.username;
    let password = this.state.password;

    fetch('/api/user/'+ username + '/' + password)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        data: data
      })
    })
  }

  // return true if handleSubmit() return a valid query
  handleSignin = () => {
    var obj = this.state.data;
    if(this.isNotEmpty(obj)){
      return true;
    } else {
      return false;
    }
  }

  // return true if this.state.data is not empty object
  isNotEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return true
      } else {
        return false
      }
    }
  }

  isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false
      } else {
        return true
      }
    }
  }

  render(){
    if(this.handleSignin()){
      return(
        <Redirect to={{
          pathname: '/home',
          state: { username: this.state.username }
        }}/>
      )
    } else {
      return (
        <div className="signin">
          <h4>Sign In</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="text_area">
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={this.state.username}
                onChange={this.handleInputChange}
                onFocus={this.setDefaultvalue}
                className="text_input"

              />
            </div>
            <div className="text_area">
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={this.state.password}
                onChange={this.handleInputChange}
                onFocus={this.setDefaultvalue}
                className="text_input"

              />
            </div>
            <input
              type="submit"
              value="SIGN IN"
              className="btn"

            />
          </form>
          <a className="link" href="/signup">Sign Up</a>
        </div>
      )
    }
  }
}

export default Signin;