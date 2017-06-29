import React from 'react';
import ReactDom from 'react-dom';
import AddUser from './addUser.jsx';
import AdminFilter from './adminFilter.jsx';

const AdminDashboard = ({filterTickets, statistic, ticketCategoryList}) => (
<<<<<<< HEAD
  <div id="admin-dashboard">
    <h4>Active Students: {statistic.studentNum}</h4>
    <h4>Active Mentors: {statistic.mentorNum}</h4>
    <h4>Current Average Wait Time: {statistic.waitTime} minutes</h4>
=======
  <div id="admin_dashboard">
    <div className="col-xs-12 admin_dashboard_title"><h2>Admin Dashboard</h2></div>
    <h4>Active Students:  {statistic.studentNum}
      <span className='admin_dashboard_span'>Current Open Tickets:  5</span>
    </h4>
    <h4>Active Mentors:  {statistic.mentorNum}
      <span className='admin_dashboard_span'>Tickets Closed Today:  5</span>
    </h4>
    <h4>Current Average Wait Time:  {statistic.currAveWait} minutes
      <span className='admin_dashboard_span'>Most Popular Category Today:  React</span>
    </h4>
>>>>>>> lays out admin dashboard title and span
    <AddUser />
    <AdminFilter filterTickets={filterTickets} ticketCategoryList={ticketCategoryList}/>
  </div>
);

export default AdminDashboard;
