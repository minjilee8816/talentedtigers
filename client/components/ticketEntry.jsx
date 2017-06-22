import React from 'react';
import ReactDOM from 'react-dom';

const TicketEntry = (props) => (
  <li>
    {props.ticket.name}
  </li>
);

export default TicketEntry;
