import React, { Component, PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({
      user
    });
  }
  processForm(e) {
    e.preventDefault();
    console.log(`name: ${this.state.user.name}`);
    console.log(`email: ${this.state.user.email}`);
    console.log(`password: ${this.state.user.password}`);
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener = ('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        });
        localStorage.setItem('successMessage', xhr.response.message);
        this.context.router.replace('/login');
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
      <SignUpForm
        onSubmit={ this.processForm }
        onChange={ this.changeUser }
        errors={ this.state.errors }
        user={ this.state.user }
      />
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignUpPage;
