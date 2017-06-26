import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TicketList from './components/ticketList.jsx';
import TicketSubmission from './components/ticketSubmission.jsx';
import Login from './components/login.jsx';
// import Nav from './components/nav.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketList: [],
      ticketOptionList: ['React', 'Socket.IO', 'Recursion', 'Postgres'],
      role: null
    };
  }

  componentWillMount() {
    // should send a get request to server for user role information
    $.ajax({
      url: '/api/users/:id',
      type: 'GET',
      async: false,
      success: (response) => {
        console.log('componentWillMount: ', response);
        return response ? this.setState({ role: response.user.role }) : null;
      },
      error: () => {
        console.log('failed');
      }
    });
  }

  handleTicketSubmission(e) {
    e.preventDefault();
    let ticket = {
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

  render() {
    let render = null;
    if (!this.state.role) {
      render = <Login />;
    } else if (this.state.role === 'student') {
      render = <TicketSubmission handleTicketSubmission={this.handleTicketSubmission.bind(this)} ticketOptionList={this.state.ticketOptionList}/>;
    } else if (this.state.role === 'mentor') {
      // render HIR view
    } else if (this.state.role === 'admin') {
      // render admin view
    }
    return (
      <div className="col-md-8">
        {/* <Nav />*/}
        {render}
        <TicketList ticketList={this.state.ticketList}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
