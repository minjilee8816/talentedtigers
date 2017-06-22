import React from 'react';
import TicketList from './components/ticketList.jsx';
import TicketEntry from './components/ticketEntry.jsx';
import TicketSubmission from './components/ticketSubmission.jsx';
import Nav from './components/nav.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="col-md-8">
        <Nav />  
        <TicketSubmission />
        <TicketList />    
      </div>
    );
  }
}