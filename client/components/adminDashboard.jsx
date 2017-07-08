import React from 'react';
import ReactDom from 'react-dom';
import AddUser from './addUser.jsx';
import AdminFilter from './adminFilter.jsx';

const AdminDashboard = ({showMentorsButton, filterTickets, onlineUsers, adminStats, ticketCategoryList}) => {

  return (
    <div id="admin_dashboard">
      <AddUser />
      <AdminFilter showMentorsButton={showMentorsButton} filterTickets={filterTickets} ticketCategoryList={ticketCategoryList} />
    </div>
  );
};

export default AdminDashboard;
