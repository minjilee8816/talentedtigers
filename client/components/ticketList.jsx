import React from 'react';
import ReactDOM from 'react-dom';
import TicketEntry from './ticketEntry.jsx';

const TicketList = (props) => (
  <div className="ticket_list">
    {props.ticketList.map((ticket, index) => <TicketEntry ticket={ticket} key={index}/>)}
  </div>
);

export default TicketList;
