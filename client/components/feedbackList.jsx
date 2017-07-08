import React from 'react';
import FeedbackEntry from './feedbackEntry.jsx';

const FeedbackList = ({feedbackList, mentorFirstName, mentorLastName}) => {
  var feedbackRatingAverage = function (feedbackList) {
    var rating = 0;
    for (var i = 0; i < feedbackList.length; i++ ) {
       rating += feedbackList[i].rating;
    }
    var average = rating / feedbackList.length
    return average.toFixed(2);
  }

  return (
    <div className="mentor_list">
      <h3 className="mentor_full_name">
        <b>{mentorFirstName} {mentorLastName}</b>
      </h3> 
      <h3 className="average">
        <b>Average Rating:</b> {feedbackRatingAverage(feedbackList)}
      </h3>
      {feedbackList.map((feedback, index) => { 
        return <FeedbackEntry key={index} feedback={feedback}/> 
      })}
    </div>
  );
};

export default FeedbackList;
