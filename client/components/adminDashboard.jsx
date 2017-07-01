import React from 'react';
import ReactDom from 'react-dom';
import AddUser from './addUser.jsx';
import AdminFilter from './adminFilter.jsx';

const AdminDashboard = ({filterTickets, onlineUsers, ticketCategoryList}) => (
  <div id="admin_dashboard">
    <div className="col-xs-12 admin_dashboard_title"><h2>Admin Dashboard</h2></div>
    <h4>Active Students: {onlineUsers.student}
      <span className='admin_dashboard_span'>Current Open Tickets: {onlineUsers.open}</span>
    </h4>
    <h4>Active Mentors: {onlineUsers.mentor}
      <span className='admin_dashboard_span'>Tickets Closed Today: {onlineUsers.closed}</span>
    </h4>
    <h4>Current Average Wait Time: {onlineUsers.currAveWait} minutes
      <span className='admin_dashboard_span'>Most Popular Category Today: {onlineUsers.popularCategory}</span>
    </h4>
    <AddUser />
    <AdminFilter filterTickets={filterTickets} ticketCategoryList={ticketCategoryList}/>
  </div>
);



export default AdminDashboard;
