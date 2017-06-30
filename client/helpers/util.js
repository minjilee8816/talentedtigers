const moment = require('moment');

const timefromNow = (timestamp) => { return moment(timestamp).fromNow(); };

export default timefromNow;
