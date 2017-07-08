import React from 'react';

const MentorEntry = ({mentorName, rating}) => {
  <div className='mentor_entry'>
    <div className='mentor_name'>
      {mentorName}
    </div>
    <div className='mentor_average_rating'>
      {rating}
    </div>
  </div>
}

export default MentorEntry;
