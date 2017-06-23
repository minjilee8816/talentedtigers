import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TicketList from './components/ticketList.jsx';
import TicketSubmission from './components/ticketSubmission.jsx';
// import Nav from './components/nav.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketList: [{name: 'Test'}, {name: 'Test2'}, {name: 'Test3'}],
      ticketOptionList: ['React', 'Socket.IO', 'Recursion', 'Postgres']
    };
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
      },
      error: () => {
        console.log('Error submitting ticket to api/tickets via POST');
      }
    });
  }

  render() {
    return (
      <div className="col-md-8">
        {/* <Nav />*/}
        <TicketSubmission handleTicketSubmission={this.handleTicketSubmission.bind(this)} ticketOptionList={this.state.ticketOptionList}/>
        <TicketList ticketList={this.state.ticketList}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
