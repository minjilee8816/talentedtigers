'use strict';

const reducedToDay = date => date % 604800000 < 86400000;

var displayAlert = function displayAlert(message, type) {
  document.querySelector('#alert_main').className = 'alert alert-main alert-' + type;
  document.querySelector('#alert_main').textContent = message;
  document.querySelector('#alert_main').style.top = '0';
  setTimeout(function () {
    document.querySelector('#alert_main').style.top = '-36px';
  }, 3000);
};

var connectionCount = function connectionCount(students, mentors, admins) {
  var res = {
    student: Object.keys(students).length,
    mentor: Object.keys(mentors).length,
    admin: Object.keys(admins).length
  };
  return res;
};

const computeAvgWaitTime = (tickets, mentors, userId) => {
  const storage = [];
  let length = tickets.length;
  let count = 0;
  let sum = tickets.reduce((acc, curr) => {
    let date = Date.parse(curr.claimedAt);
    let wait = date - Date.parse(curr.createdAt);
    if(reducedToDay(date) && curr.claimedAt) { 
      storage.push(curr);
      return acc + wait; 
   } 
    return acc;
  }, 0);
  let queuePos = tickets.filter((ticket) => { return ticket.status === 'Opened' }).sort((ticket1, ticket2) => Date.parse(ticket1.createdAt) - Date.parse(ticket2.createdAt)).findIndex((ticket) => ticket.userId == userId ) + 1;
  let quantityClaimedAndUnclosed = tickets.filter((ticket) => { return ticket.claimedAt && !ticket.closedAt }).length;
  let openTickets = tickets.filter((ticket) => { return ticket.status == 'Opened' });
  if(queuePos === 0){queuePos = openTickets.length + 1};
  // keep this line for realtime data and delete line 21 with the hard code:
  // let excessMentors = mentors - quantityClaimedAndUnclosed;
  const excessMentors = 2;
  const estimatedInterval = new Date(sum / storage.length).getUTCMinutes();
  let estimate = 0;
  let countAvail = excessMentors;
  queuePos == 0 ? queuePos = quantityClaimedAndUnclosed.length: queuePos = queuePos;
  if (queuePos >= 0) {
    for(let i = 0; i < queuePos; i++) {
      if(i+1 < countAvail && countAvail) {
        estimate += estimatedInterval / (excessMentors*excessMentors);
      } else {

        estimate += estimatedInterval / excessMentors;
      }
    } 
    return estimate;
  }
}

module.exports = {
  displayAlert: displayAlert,
  computeAvgWaitTime: computeAvgWaitTime,
  connectionCount: connectionCount
};
