import React from 'react';
import MentorEntry from './mentorEntry.jsx';

const MentorList = ({mentorList, mentorFeedback}) => {
  return (
    <div className="mentor_list">
      {mentorList.map((mentor, index) => <MentorEntry mentorFeedback={mentorFeedback} key={index} /> )}
    </div>
  );
};

export default MentorList;
