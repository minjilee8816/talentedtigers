import React from 'react';
import ReactDOM from 'react-dom';

const WaitTime = ({statistic}) => (
  <div id="wait_time">
    Estimated wait time: {Math.floor((statistic.waitTime) / 1000 / 60)} minutes
  </div>
);

export default WaitTime;
