import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  processForm(e) {
    e.preventDefault();
    console.log(`email: ${this.state.user.email}`);
    console.log(`password: ${this.state.user.password}`);
  }
  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({
      user
    });
  }
  render() {
    return (
      <LoginForm
        onSubmit={ this.processForm }
        onChange={ this.changeUser }
        errors={ this.state.errors }
        user={ this.state.user }
      />
    );
  }
}

export default LoginPage;
