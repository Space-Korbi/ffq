import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { authService } from '../../services';

// logo
import { ReactComponent as Logo } from '../../hi-ffq_v9_react.svg';

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
      className="d-flex align-self-stretch justify-content-center bg-light py-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="d-flex col-sm-8 col-md-6 col-lg-5">
        <div className="col">
          <div className="alert alert-info">
            Test Accounts
            <br />
            <strong>Administrator</strong> - Email: admin@abc.de PW: 12345
            <br />
            <strong>User</strong> - Email: user@abc.de PW: 54321
          </div>
          <div className="d-flex justify-content-center">
            <Logo className="App-logo mb-5" width="72" height="72" />
          </div>
          <h2>Login</h2>
          <br />
          <Formik
            initialValues={{
              email: 'a@1.de',
              password: '12345'
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
                <div className="form-group pb-5">
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
                <button
                  type="button"
                  className="btn btn-link px-0 mt-n5"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >
                  Forgot Password
                </button>
                {status && <div className="alert alert-danger mb-5">{status}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Forgot Password
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  email: ''
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required('Email is required')
                })}
                onSubmit={({ email }, { setStatus, setSubmitting }) => {
                  authService.requestPasswordReset({ email }).then(
                    () => {
                      setSubmitting(false);
                      setStatus(
                        `You will soon recieve an email. Please check your spam folder too.`
                      );
                    },
                    (error) => {
                      setSubmitting(false);
                      console.log(error);
                      setStatus('Email is incorrect');
                    }
                  );
                }}
              >
                {({ errors, status, touched, isSubmitting }) => (
                  <Form>
                    {`If you have forgotten your password, enter your email address and click 'Request
                      link'. You will recieve an email containing a link to reset your password.`}
                    <div className="form-group mt-4">
                      <label htmlFor="email">Email</label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control${
                          errors.email && touched.email ? ' is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Request link
                    </button>
                    {isSubmitting && (
                      <img
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                        alt=""
                      />
                    )}
                    {status && <div className="alert alert-primary my-3">{status}</div>}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
