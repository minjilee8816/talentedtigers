
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
  return diff.reduce((a, b) => { return a + b; }) / diff.length;
};

const computeCurrWaitTime = (totalAveWait, gap, index) => {
  if (!gap) { return 0; }
  return (totalAveWait - gap) * index;
};

const adminStats = function(ticketArr) {
  var dashboardStats = {
    open: 0, 
    closed: 0,
    popularCategory: '', 
    popularCategoryCount: 0
  };
  var categories = {};
  for (var i = 0; i < ticketArr.length; i++) {
    if(Date.parse(ticketArr[i].dataValues.createdAt) > new Date() - 1 * 24 * 60 * 60 * 1000) {
      console.log('YOU ARE HERE!');    
      ticketArr[i].status === 'Closed' ? dashboardStats.closed++ : dashboardStats.open++ ;
      
      if (categories[ticketArr[i].category] !== undefined) {
        categories[ticketArr[i].category]++; 
      } else {
        categories[ticketArr[i].category] = 1;
      } 
      
      if (categories[ticketArr[i].category] > dashboardStats.popularCategoryCount) {
        dashboardStats.popularCategory = ticketArr[i].category;
        dashboardStats.popularCategoryCount = categories[ticketArr[i].category];
      }
    }
  }
  return dashboardStats;
};

module.exports = {
  computeAvgWaitTime: computeAvgWaitTime,
  computeAveTicketOpeningTime: computeAveTicketOpeningTime,
  computeCurrWaitTime: computeCurrWaitTime,
  adminStats: adminStats
};
