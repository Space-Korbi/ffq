import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { authService } from '../../services';

// logo
import { ReactComponent as Logo } from '../../hi-ffq_v9_react.svg';

const ResetPasswordPage = () => {
  const history = useHistory();
  const { token } = useParams();

  return (
    <div
      className="d-flex align-self-stretch justify-content-center bg-light py-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="d-flex col-sm-8 col-md-6 col-lg-5">
        <div className="col">
          <div className="d-flex justify-content-center">
            <Logo className="App-logo mb-5" width="72" height="72" />
          </div>
          <h2>Change Password</h2>
          <br />
          <Formik
            initialValues={{
              password: '',
              confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .required('Password is required')
                .min(5, 'Password must be at least 5 characters'),
              confirmPassword: Yup.string()
                .required('Please confirm your password')
                .when('password', {
                  is: (password) => !!(password && password.length > 0),
                  then: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match")
                })
            })}
            onSubmit={({ password }, { setStatus, setSubmitting }) => {
              authService.resetPassword(token, password).then(
                () => {
                  setSubmitting(false);
                  // eslint-disable-next-line no-alert
                  window.alert(
                    'Password changed successfully! You can now login with your new password.'
                  );
                  history.push(`/login`);
                },
                (error) => {
                  setSubmitting(false);
                  setStatus('Something went wrong. ', error);
                }
              );
            }}
          >
            {({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
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
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={`form-control${
                      errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group pb-5">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Change password
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

export default ResetPasswordPage;
