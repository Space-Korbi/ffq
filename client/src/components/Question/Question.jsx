import React from 'react';
import Help from './Help';

const mockInformation = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

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
