const moment = require('moment');

const computeAvgWaitTime = (tickets) => {
  let sum = tickets.reduce((a, b) => {
    return a + Math.abs((new Date(b.claimedAt) - new Date(b.createdAt)));
  }, 0);
  return sum / tickets.length;
};

const computeAveTicketOpeningTime = (tickets) => {
  if (tickets.length <= 1) { return 0; }
  let diff = [];
  for (let i = 0; i < tickets.length - 1; i++) {
    diff.push(Date.parse(tickets[i + 1].createdAt) - Date.parse(tickets[i].createdAt));
  }
  return diff.reduce((a, b) => a + b) / diff.length;
};

const computeCurrWaitTime = (totalAveWait, gap, index) => {
  if (!gap) { return 0; }
  return (totalAveWait - gap) * index;
};

const timefromNow = function(timestamp) { return moment(timestamp).fromNow(); };

module.exports = {
  timefromNow: timefromNow,
  computeAvgWaitTime: computeAvgWaitTime,
  computeAveTicketOpeningTime: computeAveTicketOpeningTime,
  computeCurrWaitTime: computeCurrWaitTime
};
