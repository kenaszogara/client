import React , { Component } from 'react';
import './home.css';

class Home extends Component{
  render(){
    return(
      <div className="main_div">
        <h1>Welcome to Dash</h1>
        <h5>Your new experience awaits</h5>
        <p>this is " {this.props.location.state.username} " home</p>
      </div>
    )
  }
}

export default Home;