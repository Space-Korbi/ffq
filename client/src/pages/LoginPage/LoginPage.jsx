import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { authService } from '../../services';

const LoginPage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = authService.currentUserValue;
    if (user) {
      history.push(`/users/${user.id}`);
    }
  }, []);

  return (
    <div
      className="d-flex align-self-stretch justify-content-center bg-light"
      style={{ height: '100vh', overflow: 'scroll' }}
    >
      <div className="d-flex col-sm-8 col-md-6 col-lg-5 mt-5">
        <div className="col">
          <div className="alert alert-info">
            Test Accounts
            <br />
            <strong>Administrator</strong> - Email: admin@abc.de PW: 12345
            <br />
            <strong>User</strong> - Email: user@abc.de PW: 54321
          </div>
          <div className="d-flex justify-content-center">
            <img className="mb-5" src="../../hi-ffq.png" alt="" width="72" height="72" />
          </div>
          <h2>Login</h2>
          <br />
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required('Email is required'),
              password: Yup.string()
                .required('Password is required')
                .min(5, 'Password must be at least 5 characters')
            })}
            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
              authService.loginUser(email, password).then(
                (response) => {
                  history.push(`/users/${response.user.id}`);
                },
                (error) => {
                  setSubmitting(false);
                  const errorList = (listElement) => (
                    <ul className="list-unstyled content-align-center mb-0">{listElement}</ul>
                  );
                  if ([401, 403].indexOf(error.status) !== -1) {
                    setStatus(errorList(<li>Password is incorrect.</li>));
                  } else if ([404].indexOf(error.status) !== -1) {
                    setStatus(errorList(<li>Email is incorrect.</li>));
                  } else if (error.data.errors) {
                    const errorListElements = error.data.errors.map((err) => {
                      return <li key={err.value}>{err.msg}</li>;
                    });
                    setStatus(errorList(errorListElements));
                  }
                }
              );
            }}
          >
            {({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={`form-control${
                      errors.password && touched.password ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group mb-5">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => history.push(`/signup`)}
                  >
                    Sign Up
                  </button>
                  {isSubmitting && (
                    <img
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      alt=""
                    />
                  )}
                </div>
                {status && <div className="alert alert-danger mb-5">{status}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
