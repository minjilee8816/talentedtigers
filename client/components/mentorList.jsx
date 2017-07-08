import React from 'react';
import MentorEntry from './mentorEntry.jsx';

const MentorList = ({mentorList, getFeedback}) => {
  return (
    <div className="mentor_list">
      {mentorList.map((mentor, index) => { 
        return <MentorEntry mentor={mentor} key={index} getFeedback={getFeedback} /> 
      })}
    </div>
  );
};

export default MentorList;
