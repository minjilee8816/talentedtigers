import React from 'react';
import ReactDom from 'react-dom';

const AdminFilter = ({filterTickets, ticketOptionList}) => (
  <div>
    <form className="form-horizontal">
      <div className="form-group">
        <label htmlFor="select-category">Select Category</label>
        <select className="form-control" id="select-category">
          {ticketOptionList.map((ticketOption, index) => <option key={index}>{ticketOption}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ticket-status">Ticket Status</label>
        <select className="form-control" id="ticket-status">
          <option>Opened</option>
          <option>Closed</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="time-window">Time Window</label>
        <select className="form-control" id="time-window">
          <option>Today</option>
          <option>Last Week</option>
          <option>Last Month</option>
          <option>Last Year</option>
          <option>All</option>
        </select>
      </div>
      <button onClick={filterTickets} type="submit" id="filter-button" className="btn btn-default">Filter Tickets</button>
    </form>
  </div>
);

export default AdminFilter;
