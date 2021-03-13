/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// localization
import { useTranslation } from 'react-i18next';

// services
import { userService } from '../../services';

// helpers
import { dateHelper } from '../../helpers';

const ExportCSVButton = (props) => {
  const { t } = useTranslation(['globals']);

  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button type="button" className="btn btn-outline-success" onClick={handleClick}>
        {t(('globals:export_csv', 'Als CSV exportieren'))}
      </button>
    </div>
  );
};

const ScreeningStatusCell = ({ content, userId }) => {
  const { t } = useTranslation(['globals']);

  const [status, setStatus] = useState(content);

  const handleStatusSelection = async (selection) => {
    await userService.updateUserData(userId, { screeningStatus: selection }).then(() => {
      setStatus(selection);
    });
  };

  return (
    <>
      {status === 'Accept' && (
        <span className="badge badge-success"> {t('globals:accepted', 'Akzeptiert')}</span>
      )}
      {status === 'Reject' && (
        <span className="badge badge-danger">{t('globals:rejected', 'Abgelehnt')}</span>
      )}
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
            {t('globals:waiting', 'Wartet')}
          </button>
          <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
            <button
              type="button"
              className="dropdown-item"
              onClick={() => handleStatusSelection('Accept')}
            >
              <span className="badge badge-success">{t('globals:accept', 'Akzeptieren')}</span>
            </button>
            <div className="dropdown-divider" />
            <button
              type="button"
              className="dropdown-item"
              onClick={() => handleStatusSelection('Reject')}
            >
              <span className="badge badge-danger">{t('globals:reject', 'Ablehnen')}</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

const ParticipantsTable = ({ fileName, data, columns, iterationSelector }) => {
  const { t } = useTranslation(['globals']);

  const staticColumns = [
    {
      dataField: 'email',
      text: t('globals:email', 'Email')
    },
    {
      dataField: 'firstName',
      text: t('globals:first_name', 'Vorname')
    },
    {
      dataField: 'lastName',
      text: t('globals:last_name', 'Nachname')
    },
    {
      dataField: 'hasAcceptedConsentForm',
      text: t('globals:consent_form', 'Einverständniserklärung'),
      formatter: (cellContent) => {
        if (cellContent) {
          return <span className="badge badge-success">{t('globals:accepted', 'Akzeptiert')}</span>;
        }
        return (
          <span className="badge badge-danger">
            {t('globals:not_yet_accept', 'Noch nicht akzeptiert')}
          </span>
        );
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
      text: t('globals:data', 'Angaben'),
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
      text: t('globals:started', 'Gestarted'),
      formatter: (cellContent) => {
        return dateHelper.applyDateStyle(cellContent);
      }
    },
    {
      dataField: 'iterations[0].finishedAt',
      text: t('globals:finished', 'Beendet'),
      formatter: (cellContent) => {
        return dateHelper.applyDateStyle(cellContent);
      }
    },
    {
      dataField: 'iterations[0].pausedAt',
      text: t('globals:paused_at', 'Pausiert bei'),
      formatter: (cellContent) => {
        if (!cellContent) {
          return '';
        }
        const formatted = cellContent.map((content) => {
          return <li key={content}>{content}</li>;
        });
        return (
          <small>
            <ul className="list content-align-center mb-0">{formatted}</ul>
          </small>
        );
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
            <div className="row no-gutters">
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
