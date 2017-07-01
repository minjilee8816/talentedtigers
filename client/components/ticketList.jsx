import React from 'react';
import ReactDOM from 'react-dom';
import TicketEntry from './ticketEntry.jsx';

const TicketList = ({user, ticketList, updateTickets, hasClaimed}) => (
  <div className="ticket_list">
    {ticketList.map(ticket => <TicketEntry user={user} ticket={ticket} updateTickets={updateTickets} hasClaimed={hasClaimed} key={ticket.id}/>)}
  </div>
);

export default TicketList;
