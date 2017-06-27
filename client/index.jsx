import React from 'react';
import ReactDOM from 'react-dom';
import TicketList from './components/ticketList.jsx';
import TicketSubmission from './components/ticketSubmission.jsx';
import Login from './components/login.jsx';
import Nav from './components/nav.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketList: [],
      ticketOptionList: ['React', 'Socket.IO', 'Recursion', 'Postgres'],
      user: null
    };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/users/:id',
      type: 'GET',
      async: false,
      success: (response) => {
        console.log('componentWillMount: ', response);
        return response ? this.setState({ user: response.user }) : null;
      },
      error: () => {
        console.log('failed');
      }
    });
  }

  componentDidMount () {
    if (this.state.user) {
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
  }

  handleTicketSubmission(e) {
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
        this.setState({ ticketList: response });
      },
      error: () => {
        console.log('Error submitting ticket to api/tickets via POST');
      }
    });
  }

  handleTicketUpdate(data) {
    if (data.status === 'Claimed') {
      data.claimedBy = this.state.user.id;
    }
    $.ajax({
      url: `api/tickets/${data.id}`,
      type: 'PUT',
      data: data,
      success: (response) => {},
      error: (err) => {}
    });
  }

  render() {
    let user = this.state.user;
    let render = null;
    if (!user) {
      render = <Login />;
    } else if (user.role === 'student') {
      render = <TicketSubmission handleTicketSubmission={this.handleTicketSubmission.bind(this)} ticketOptionList={this.state.ticketOptionList}/>;
    } else if (user.role === 'mentor') {
      // render HIR view
    } else if (user.role === 'admin') {
      // render admin view
    }
    return (
      <div>
        <Nav user={this.state.user}/>
        <div className="col-md-8">
          {render}
          <TicketList user={this.state.user} ticketList={this.state.ticketList} handleTicketUpdate={this.handleTicketUpdate.bind(this)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
