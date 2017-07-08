import React from 'react';
import FeedbackEntry from './feedbackEntry.jsx';


const FeedbackList = ({feedbackList, mentorFirstName, mentorLastName}) => {
  return (
    <div className="mentor_list">
      <h3 className="mentor_full_name">
        {mentorFirstName} {mentorLastName}
      </h3>
      {feedbackList.map((feedback, index) => { 
        return <FeedbackEntry key={index} feedback={feedback}/> 
      })}
    </div>
  );
};

export default FeedbackList;
