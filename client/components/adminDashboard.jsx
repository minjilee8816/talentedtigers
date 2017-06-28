import React from 'react';
import ReactDom from 'react-dom';

const AdminDashboard = (props) => (
  <div>
    <h4>{props.studentCount} + StudentCount Placeholder</h4>
    <h4>{props.mentorCount} + MentorCount Placeholder</h4>
    <h4>{props.avgWaitTime} + Average Wait Placeholder</h4>
  </div>
)

export default AdminDashboard;