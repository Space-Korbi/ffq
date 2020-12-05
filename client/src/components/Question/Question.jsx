import React from 'react';
import Help from './Help';

import './Question.css';

const mockInformation =
  'Vivamus sagittis lacus vel augue laoreet rutrum faucibus. is lacus vel augue laoreet rutrum faucibus.Vivamus sagittis lacus vel augue laoreet rutrum faucibus.Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

const Question = () => {
  return (
    <div>
      <div>
        <Help infoText={mockInformation} />
      </div>
    </div>
  );
};

export default Question;
