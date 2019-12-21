import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Signin from './component/signin';
import Signup from './component/signup';
import Home from './component/home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route path='/signin' component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
