import React from 'react';
import ReactDOM from 'react-dom';
import TicketEntry from './ticketEntry.jsx';

const TicketList = (props) => (
  <ul className="ticket_list">
    {props.ticketList.map((ticket, index) => <TicketEntry ticket={ticket} key={index}/>)}
  </ul>
);

export default TicketList;
