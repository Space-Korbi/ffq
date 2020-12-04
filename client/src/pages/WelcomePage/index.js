import React from 'react';

const WelcomePage = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="jumbotron" style={{ maxWidth: '800px' }}>
        <h1 className="display-4">Hallo</h1>
        <p className="lead">Um das FFQ zu starten klicken sie bitte &apos;FFQ Starten&apos;</p>
        <hr className="my-4" />
        <button type="button" className="btn btn-primary btn-large">
          FFQ Starten
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
