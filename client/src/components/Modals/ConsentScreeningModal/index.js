import React, { useState } from 'react';
import { func, string, arrayOf, bool } from 'prop-types';

const ConsentScreeningModal = ({
  consentScript,
  selectionCriteria,
  hasAcceptedConsentForm,
  onAccept,
  onDone
}) => {
  const [accepted, setAccepted] = useState(hasAcceptedConsentForm);
  const [selected, setSelected] = useState([]);

  const handleSelection = (event) => {
    const { value } = event.target;
    if (event.target.checked) {
      setSelected((prevSelected) => [...prevSelected, value]);
    } else {
      setSelected((prevSelected) => prevSelected.filter((prev) => prev !== value));
    }
  };

  const consentContent = (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          Consent form
        </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body text-left">{consentScript}</div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setAccepted(true);
            onAccept();
          }}
        >
          I accept
        </button>
      </div>
    </div>
  );

  const selectionContent = (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">
          Screening
        </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body text-left">
        <ul className="list-group list-group-flush">
          {selectionCriteria &&
            selectionCriteria.map((criteria, index) => (
              <li key={criteria} className="list-group-item">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`check${index}`}
                    value={criteria}
                    onChange={(e) => handleSelection(e)}
                  />
                  <label className="custom-control-label" htmlFor={`check${index}`}>
                    {criteria}
                  </label>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-dismiss="modal"
          onClick={() => onDone(selected)}
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          {accepted ? selectionContent : consentContent}
        </div>
      </div>
    </div>
  );
};

ConsentScreeningModal.propTypes = {
  consentScript: string.isRequired,
  selectionCriteria: arrayOf(string).isRequired,
  hasAcceptedConsentForm: bool.isRequired,
  onAccept: func.isRequired,
  onDone: func.isRequired
};

export default ConsentScreeningModal;
