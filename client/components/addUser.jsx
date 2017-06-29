import React from 'react';
import ReactDom from 'react-dom';

const AddUser = () => {
  const addNewUser = (e) => {
    e.preventDefault();
    let user = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      username: document.getElementById('user-name').value,
      role: document.getElementById('role-dropdown').value
      // cohort: document.getElementById('cohort-name').value,
    }
    console.log(`Sending new user ${user.userName} to api/users via POST`);
    $.ajax({
      url: 'api/users',
      type: 'POST',
      data: user,
      success: (response) => {
        console.log(`Successfully sent ${user} to api/users via POST`);
      },
      error: () => {
        console.log('Error submitting ticket to api/users via POST')
      }
    });
  }


  return (
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
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button onClick={addNewUser} type="submit" id="add-user-button" className="btn btn-default">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
