import { Role } from '.';

function configureFakeBackend() {
  const users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      role: Role.Admin
    },
    {
      id: 2,
      username: 'part',
      password: 'part',
      firstName: 'Normal',
      lastName: 'Participant',
      role: Role.Participant
    }
  ];
  const realFetch = window.fetch;
  // eslint-disable-next-line func-names
  window.fetch = function (url, opts) {
    const authHeader = opts.headers.Authorization;
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
    const roleString = isLoggedIn && authHeader.split('.')[1];
    const role = roleString ? Role[roleString] : null;

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      // eslint-disable-next-line consistent-return
      setTimeout(() => {
        function ok(body) {
          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
        }

        function unauthorised() {
          resolve({
            status: 401,
            text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' }))
          });
        }

        function error(message) {
          resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
        }
        // authenticate - public
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const user = users.find(
            (x) => x.username === params.username && x.password === params.password
          );
          if (!user) return error('Username or password is incorrect');
          return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: `fake-jwt-token.${user.role}`
          });
        }

        // get user by id - admin or user (user can only access their own record)
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
          if (!isLoggedIn) return unauthorised();

          // get id from request url
          const urlParts = url.split('/');
          // eslint-disable-next-line radix
          const id = parseInt(urlParts[urlParts.length - 1]);

          // only allow normal users access to their own record
          const currentUser = users.find((x) => x.role === role);
          if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

          const user = users.find((x) => x.id === id);
          return ok(user);
        }

        // get all users - admin only
        if (url.endsWith('/users') && opts.method === 'GET') {
          if (role !== Role.Admin) return unauthorised();
          return ok(users);
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));

        // private helper functions
      }, 500);
    });
  };
}

export default configureFakeBackend;
