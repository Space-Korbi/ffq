/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// helpers
import { dateHelper } from '../../helpers';

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
    formatter: (cellContent) => {
      if (cellContent === 'accept') {
        return <span className="badge badge-success">Accepted</span>;
      }
      if (cellContent === 'reject') {
        return <span className="badge badge-danger">Rejected</span>;
      }
      if (cellContent === 'wait') {
        return <span className="badge badge-warning">Waiting</span>;
      }
      return cellContent;
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
    dataField: 'personalData',
    text: 'Personal Data'
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

const ParticipantsTable = ({ fileName, data, columns, iterationSelector }) => {
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
