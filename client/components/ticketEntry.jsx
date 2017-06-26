import React from 'react';
import ReactDOM from 'react-dom';

const TicketEntry = (props) => (
  <li className="ticket_list_entry">
    <div className="ticket_list_entry_icon">placeholder</div>
    <div className="ticket_list_entry_description">
      {props.ticket.description}
    </div>
    <div className="ticket_list_entry_status">{props.ticket.status}</div>
  </li>
);

export default TicketEntry;
