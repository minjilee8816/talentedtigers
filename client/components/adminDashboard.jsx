import React from 'react';
import ReactDom from 'react-dom';
import AddUser from './addUser.jsx';
import AdminFilter from './adminFilter.jsx';

const AdminDashboard = ({filterTickets, statistic, ticketCategoryList}) => (
  <div id="admin-dashboard">
    <h4>{statistic.studentNum} + StudentCount Placeholder</h4>
    <h4>{statistic.mentorNum} + MentorCount Placeholder</h4>
    <h4>{statistic.currAveWait} + Average Wait Placeholder</h4>
    <AddUser />
    <AdminFilter filterTickets={filterTickets} ticketCategoryList={ticketCategoryList}/>
  </div>
);

export default AdminDashboard;
