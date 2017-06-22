import React from 'react';
import ReactDOM from 'react-dom';
import TicketList from './components/ticketList.jsx';
// import TicketSubmission from './components/ticketSubmission.jsx';
// import Nav from './components/nav.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ticketList: [{name: 'Test'}, {name: 'Test2'}, {name: 'Test3'}]
    };
  }

  render() {
    return (
      <div className="col-md-8">
        {/* <Nav />
        <TicketSubmission /> */}
        <TicketList ticketList={this.state.ticketList}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
