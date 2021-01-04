import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

const WelcomePage = () => {
  const { url } = useRouteMatch();

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="jumbotron" style={{ maxWidth: '800px' }}>
        <h1 className="display-4">Hallo</h1>
        <p className="lead">
          Um die Umfrage zu starten klicken sie bitte &apos;Umfrage Starten&apos;
        </p>
        <hr className="my-4" />
        <Link className="btn btn-primary btn-large" to={`${url}/questionnairePresenter`}>
          Umfrage Starten
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
