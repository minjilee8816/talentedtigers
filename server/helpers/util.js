const computeAvgWaitTime = (tickets) => {
  let sum = tickets.reduce((acc, curr) => {
    return acc + (Date.parse(curr.claimedAt) - Date.parse(curr.createdAt));
  }, 0);
  return Math.floor(sum / tickets.length);
};

module.exports = {
  computeAvgWaitTime: computeAvgWaitTime
};
