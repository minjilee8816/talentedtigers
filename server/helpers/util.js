const addLeadingZero = function(n) {
  return n < 10 ? '0' + n : n;
};

const pad = function(number, length) {
  number = number + '';
  return number.length >= length ? number : new Array(length - number.length + 1).join('0') + number;
};

const getCurrentTime = function() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = addLeadingZero(now.getUTCMonth());
  const day = addLeadingZero(now.getUTCDate());
  const hour = addLeadingZero(now.getUTCHours());
  const min = addLeadingZero(now.getUTCMinutes());
  const sec = addLeadingZero(now.getUTCSeconds());

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
};

const computeAvgWaitTime = (tickets) => {
  return tickets.reduce((acc, curr) => {
    return acc + (Date.parse(curr.claimedAt) - Date.parse(curr.createdAt));
  }, 0) / tickets.length;
};

module.exports = {
  getCurrentTime: getCurrentTime,
  addLeadingZero: addLeadingZero,
  pad: pad,
  computeAvgWaitTime: computeAvgWaitTime
};
