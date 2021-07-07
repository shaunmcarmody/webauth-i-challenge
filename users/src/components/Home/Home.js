import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoggedIn: false
    }
  }

  componentDidMount() {
    axios
      .get(
        'http://localhost:5000/api/auth/users',
        {
          headers: {
            authorization: document.cookie.split('=')[1]
          }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>works</div>
    )
  }
}

export default Home;