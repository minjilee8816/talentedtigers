const pad = function(number, length) {
  number = number + '';
  return number.length >= length ? number : new Array(length - number.length + 1).join('0') + number;
};

const computeAvgWaitTime = (tickets) => {
  return tickets.reduce((acc, curr) => {
    return acc + (Date.parse(curr.claimedAt) - Date.parse(curr.createdAt));
  }, 0) / tickets.length;
};

module.exports = {
  pad: pad,
  computeAvgWaitTime: computeAvgWaitTime
};
