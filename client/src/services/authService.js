import { BehaviorSubject } from 'rxjs';
import { login, signup, resetPassword } from '../api';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

function logoutUser() {
  // remove user from local storage to log user out
  localStorage.clear();
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

const signupUser = (firstName, lastName, email, password) => {
  const payload = { firstName, lastName, email, password };
  return signup(payload).catch((error) => {
    return Promise.reject(error.response);
  });
};

const resetUserPassword = (email) => {
  const payload = { email };
  return resetPassword(payload).catch((error) => {
    return Promise.reject(error.response);
  });
};

const authService = {
  loginUser,
  logoutUser,
  signupUser,
  resetUserPassword,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

export default authService;
