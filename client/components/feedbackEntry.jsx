import React from 'react';


const FeedbackEntry = ({feedback}) => {
  return (
    <div className="alert alert-success">
      <div className="feedback_content">
        <b>Rating: </b>{feedback.rating}
      </div>
      <div className="feedback_content">
        <b>Comments:</b> {feedback.feedback}
      </div>
    </div>
  );
};


export default FeedbackEntry;
