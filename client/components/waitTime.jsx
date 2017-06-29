import React from 'react';
import ReactDOM from 'react-dom';

const WaitTime = ({statistic}) => (
  <div id="wait_time">
    Est. wait time {statistic.currAveWait / 1000 / 60 || ''}
  </div>
);

export default WaitTime;
