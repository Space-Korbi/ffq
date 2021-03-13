import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import moment from 'moment';

// date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import de from 'date-fns/locale/de';

// localization
import { useTranslation } from 'react-i18next';

// components
import { DeleteButton } from '../Button';

// Using custom component works but throws errors.
// Wait till fixed before using it
/*
const CustomDateInput = ({ value, onClick }) => (
  <button type="button" className="btn btn-light px-0 py-1" onClick={onClick}>
    {value}
  </button>
);

CustomDateInput.propTypes = { value: string.isRequired, onClick: func.isRequired };
// */

const IterationsTableXs = ({ iterations, setStart, setEnd, remove }) => {
  const { t } = useTranslation(['globals']);

  return (
    <div className="table m-0">
      <table className="table table-sm table-borderless m-0 border-top-0">
        <caption className="p-0 pt-2 ml-1">
          {t(
            'globals:iteration_caption',
            'Der Fragebogen kann nur zwischen Startdatum und Enddatum jeder Wiederholung ausgefüllt werden.'
          )}
        </caption>

        <tbody>
          {iterations.length ? (
            iterations.map((iteration, index) => {
              return (
                <tr
                  key={iteration.id}
                  className={index === iterations.length - 1 ? '' : 'border-bottom'}
                >
                  <td className="align-middle p-0">
                    <div className="row row-cols-2 mb-2">
                      <div className="col-2">
                        <b>Start</b>
                      </div>
                      <div className="col-auto">
                        <DatePicker
                          selected={moment(iteration.start).toDate()}
                          locale={de}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) =>
                            setStart(iteration.id, moment(date).startOf('day').toISOString())
                          }
                          minDate={moment().toDate()}
                          popperPlacement="top-left"
                        />
                      </div>
                    </div>

                    <div className="row row-cols-2 mb-2">
                      <div className="col-2">
                        <b>End</b>
                      </div>
                      <div className="col-auto">
                        <DatePicker
                          selected={moment(iteration.end).toDate()}
                          locale={de}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) =>
                            setEnd(iteration.id, moment(date).endOf('day').toISOString())
                          }
                          popperPlacement="top-left"
                          minDate={moment(iteration.start).toDate()}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="m-0 pr-0 align-middle">
                    <DeleteButton onClick={() => remove(iteration.id)} styling="float-right" />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">
                <div className="d-flex flex-column text-center">
                  <span className="badge badge-warning">Empty</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

IterationsTableXs.propTypes = {
  iterations: arrayOf(
    shape({
      id: string,
      start: string,
      startLabel: string,
      end: string,
      endLabel: string
    })
  ).isRequired,
  setStart: func.isRequired,
  setEnd: func.isRequired,
  remove: func.isRequired
};

const IterationsTableLg = ({ iterations, setStart, setEnd, remove }) => {
  const { t } = useTranslation(['globals']);

  return (
    <div className="table m-0">
      <table className="table table-sm table-borderless m-0 border-top-0">
        <caption className="p-0 pt-2 ml-1">
          {t(
            'globals:iteration_caption',
            'Der Fragebogen kann nur zwischen Startdatum und Enddatum jeder Wiederholung ausgefüllt werden.'
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="pt-0 pl-0">
              {t('globals:start', 'Start')}
            </th>
            <th scope="col" className="pt-0 pl-0">
              {t('globals:end', 'Ende')}
            </th>
          </tr>
        </thead>
        <tbody>
          {iterations.length ? (
            iterations.map((iteration) => {
              return (
                <tr key={iteration.id}>
                  <td className="pl-0">
                    <DatePicker
                      selected={moment(iteration.start).toDate()}
                      locale={de}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) =>
                        setStart(iteration.id, moment(date).startOf('day').toISOString())
                      }
                      minDate={moment().toDate()}
                    />
                  </td>
                  <td className="pl-0">
                    <DatePicker
                      selected={moment(iteration.end).toDate()}
                      locale={de}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) =>
                        setEnd(iteration.id, moment(date).endOf('day').toISOString())
                      }
                      popperPlacement="top-left"
                      minDate={moment(iteration.start).toDate()}
                    />
                  </td>
                  <td className="align-middle p-0">
                    <DeleteButton onClick={() => remove(iteration.id)} styling="float-right" />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">
                <div className="d-flex flex-column text-center">
                  <span className="badge badge-warning">Empty</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

IterationsTableLg.propTypes = {
  iterations: arrayOf(
    shape({
      id: string,
      start: string,
      startLabel: string,
      end: string,
      endLabel: string
    })
  ).isRequired,
  setStart: func.isRequired,
  setEnd: func.isRequired,
  remove: func.isRequired
};

const IterationsSettings = ({ iterations, setIterations }) => {
  const setStart = (id, date) => {
    const newIterations = iterations.map((iteration) => {
      if (iteration.id === id) {
        const updatedIteration = {
          ...iteration,
          start: date,
          startLabel: moment(date).format('DD.MM.YY')
        };
        return updatedIteration;
      }
      return iteration;
    });
    setIterations(newIterations);
  };

  const setEnd = (id, date) => {
    const newIterations = iterations.map((iteration) => {
      if (iteration.id === id) {
        const updatedIteration = {
          ...iteration,
          end: date,
          endLabel: moment(date).format('DD.MM.YY')
        };
        return updatedIteration;
      }
      return iteration;
    });
    setIterations(newIterations);
  };

  const removeIteration = (iterationId) => {
    const newIterations = iterations.filter((prevIteration) => prevIteration.id !== iterationId);
    setIterations(newIterations);
  };

  return (
    <div className="d-flex w-100 p-0">
      <div className="row no-gutters w-100 flex-row flex-nowrap">
        <div className="col d-none d-sm-block w-100 justify-content-center p-0">
          <IterationsTableLg
            iterations={iterations}
            setStart={setStart}
            setEnd={setEnd}
            remove={removeIteration}
          />
        </div>
        <div className="col d-block d-sm-none justify-content-center p-0 ">
          <IterationsTableXs
            iterations={iterations}
            setStart={setStart}
            setEnd={setEnd}
            remove={removeIteration}
          />
        </div>
      </div>
    </div>
  );
};

IterationsSettings.propTypes = {
  iterations: arrayOf(shape({ id: string, start: string, end: string })).isRequired,
  setIterations: func.isRequired
};

export default IterationsSettings;
