class Auth {
  // Authenticate user and save a token in local storage
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }
  // check if user has a token in local storage
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  // remove token from local storage
  static deauthenticatedUser() {
    localStorage.removeItem('token');
  }
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
