import axios from 'axios';

class AuthService {
  registerUser({ login, email, password }) {
    return axios.post('api/users/register', { login, email, password });
  }

  claimPasswordReset({ login }) {
    return axios.post('api/passwordreset', { login });
  }

  login({ login, password, rememberMe }) {
    return axios.post('api/users', { login, password, rememberMe });
  }

  logout() {
    return axios.get('api/users/logout');
  }

  getCurrentUser() {
    return axios.get('api/users');
  }
}

export default AuthService;
