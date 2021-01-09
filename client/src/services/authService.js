/* eslint-disable no-unused-vars */
import { BehaviorSubject } from 'rxjs';
import { login, signup } from '../api';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  currentUserSubject.next(null);
}

const loginUser = (email, password) => {
  const payload = { email, password };
  return login(payload)
    .then((response) => {
      const user = response.data;
      if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
        currentUserSubject.next(user);
      }
      return user;
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

const registerUser = (firstName, lastName, email, password) => {
  const payload = { firstName, lastName, email, password };
  return signup(payload).catch((error) => {
    return Promise.reject(error.response);
  });
};

const authService = {
  loginUser,
  logout,
  registerUser,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

export default authService;
