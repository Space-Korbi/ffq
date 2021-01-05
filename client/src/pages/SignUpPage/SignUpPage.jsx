import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { authService } from '../../services';

const SignUpPage = () => {
  const history = useHistory();

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Sign Up</h2>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required('First name is required'),
                lastName: Yup.string().required('Last name is required'),
                email: Yup.string().required('Email is required'),
                password: Yup.string().required('Password is required')
              })}
              onSubmit={(
                { firstName, lastName, email, password },
                { setStatus, setSubmitting }
              ) => {
                authService.register(firstName, lastName, email, password).then(
                  (response) => {
                    setSubmitting(false);
                    if (response.status === 200) {
                      // eslint-disable-next-line no-alert
                      window.alert('Sign Up successful!');
                      history.push(`/login`);
                    }
                  },
                  (error) => {
                    setSubmitting(false);
                    setStatus(error.response.data.message);
                  }
                );
              }}
            >
              {({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={`form-control${
                        errors.firstName && touched.firstName ? ' is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={`form-control${
                        errors.lastName && touched.lastName ? ' is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
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
                      Sign Up
                    </button>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => history.push(`/login`)}
                    >
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

export default SignUpPage;
