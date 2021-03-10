import React, { useState } from 'react';
import { bool, shape, string } from 'prop-types';

import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

// components
import Spinner from '../../components/Spinner';
import { userService } from '../../services';

function EditPersonalInfo({ userId, isAdmin, personalInfo }) {
  const { t } = useTranslation(['global', 'yup']);

  const [didChange, setdidChange] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          email: personalInfo.email
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required(t(('yup:first_name_required', 'Vornamen eingeben'))),
          lastName: Yup.string().required(t(('yup:last_name_required', 'Nachnamen eingeben'))),
          email: Yup.string()
            .email()
            .required(t(('yup:email_required', 'Email-Adresse eingeben')))
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={({ firstName, lastName, email }, { setStatus, setSubmitting }) => {
          if (didChange) {
            userService
              .updateUserData(userId, { firstName, lastName, email })
              .then(() => {
                setStatus(
                  <div className="alert alert-success mb-5">
                    {t(('globals:changes_save_success', 'Änderungen erfolgreich gespeichert.'))}
                  </div>
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
              <div className="d-flex align-items-end justify-content-between">
                <div className="col p-0">
                  <p className="align-bottom text-nowrap m-0 mb-1 lead">
                    {t(('globals:personal_info_headline', 'Persönliche Informationen'))}
                  </p>
                </div>
                <div className="col flex-grow-1 p-0">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm ml-auto mb-1 float-right"
                    disabled={isSubmitting}
                  >
                    <>
                      {isSubmitting ? (
                        <Spinner className="spinner-border spinner-border-sm ml-1" />
                      ) : (
                        t(('globals:"save_changes', 'Änderung speichern'))
                      )}
                    </>
                  </button>
                </div>
              </div>
            </div>
            <hr className="m-0 mb-3" />
            <div className="row">
              <div className="col-lg-4 mb-2 mb-lg-0">
                <div className="form-group mb-lg-0">
                  <label htmlFor="inputFirstName">{t(('globals:firstName', 'Vorname'))}</label>
                  <Field
                    type="text"
                    name="firstName"
                    className={`form-control${errors.firstName ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="col-lg-4 mb-2 mb-lg-0">
                <div className="form-group mb-lg-0">
                  <label htmlFor="inputLastName">{t(('globals:lastName', 'Nachname'))}</label>
                  <Field
                    type="text"
                    name="lastName"
                    className={`form-control${errors.lastName ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="col-lg-4 mb-lg-0">
                <div className="form-group mb-0">
                  <label htmlFor="inputEmail">{t(('globals:email', 'Email'))}</label>
                  <Field
                    name="email"
                    type="email"
                    disabled={!isAdmin}
                    className={`form-control${errors.email ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
              </div>
            </div>
            <div className="mt-4">{status}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

EditPersonalInfo.propTypes = {
  userId: string.isRequired,
  isAdmin: bool.isRequired,
  personalInfo: shape({ firstName: string, lastName: string.isRequired, email: string.isRequired })
    .isRequired
};

export default EditPersonalInfo;
