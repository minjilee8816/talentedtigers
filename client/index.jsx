import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import TicketList from './components/ticketList.jsx';
import TicketSubmission from './components/ticketSubmission.jsx';
import Login from './components/login.jsx';
import Nav from './components/nav.jsx';
import AddUser from './components/addUser.jsx';
import AdminDashboard from './components/adminDashboard.jsx';
import AdminFilter from './components/adminFilter.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketList: [],
      ticketOptionList: ['React', 'Socket.IO', 'Recursion', 'Postgres'],
      user: null,
      waitTime: '1mins'
    };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/users/:id',
      type: 'GET',
      async: false,
      success: (response) => {
        return response ? this.setState({ user: response.user }) : null;
      },
      error: () => {
        console.log('failed');
      }
    });
  }

  componentDidMount () {
    if (this.state.user) {
      this.getTickets();
      this.broadcastMsg();
    }
  }

  broadcastMsg() {
    let socket = io('/');
    socket.emit('userInfo', { userInfo: this.state.user });
  }

  getTickets() {
    $.ajax({
      url: `/api/tickets/${this.state.user.id}`,
      type: 'GET',
      success: (tickets) => {
        this.setState({ ticketList: tickets });
      },
      error: () => {
        console.log('err');
      }
    });
  }

  submitTickets(e) {
    e.preventDefault();
    let ticket = {
      userId: this.state.user.id,
      description: document.getElementById('ticket_submission_description').value,
      category: document.getElementById('ticket_option_dropdown').value,
      status: 'Opened'
    };
    console.log(`Sending Descrip: ${ticket.description}, Category: ${ticket.category} to api/tickets via POST`);
    $.ajax({
      url: 'api/tickets',
      type: 'POST',
      data: ticket,
      success: (response) => {
        console.log(`Successfully sent ${ticket} to apt/tickets via POST`);
        this.getTickets();
        document.getElementById('ticket_submission_description').value = '';
      },
      error: () => {
        console.log('Error submitting ticket to api/tickets via POST');
      }
    });
  }

  updateTickets(data) {
    if (data.status === 'Claimed') {
      data.claimedBy = this.state.user.id;
    }
    $.ajax({
      url: `api/tickets/${data.id}`,
      type: 'PUT',
      data: data,
      success: (response) => {
        this.getTickets();
      },
      error: (err) => {
        console.log('failed to update ticket');
      }
    });
  }
  
  handleUserSubmission(e) {
    e.preventDefault();
    let user = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      userName: document.getElementById('user-name').value,
      cohort: document.getElementById('cohort-name').value,
      role: document.getElementById('role-dropdown').value
    }
    console.log(`Sending new user ${user.userName} to api/users via POST`);
    $.ajax({
      url: 'api/users',
      type: 'POST',
      data: user,
      success: (response) => {
        console.log(`Successfully sent ${user} to api/users via POST`);
      },
      error: () => {
        console.log('Error submitting ticket to api/users via POST')
      }
    });
  }
  
  handleFilter (e) {
    e.preventDefault();
    var timeStorage = {
      'Today': 86400000,
      'Last Week': 604800000,
      'Last Month': 2592000000,
      'Last Year': 31536000000,
      'All': Date.now()
    };
    let dateStart = Date.now() - timeStorage[document.getElementById('time-window').value];

    let filterObj = {
      category: document.getElementById('select-category').value,
      status: document.getElementById('ticket-status').value,
      dateStart: new Date(dateStart)
    }
    $.ajax({
      url: 'api/tickets',
      type: 'GET',
      data: filterObj,
      success: (tickets) => {
        console.log('Recieved filtered ticket list ', tickets);
        this.setState({ticketList: tickets});
      },
      error: () => {
        console.log('Error filtering tickets')
      }
    });
  }

  render() {
    let user = this.state.user;
    let render = null;
    if (!user) {
      render = <Login />;
    } else if (user.role === 'student') {
      render = <TicketSubmission submitTickets={this.submitTickets.bind(this)} ticketOptionList={this.state.ticketOptionList}/>;
    } else if (user.role === 'mentor') {
      // render HIR view
    } else if (user.role === 'admin') {
      render =
        <div>
          <AddUser handleUserSubmission={this.handleUserSubmission.bind(this)}/>
          <AdminDashboard />
          <AdminFilter ticketOptionList={this.state.ticketOptionList} handleFilter={this.handleFilter.bind(this)}/>
        </div>
    }
    return (
      <div>
        <Nav waitTime={this.state.waitTime} user={this.state.user}/>
        <div className="col-md-8">
          {render}
          <TicketList user={this.state.user} ticketList={this.state.ticketList} updateTickets={this.updateTickets.bind(this)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
