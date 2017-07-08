import React from 'react';


const FeedbackEntry = ({feedback}) => {
  return (
    <div className="mentor_names">
      Rating: {feedback.rating}
      Comments: {feedback.feedback}
    </div>
  );
};


export default FeedbackEntry;
