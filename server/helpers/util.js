const computeAvgWaitTime = (tickets) => {
  return tickets.reduce((acc, curr) => {
    return acc + (Date.parse(curr.claimedAt) - Date.parse(curr.createdAt));
  }, 0) / tickets.length;
};

module.exports = {
  computeAvgWaitTime: computeAvgWaitTime
};
