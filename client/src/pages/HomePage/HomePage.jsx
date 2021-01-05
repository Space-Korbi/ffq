/* eslint-disable react/prop-types */
import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

const HomePage = ({ isAdmin, stoppedAtIndex }) => {
  const { url } = useRouteMatch();
  console.log(isAdmin);

  let header = 'Willkommen!';
  let title = `Um die Umfrage zu starten klicken Sie bitte auf "Umfrage starten"`;
  let button = `Umfrage starten`;

  if (stoppedAtIndex > -1 && !isAdmin) {
    header = 'Willkommen zurück!';
    title = `Um die Umfrage fortzusetzen klicken Sie bitte auf "Umfrage fortsetzen"`;
    button = `Umfrage fortsetzen`;
  }
  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="jumbotron text-center" style={{ maxWidth: '800px' }}>
        <h1 className="display-4">{header}</h1>
        <p className="lead">{title}</p>
        <hr className="my-4" />
        <div className="text-center">
          <Link className="btn btn-primary btn-large" to={`${url}/questionnairePresenter`}>
            {button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
