import React from 'react';
import FrequencyQuestion from '../../components/Question';

const AdminPage = () => {
  return (
    <div>
      <FrequencyQuestion
        title="Rice"
        comment="How large was your portion?"
        leftButtons={['A1', 'A2']}
        rightButtons={['B1', 'B2']}
      />
    </div>
  );
};

export default AdminPage;
