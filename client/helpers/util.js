const moment = require('moment');

const timefromNow = function(timestamp) {
  return moment(timestamp).fromNow();
};

module.exports = {
  timefromNow: timefromNow
};
