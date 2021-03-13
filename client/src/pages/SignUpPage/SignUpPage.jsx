import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

import { authService } from '../../services';

// logo
import { ReactComponent as Logo } from '../../hi-ffq_v9_react.svg';

const SignUpPage = () => {
  const { t } = useTranslation(['globals', 'yup']);

  const history = useHistory();

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
          <h2>{t('globals:sign_up_headline', 'Registrierung')}</h2>
          <br />
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required(t('yup:first_name_required', 'Vornamen eingeben')),
              lastName: Yup.string().required(t('yup:last_name_required', 'Nachnamen eingeben')),
              email: Yup.string().required(t('yup:email_required', 'Email-Adresse eingeben')),
              password: Yup.string()
                .required(t('yup:password_required', 'Passwort eingeben'))
                .min(5, t('yup:password_length', 'Mindestens 5 Zeichen verwenden')),
              confirmPassword: Yup.string()
                .required(t('yup:password_confirm', 'Passwort bestätigen'))
                .when('password', {
                  is: (password) => !!(password && password.length > 0),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    t(
                      ('yup:password_dont_match',
                      'Diese Passwörter stimmen nicht überein. Versuchen Sie es noch einmal.')
                    )
                  )
                })
            })}
            onSubmit={({ firstName, lastName, email, password }, { setStatus, setSubmitting }) => {
              authService.signupUser(firstName, lastName, email, password).then(
                (response) => {
                  setSubmitting(false);
                  if (response.status === 200) {
                    // eslint-disable-next-line no-alert
                    window.alert(
                      t('globals:sign_up_success', 'Registrierung erfolgreich abgeschlossen.')
                    );
                    history.push(`/login`);
                  }
                },
                (error) => {
                  setSubmitting(false);
                  const errorList = (listElement) => (
                    <ul className="list-unstyled content-align-center mb-0">{listElement}</ul>
                  );
                  if (error.data.errors) {
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
                  <label htmlFor="firstName">{t('globals:first_name', 'Vorname')}</label>
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
                  <label htmlFor="lastName">{t('globals:last_name', 'Nachname')}</label>
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
                  <label htmlFor="email">{t('globals:email', 'Email')}</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">{t('globals:password', 'Passwort')}</label>
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
                  <label htmlFor="confirmPassword">
                    {t('yup:password_confirm', 'Passwort bestätigen')}
                  </label>
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
                    {t('globals:sign_up_button', 'Registrieren')}
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
                {status && <div className="alert alert-danger mb-5">{status}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
