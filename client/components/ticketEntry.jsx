import React from 'react';
import ReactDOM from 'react-dom';
import util from '../helpers/util';

const TicketEntry = ({user, ticket, updateTickets}) => {

  let claimButton = null;
  let closeButton = null;

  if (ticket.status === 'Opened') {
    claimButton = <button onClick={() => updateTickets({ id: ticket.id, status: 'Claimed' })} type="button" className="btn btn-xs btn-primary">Claim</button>;
  }

  if (ticket.claimedBy === user.id || ticket.userId === user.id) {
    closeButton = <button onClick={() => updateTickets({ id: ticket.id, status: 'Closed' })} type="button" className="btn btn-xs btn-danger">Close</button>;
  }

  return (
    <div className={`ticket_list_entry category_${ticket.category} clearfix`}>
      <div className="media-left">
        <img src="http://placehold.it/60x60" />
      </div>
      <div className="media-body">
        <div className="ticket_list_entry_owner">
          {ticket.user.firstName} {ticket.user.lastName} <span className={`label label-success status_${ticket.status}`}>{ticket.status}</span>
        </div>
        <div className="ticket_list_entry_meta">
          <span className="location"><strong>Created: </strong>{util.timeToNow(ticket.createdAt)}</span>&nbsp;&nbsp;
          <span className="category"><strong>Category: </strong>{ticket.category}</span>&nbsp;&nbsp;
          <span className="time"><strong>Location: </strong>{ticket.location}</span>
        </div>
        <div className="ticket_list_entry_description">
          {ticket.description}
        </div>
        {claimButton}
        {closeButton}
      </div>
    </div>
  );
};

export default TicketEntry;
