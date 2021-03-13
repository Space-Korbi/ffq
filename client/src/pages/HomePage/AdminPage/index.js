/* eslint-disable no-unused-vars */
import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { PencilIcon, TelescopeIcon, ClippyIcon, PersonIcon } from '@primer/octicons-react';

const AdminPage = () => {
  const { url } = useRouteMatch();

  return (
    <div className="p-4 d-flex-block text-center">
      <div className="row">
        <div className="col d-flex-block">
          <p className="h2 my-3">Willkommen</p>

          <hr className="my-4" style={{ maxWidth: '800px' }} />
        </div>
      </div>
      <div
        className="row row-cols-1 row-cols-md-2 justify-content-center mx-auto"
        style={{ maxWidth: '800px' }}
      >
        <div className="col mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">FFQ Editor</h5>
              <PencilIcon size={48} />
              <p className="card-text my-2">Bearbeite deinen Fragebogen</p>
              <Link to={`${url}/questionnaireEditor`} className="p-0 m-0 border-0 stretched-link">
                {' '}
              </Link>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">FFQ Vorschau</h5>
              <TelescopeIcon size={48} />
              <p className="card-text my-2">Klicken dich durch eine Vorschau des Fragebogens</p>
              <Link
                to={`${url}/questionnairePresenter/iteration/0`}
                className="p-0 m-0 border-0 stretched-link"
              >
                {' '}
              </Link>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">User Manager</h5>
              <ClippyIcon size={48} />
              <p className="card-text my-2">Verwalte die Teilnehmer und werte ihre Antworten aus</p>
              <Link to={`${url}/participantsManager`} className="p-0 m-0 border-0 stretched-link">
                {' '}
              </Link>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Account</h5>
              <PersonIcon size={48} />
              <p className="card-text my-2">Ändere dein Passwort oder deine Nutzerdaten</p>
              <Link to={`${url}/account`} className="p-0 m-0 border-0 stretched-link">
                {' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
