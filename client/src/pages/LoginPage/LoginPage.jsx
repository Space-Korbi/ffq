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
    <div className="d-flex h-100 align-self-stretch justify-content-center bg-light">
      <div className="d-flex col-sm-8 col-md-6 col-lg-4 mt-5">
        <div className="col">
          <div className="alert alert-info">
            Test Accounts
            <br />
            <strong>Administrator</strong> - Email: admin@abc.de PW: admin
            <br />
            <strong>User</strong> - Email: user@abc.de PW: user
          </div>
          <h2>Sign in</h2>
          <br />
          <Formik
            initialValues={{
              email: 'u@5',
              password: '12345'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required('Email is required'),
              password: Yup.string().required('Password is required')
            })}
            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
              authService.login(email, password).then(
                (user) => {
                  history.push(`/users/${user.id}`);
                },
                (error) => {
                  setSubmitting(false);
                  setStatus(error.body);
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
                <div className="form-group">
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
                {status && <div className="alert alert-danger">{status}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
