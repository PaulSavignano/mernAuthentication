import React, { Component, PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props, context);
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';
    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.state = {
      errors: {},
      successMessage,
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
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    // AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        });
        Auth.authenticateUser(xhr.response.token);
        this.context.router.replace('/');
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
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
        successMessage={ this.state.successMessage }
        user={ this.state.user }
      />
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
