import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled.form`
  margin: auto;
  margin-top: calc(50vh - 200px);
  max-width: 300px;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid #cddae2;
  border-radius: 10px;
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 10px;
  padding: 4px 10px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: inherit;
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 1.4rem;
  margin: auto;
  margin-top: 10px;
  width: 100px;

  @media (min-width: 800px) {
    border: 1px solid black;
    color: black;
  }
`;

const P = styled.p`
  color: white;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;  
  font-size: 1.4rem;
  margin-top: 20px;
  text-align: center;

  @media (min-width: 800px) {
    color: black;
  }
`;

class Form extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = e => {
    e.preventDefault();
    this.setState({ login: false, username: '', password: '' });
    axios
      .post(
        `http://localhost:5000/api/auth/${this.state.login ? 'login' : 'register'}`,
        {
          username: this.state.username, password: this.state.password
        }
      )
      .then(res => {
        document.cookie=`bearer=${res.data.payload}`;
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleLogin = () => {
    this.setState(state => {
      return ({
        login: !state.login
      })
    });
  }

  render() {
    return (
      <StyledForm
        onSubmit={this.submit}
      >
        <Input
          name="username"
          onChange={this.handleChange}
          placeholder="Username"
          type="text"
          value={this.state.username}
        />
        <Input
          name="password"
          onChange={this.handleChange}
          placeholder="Password."
          type="password"
          value={this.state.password}
        />
        <Button>{this.state.login ? 'Login' : 'Signup'}</Button>
        <P
          onClick={this.toggleLogin}
        >
          Switch to {this.state.login ? 'Signup' : 'Login'} 👈
        </P>
      </StyledForm>
    );
  }
}

export default Form;