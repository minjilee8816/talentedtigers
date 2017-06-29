const computeAvgWaitTime = (tickets) => {
  let sum = tickets.reduce((acc, curr) => {
    return acc + (Date.parse(curr.claimedAt) - Date.parse(curr.createdAt));
  }, 0);
  return sum / tickets.length;
};

module.exports = {
  computeAvgWaitTime: computeAvgWaitTime
};
