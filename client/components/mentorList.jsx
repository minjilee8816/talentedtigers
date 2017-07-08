import React from 'react';
import MentorEntry from './mentorEntry.jsx';

const MentorList = ({mentorList}) => {
  return (
    <div className="mentor_list">
      {mentorList.map((mentor, index) => { 
        return <MentorEntry mentor={mentor} key={index} /> 
      })}
    </div>
  );
};

export default MentorList;
