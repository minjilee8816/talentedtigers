const moment = require('moment');

const timeToNow = function(timestamp) {
  return moment(timestamp).toNow();
};

module.exports = {
  timeToNow: timeToNow
};
