import React from 'react';

const MentorEntry = ({mentor}) => {
  return (
    <div className='mentor_entry'>
      <div className='mentor_name'>
       {mentor.firstName} 
       {mentor.lastName}
      </div>
    </div>
  )
}

export default MentorEntry;
