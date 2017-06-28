import React from 'react';
import ReactDOM from 'react-dom';
import TicketEntry from './ticketEntry.jsx';

const TicketList = (props) => (
  <div className="ticket_list">
    {props.ticketList.map((ticket, index) => <TicketEntry user={props.user} ticket={ticket} key={index} handleTicketUpdate={props.handleTicketUpdate} />)}
  </div>
);

export default TicketList;
