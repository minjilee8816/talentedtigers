import React from 'react';
import ReactDom from 'react-dom';

const AddUser = (props) => (
  <div>
    <form className="form-horizontal">
      <div className="form-group">
		    <label htmlFor="first-name">First Name</label>
		    <input className="form-control" id="first-name" placeholder="First Name"/>
      </div>
      <div className="form-group">
		    <label htmlFor="last-name">Last Name</label>
		    <input className="form-control" id="last-name" placeholder="Last Name"/>
      </div>
      <div className="form-group">
		    <label htmlFor="user-name">Username</label>
		    <input className="form-control" id="user-name" placeholder="Username"/>
      </div>
      <div className="form-group">
		    <label htmlFor="cohort-name">Cohort</label>
		    <input className="form-control" id="cohort-name" placeholder="Cohort Name"/>
      </div>
      <div className="form-group">
        <label htmlFor="role-dropdown">Role</label>
	      <select className="form-control" id="role-dropdown">
	        <option>Admin</option>
	        <option>Mentor</option>
	        <option>Student</option>
	      </select>
      </div>
      <button onClick={props.handleUserSubmission} type="submit" id="add-user-button" className="btn btn-default">Add User</button>
    </form>
  </div>
)

export default AddUser;