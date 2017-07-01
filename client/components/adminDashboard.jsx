import React from 'react';
import ReactDom from 'react-dom';
import AddUser from './addUser.jsx';
import AdminFilter from './adminFilter.jsx';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminStat: {}
    };
  }

  render() {

    return (
      <div id="admin_dashboard">
        <div className="col-xs-12 admin_dashboard_title"><h2>Admin Dashboard</h2></div>
        <h4>Active Students: {this.props.onlineUsers.student}
          <span className='admin_dashboard_span'>Current Open Tickets: {this.state.adminStat.open}</span>
        </h4>
        <h4>Active Mentors: {this.props.onlineUsers.mentor}
          <span className='admin_dashboard_span'>Tickets Closed Today: {this.state.adminStat.closed}</span>
        </h4>
        <h4>Current Average Wait Time: {this.props.onlineUsers.currAveWait} minutes
          <span className='admin_dashboard_span'>Most Popular Category Today: {this.state.adminStat.popularCategory}</span>
        </h4>
        <AddUser />
        <AdminFilter filterTickets={this.props.filterTickets} ticketCategoryList={this.props.ticketCategoryList}/>
      </div>
    );
  }
}

export default AdminDashboard;
