import { BehaviorSubject } from 'rxjs';
import { signin, signup } from '../api';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  currentUserSubject.next(null);
}

function handleResponse(response) {
  // console.log(response);
  if ([401, 403].indexOf(response.status) !== -1) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    logout();
    // eslint-disable-next-line no-restricted-globals
    location.reload();

    const error = response.message || response.error;
    return Promise.reject(error);
  }

  return response.data;
}

const login = (email, password) => {
  const payload = { email, password };
  return signin(payload)
    .then(handleResponse)
    .then((user) => {
      if (user.accessToken) {
        localStorage.setItem('user', JSON.stringify(user));
        currentUserSubject.next(user);
      }

      return user;
    });
};

const register = (firstName, lastName, email, password) => {
  const payload = { firstName, lastName, email, password };
  return signup(payload);
};

const authService = {
  login,
  logout,
  register,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

export default authService;
