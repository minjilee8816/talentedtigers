import React from 'react';
import ReactDOM from 'react-dom';

const Comments = () => (
  <div className = "feedback">
    <h4 className="feedback-subtitle">
      Additional comments
    </h4>
    <textarea id="ticket_submission_description" className="form-control" name="description" placeholder="Type additional feedback"></textarea>
  </div>
);

export default Comments;


