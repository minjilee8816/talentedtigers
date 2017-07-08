import React from 'react';
import FeedbackEntry from './feedbackEntry.jsx';

const FeedbackList = ({feedbackList}) => {
  return (
    <div className="mentor_list">
      {feedbackList.map((feedback, index) => { 
        return <FeedbackEntry key={index} feedback={feedback} /> 
      })}
    </div>
  );
};

export default FeedbackList;
