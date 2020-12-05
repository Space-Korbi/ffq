import React from 'react';

const Jumbotron = () => {
  return (
    <div className="jumbotron jumbotron-fluid jumbotron-question">
      <div className="container">
        <h1 className="display-4">Weißer Reis</h1>
        <h5 className="lead">
          z.B. Basmati, Langkornreis, aromatisierter Reis, Mikrowellenreis; NUR in SELBST
          zubereiteten Speisen (z.B. Risotto).
        </h5>
        <hr className="my-2" />
        <h6>
          KEIN Naturreis (brauner Reis, Vollkornreis) oder Milchreis; KEIN Reis in Takeaway,
          Fertiggerichten oder Restaurantspeisen.
        </h6>
      </div>
    </div>
  );
};

export default Jumbotron;
