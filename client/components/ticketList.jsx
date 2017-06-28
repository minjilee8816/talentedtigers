import React from 'react';
import ReactDOM from 'react-dom';
import TicketEntry from './ticketEntry.jsx';

const TicketList = (props) => (
  <div className="ticket_list">
    {props.ticketList.map((ticket, index) => <TicketEntry user={props.user} ticket={ticket} key={index} updateTickets={props.updateTickets} />)}
  </div>
);

export default TicketList;
