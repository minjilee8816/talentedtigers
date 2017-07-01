import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const TicketEntry = ({user, ticket, updateTickets, hasClaimed}) => {

  let claimButton = null;
  let closeButton = null;
  let claimed = null;
  let className = null;
  let time = null;

  if (ticket.status === 'Opened') {
    className = 'alert-success';
    time = `opened ${moment(ticket.createdAt).fromNow()}`;
  } else if (ticket.status === 'Claimed') {
    claimed = <div className="ticket_list_entry_claimed">by {ticket.userClaimed.firstName} {ticket.userClaimed.lastName}</div>;
    className = 'alert-info';
    time = `claimed ${moment(ticket.claimedAt).fromNow()}`;
  } else {
    className = 'alert-danger';
    time = `closed ${moment(ticket.closedAt).fromNow()}`;
  }

  if (ticket.status === 'Opened' && ticket.userId !== user.id) {
    claimButton = <button onClick={() => updateTickets({ id: ticket.id, status: 'Claimed' })} type="button" className="btn btn-xs btn-primary claim_btn">Claim</button>;
  }

  if (ticket.status !== 'Closed' && (ticket.claimedBy === user.id || ticket.userId === user.id || user.role === 'admin')) {
    closeButton = <button onClick={() => updateTickets({ id: ticket.id, status: 'Closed' })} type="button" className="btn btn-xs btn-danger">Close</button>;
  }

  return (
    <div className={`ticket_list_entry alert ${className} clearfix`}>
      <div className="ticket_list_entry_meta clearfix">
        <div className="ticket_list_entry_name">{ticket.user.firstName} {ticket.user.lastName} ({ticket.location})</div>
        <div className="ticket_list_entry_time">- {time}</div>
        {claimed}
      </div>
      <div className="ticket_list_entry_buttons">
        <span className="btn btn-xs btn-default">{ticket.category}</span>
        {claimButton}
        {closeButton}
      </div>
      <div className="ticket_list_entry_description">
        {ticket.description}
      </div>
    </div>
  );
};

export default TicketEntry;
