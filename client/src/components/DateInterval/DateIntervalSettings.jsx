import React from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { nanoid } from 'nanoid';
import moment from 'moment';

// date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import de from 'date-fns/locale/de';

// components
import { DeleteButton, AddButton } from '../Button';

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

const DateIntervalTable = ({ iterations, setStart, setEnd, remove, add }) => {
  return (
    <div className="table m-0">
      <table className="table table-sm table-borderless m-0 border-top-0">
        <caption className="p-0 pt-2 ml-1">
          The questionnaire can be accessed in between each interval, start and end date included.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="pt-0">
              Start
            </th>
            <th scope="col" className="pt-0">
              End
            </th>
            <th scope="col" className="pt-0">
              <AddButton onClick={() => add()} styling="float-right btn-outline-primary" />
            </th>
          </tr>
        </thead>
        <tbody>
          {iterations.length ? (
            iterations.map((interval) => {
              return (
                <tr key={interval.id}>
                  <td>
                    <DatePicker
                      selected={moment(interval.start).toDate()}
                      locale={de}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) =>
                        setStart(interval.id, moment(date).startOf('day').toISOString())
                      }
                      minDate={moment().toDate()}
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: '10px'
                        }
                      }}
                    />
                  </td>
                  <td>
                    <DatePicker
                      selected={moment(interval.end).toDate()}
                      locale={de}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) =>
                        setEnd(interval.id, moment(date).endOf('day').toISOString())
                      }
                      popperPlacement="top-left"
                      minDate={moment(interval.start).toDate()}
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: '-40px'
                        }
                      }}
                    />
                  </td>
                  <td className="align-middle">
                    <DeleteButton onClick={() => remove(interval.id)} styling="float-right" />
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

DateIntervalTable.propTypes = {
  iterations: arrayOf(
    shape({
      id: string,
      start: string,
      end: string
    })
  ).isRequired,
  setStart: func.isRequired,
  setEnd: func.isRequired,
  remove: func.isRequired,
  add: func.isRequired
};

const DateIntervalSettings = ({ iterations, setIterations }) => {
  const setStart = (id, date) => {
    const newIntervals = iterations.map((interval) => {
      if (interval.id === id) {
        const updatedInterval = {
          ...interval,
          start: date,
          startLabel: moment(date).format('DD.MM.YY')
        };
        return updatedInterval;
      }
      return interval;
    });
    setIterations(newIntervals);
  };

  const setEnd = (id, date) => {
    const newIntervals = iterations.map((interval) => {
      if (interval.id === id) {
        const updatedInterval = {
          ...interval,
          end: date,
          endLabel: moment(date).format('DD.MM.YY')
        };
        return updatedInterval;
      }
      return interval;
    });
    setIterations(newIntervals);
  };

  const addInterval = () => {
    setIterations((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        start: moment().toISOString(),
        startLabel: moment().format('DD.MM.YY'),
        end: moment().toISOString(),
        endLabel: moment().format('DD.MM.YY')
      }
    ]);
  };

  const removeInterval = (intervalId) => {
    const newIntervals = iterations.filter((prevInterval) => prevInterval.id !== intervalId);
    setIterations(newIntervals);
  };

  return (
    <div className="d-flex w-100 p-0">
      <div className="col p-0">
        <div className="col p-0">
          <div className="col d-flex justify-content-center p-0">
            <DateIntervalTable
              iterations={iterations}
              setStart={setStart}
              setEnd={setEnd}
              remove={removeInterval}
              add={addInterval}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

DateIntervalSettings.propTypes = {
  iterations: arrayOf(shape({ id: string, start: string, end: string })).isRequired,
  setIterations: func.isRequired
};

export default DateIntervalSettings;
