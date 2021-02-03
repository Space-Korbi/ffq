import React, { useState } from 'react';
import { string } from 'prop-types';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

// components
import Spinner from '../../components/Spinner';
import { userService } from '../../services';

const ChangePassword = ({ userId }) => {
  const [didChange, setdidChange] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string()
            .required('Old Password is required')
            .min(5, 'Password must be at least 5 characters'),
          newPassword: Yup.string()
            .required('New Password is required')
            .min(5, 'Password must be at least 5 characters'),
          confirmPassword: Yup.string()
            .required('Please confirm your password')
            .when('newPassword', {
              is: (password) => !!(password && password.length > 0),
              then: Yup.string().oneOf([Yup.ref('newPassword')], "Password doesn't match")
            })
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={({ oldPassword, newPassword, confirmPassword }, { setStatus, setSubmitting }) => {
          if (didChange) {
            userService
              .updateUserData(userId, { oldPassword, newPassword, confirmPassword })
              .then(() => {
                setStatus(
                  <div className="alert alert-success mb-5">Password changed successfully.</div>
                );
                setSubmitting(false);
                setdidChange(false);
              })
              .catch((error) => {
                const errorList = (listElement) => (
                  <div className="alert alert-danger mb-5">
                    <ul className="list-unstyled content-align-center mb-0">{listElement}</ul>
                  </div>
                );
                const errorListElements = error.data.errors.map((err) => {
                  return <li key={err.value}>{err.msg}</li>;
                });
                setStatus(errorList(errorListElements));
                setSubmitting(false);
                setdidChange(false);
              });
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, status, isSubmitting, setStatus }) => (
          <Form
            onChange={() => {
              setdidChange(true);
              setStatus();
            }}
          >
            <div className="mt-5">
              <div className="d-flex flex-row align-items-end justify-content-between">
                <p className="align-bottom m-0 mb-1 lead">Password</p>
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm ml-auto mb-1"
                  disabled={isSubmitting}
                >
                  <>
                    {isSubmitting ? (
                      <>
                        Changing...
                        <Spinner className="spinner-border spinner-border-sm ml-1" />
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </>
                </button>
              </div>
            </div>
            <hr className="m-0 mb-3" />

            <div className="row">
              <div className="col-lg-4 mb-2 mb-lg-0">
                <div className="form-group mb-lg-0">
                  <label htmlFor="oldPassword">Old Password</label>
                  <Field
                    type="password"
                    name="oldPassword"
                    className={`form-control${errors.oldPassword ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="oldPassword" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="col-lg-4 mb-2 mb-lg-0">
                <div className="form-group mb-lg-0">
                  <label htmlFor="newPassword">New Password</label>
                  <Field
                    type="password"
                    name="newPassword"
                    className={`form-control${errors.newPassword ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="col-lg-4 mb-lg-0">
                <div className="form-group mb-0">
                  <label htmlFor="inputConfirmPassword">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={`form-control${errors.confirmPassword ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">{status}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ChangePassword.propTypes = { userId: string.isRequired };

export default ChangePassword;
