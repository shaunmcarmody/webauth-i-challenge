import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    return (
      <>
        <Route exact path="/" render={ props => <Landing {...props} {...this.state} />} />
        <Route exact path="/home" render={ props => <Home {...props} {...this.state} />} />
      </>
    );
  }
}

export default App;
