import React from 'react';
import ReactDOM from 'react-dom';

const TicketEntry = (props) => (
  <div className={`ticket_list_entry category_${props.ticket.category} clearfix`}>
    <div className="media-left">
      <img src="http://placehold.it/60x60" />
    </div>
    <div className="media-body">
      <div className="ticket_list_entry_owner">
        David Vassett <span className={`label label-success status_${props.ticket.status}`}>{props.ticket.status}</span>
      </div>
      <div className="ticket_list_entry_meta">
        <span className="location"><strong>Created: </strong>16 mins ago</span>&nbsp;&nbsp;
        <span className="category"><strong>Category: </strong>{props.ticket.category}</span>&nbsp;&nbsp;
        <span className="time"><strong>Location: </strong>080A</span>
      </div>
      <div className="ticket_list_entry_description">
        {props.ticket.description}
      </div>
      <button onClick={() => props.handleTicketUpdate({ id: props.ticket.id, status: 'Claimed' })} type="button" className="btn btn-xs btn-primary">Claim</button>&nbsp;&nbsp;
      <button type="button" className="btn btn-xs btn-danger">Close</button>
    </div>
  </div>
);

export default TicketEntry;
