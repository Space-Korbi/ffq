/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// services
import { userService } from '../../services';

// helpers
import { dateHelper } from '../../helpers';

const ExportCSVButton = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button type="button" className="btn btn-outline-success" onClick={handleClick}>
        Export to CSV
      </button>
    </div>
  );
};

const ScreeningStatusCell = ({ content, userId }) => {
  const [status, setStatus] = useState(content);

  const handleStatusSelection = async (selection) => {
    await userService.updateUserData(userId, { screeningStatus: selection }).then(() => {
      setStatus(selection);
    });
  };

  return (
    <>
      {status === 'Accept' && <span className="badge badge-success">Accepted</span>}
      {status === 'Reject' && <span className="badge badge-danger">Rejected</span>}
      {status === 'Wait' && (
        <>
          <button
            className="badge badge-warning dropdown-toggle border-0"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Waiting
          </button>
          <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
            <button
              type="button"
              className="dropdown-item"
              onClick={() => handleStatusSelection('Accept')}
            >
              <span className="badge badge-success">Accept</span>
            </button>
            <div className="dropdown-divider" />
            <button
              type="button"
              className="dropdown-item"
              onClick={() => handleStatusSelection('Reject')}
            >
              <span className="badge badge-danger">Reject</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

const ParticipantsTable = ({ fileName, data, columns, iterationSelector }) => {
  const staticColumns = [
    {
      dataField: 'email',
      text: 'Email'
    },
    {
      dataField: 'firstName',
      text: 'First Name'
    },
    {
      dataField: 'lastName',
      text: 'Last Name'
    },
    {
      dataField: 'hasAcceptedConsentForm',
      text: 'Consent Form',
      formatter: (cellContent) => {
        if (cellContent) {
          return <span className="badge badge-success">Accepted</span>;
        }
        return <span className="badge badge-danger">Not yet accepted</span>;
      }
    },
    {
      dataField: 'screeningStatus',
      text: 'Screening Status',
      formatter: (cellContent, user) => {
        return <ScreeningStatusCell content={cellContent} userId={user.id} />;
      }
    },
    {
      dataField: 'screeningData',
      text: 'Screening Data',
      formatter: (cellContent) => {
        const formatted = cellContent.map((content) => {
          return <li key={content}>{content}</li>;
        });
        return (
          <small>
            <ul className="list content-align-center mb-0">{formatted}</ul>
          </small>
        );
      }
    },
    {
      dataField: 'iterations[0].startedAt',
      text: 'Started',
      formatter: (cellContent) => {
        return dateHelper.applyDateStyle(cellContent);
      }
    },
    {
      dataField: 'iterations[0].finishedAt',
      text: 'Finished',
      formatter: (cellContent) => {
        return dateHelper.applyDateStyle(cellContent);
      }
    }
  ];

  return (
    <div>
      <ToolkitProvider
        keyField="email"
        data={data}
        columns={staticColumns.concat(columns)}
        bootstrap4
        exportCSV={{ fileName }}
      >
        {(props) => (
          <div>
            <div className="row">
              <div className="col d-inline-flex">
                <div className="mr-3">
                  <ExportCSVButton {...props.csvProps} />
                </div>
                {iterationSelector}
              </div>
            </div>
            <br />
            <div className="row no-gutters overflow-auto flex-row flex-nowrap">
              <div className="col">
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  striped
                  hover
                  noDataIndication="No participants data"
                />
              </div>
            </div>
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

ParticipantsTable.propTypes = {};

export default ParticipantsTable;
