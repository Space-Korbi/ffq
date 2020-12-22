import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { authenticationService } from '../../services';

const LoginPage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user) {
      history.push(`/dashboard/${user.id}`);
    }
  });

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="alert alert-info">
              <strong>Paricipant User</strong> - U: part P: part
              <br />
              <strong>Administrator</strong> - U: admin P: admin
            </div>
            <h2>Login</h2>
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required')
              })}
              onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                authenticationService.login(username, password).then(
                  (user) => {
                    /**
                     * TODO redirect
                     * redirect to first unanswered question of questionnaire if possible
                     */
                    history.push(`/dashboard/${user.id}`);
                  },
                  (error) => {
                    setSubmitting(false);
                    setStatus(error);
                  }
                );
              }}
            >
              {({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className={`form-control${
                        errors.username && touched.username ? ' is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
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
    </div>
  );
};

export default LoginPage;
