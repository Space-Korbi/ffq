/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { difference } from 'lodash';
import moment from 'moment/min/moment-with-locales';

const QuestionnaireInfo = ({
  userProp,
  iterationsProp,
  setDisabled,
  setButtonTitle,
  setIterationId
}) => {
  moment.locale('de');

  const [title, setTitle] = useState('');
  const [daysTilStart, setDaysTilStart] = useState('');
  const [accessInformation, setAccessInformation] = useState('');

  const getNextInterval = (iterations) => {
    const now = moment().toDate();
    const upcomingIteration = iterations.filter((iteration) => {
      if (
        moment(now).isSameOrBefore(iteration.start, 'day') ||
        moment(now).isSameOrBefore(iteration.end, 'day')
      ) {
        return true;
      }
      return false;
    });

    return upcomingIteration;
  };

  const getFinishedIterations = (user) => {
    const finishedIterations = user.iterations.filter((iteration) => {
      return moment(iteration.finishedAt) < moment().toDate();
    });
    return finishedIterations;
  };

  const updateInformation = (iterations, user) => {
    const now = moment().toDate();

    const nextIntervals = getNextInterval(iterations);
    const finishedIterations = getFinishedIterations(user);

    if (!nextIntervals.length) {
      setTitle('Die Umfrage ist abgeschlossen.\n \nVielen Dank für Ihre Teilnahme.');
      setDisabled(true);
    }

    const userHasFinishedIteration = (iteration) => {
      if (finishedIterations.find((finishedIteration) => finishedIteration.id === iteration.id)) {
        return true;
      }
      return false;
    };

    const nextIteration = nextIntervals.find((iteration) => {
      return !userHasFinishedIteration(iteration);
    });

    if (!nextIteration) {
      setTitle('Die Umfrage ist abgeschlossen.\n \nVielen Dank für Ihre Teilnahme.');
      setDisabled(true);
      return;
    }
    setAccessInformation(
      `Die Umfrage kann vom ${nextIteration.startLabel} bis zum ${nextIteration.endLabel} ausgefüllt werden.`
    );

    if (moment(now).isBefore(nextIteration.start, 'day')) {
      setTitle('Die nächste Umfrage beginnt');
      setDaysTilStart(moment(nextIteration.start).fromNow());
      setDisabled(true);
      setIterationId(nextIteration.id);
    }
    if (
      moment(now).isSameOrAfter(nextIteration.start, 'day') &&
      moment(now).isSameOrBefore(nextIteration.end, 'day')
    ) {
      // get current unfinished iteration by getting difference between all iterations and finished iterations
      const unfinishedIteration = difference(user.iterations, finishedIterations)[0];
      // check if iteration has been started before
      if (unfinishedIteration && moment(now).isSameOrAfter(unfinishedIteration.startedAt, 'day')) {
        setButtonTitle('Umfrage fortsetzen');
      }
      setIterationId(nextIteration.id);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (userProp && iterationsProp) {
      updateInformation(iterationsProp, userProp);
    }
  }, [userProp, iterationsProp]);

  return (
    <>
      <p className="display-4 my-5">Willkommen</p>
      <h4 className="" style={{ whiteSpace: 'pre-wrap' }}>
        {title}
      </h4>
      <h2 className="my-3">
        <span className="badge badge-secondary">{daysTilStart}</span>
      </h2>
      <p className="lead mt-5">{accessInformation}</p>
      <hr className="my-4" style={{ maxWidth: '800px' }} />
    </>
  );
};

QuestionnaireInfo.propTypes = {};

export default QuestionnaireInfo;
