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

const CustomDateInput = ({ value, onClick }) => (
  <button type="button" className="btn btn-light px-0 py-1" onClick={onClick}>
    {value}
  </button>
);

CustomDateInput.propTypes = { value: String.isRequired, onClick: func.isRequired };

const DateIntervalTable = ({ dateIntervals, setStart, setEnd, remove, add }) => {
  return (
    <div className="table m-0">
      <table className="table table-sm table-borderless m-0 border-top-0">
        <caption className="p-0 pt-2 ml-1">
          The questionnaire will only be accessible between intervals.
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
          {dateIntervals.length ? (
            dateIntervals.map((interval) => {
              return (
                <tr key={interval.id}>
                  <td>
                    <DatePicker
                      selected={moment(interval.start).toDate()}
                      locale={de}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => setStart(interval.id, date)}
                      customInput={<CustomDateInput />}
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
                      onChange={(date) => setEnd(interval.id, date)}
                      customInput={<CustomDateInput />}
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
  dateIntervals: arrayOf(
    shape({ id: String, start: Date, end: Date, setStart: func, setEnd: func })
  ).isRequired,
  setStart: func.isRequired,
  setEnd: func.isRequired,
  remove: func.isRequired,
  add: func.isRequired
};

const DateIntervalSettings = ({ intervals, setIntervals }) => {
  const setStart = (id, date) => {
    const newIntervals = intervals.map((interval) => {
      if (interval.id === id) {
        const updatedInterval = {
          ...interval,
          start: date
        };
        return updatedInterval;
      }
      return interval;
    });
    setIntervals(newIntervals);
  };

  const setEnd = (id, date) => {
    const newIntervals = intervals.map((interval) => {
      if (interval.id === id) {
        const updatedInterval = {
          ...interval,
          end: date
        };
        return updatedInterval;
      }
      return interval;
    });
    setIntervals(newIntervals);
  };

  const addInterval = () => {
    setIntervals((prevState) => [
      ...prevState,
      { id: nanoid(), start: new Date(), end: new Date() }
    ]);
  };

  const removeInterval = (intervalId) => {
    const newIntervals = intervals.filter((prevInterval) => prevInterval.id !== intervalId);
    setIntervals(newIntervals);
  };

  return (
    <div className="d-flex w-100 p-0">
      <div className="col p-0">
        <div className="col p-0">
          <div className="col d-flex justify-content-center p-0">
            <DateIntervalTable
              dateIntervals={intervals}
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
  intervals: arrayOf(shape({ id: string, start: string, end: string })).isRequired,
  setIntervals: func.isRequired
};

export default DateIntervalSettings;
