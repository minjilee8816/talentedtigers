import React from 'react';
import ReactDom from 'react-dom';

const AddUser = () => {

  const addNewUser = (e) => {
    $('.add_user_form').validate({
      rules: {
        firstName: 'required',
        lastName: 'required',
        username: 'required',
        cohortName: 'required',
        role: 'required'
      },
      submitHandler: (form) => {
        let user = {
          firstName: document.getElementById('first-name').value,
          lastName: document.getElementById('last-name').value,
          username: document.getElementById('user-name').value,
          role: document.getElementById('role-dropdown').value,
          cohort: document.getElementById('cohort-name').value
        };
        $.ajax({
          url: 'api/users',
          type: 'POST',
          data: user,
          success: (response) => {
            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('user-name').value = '';
            document.getElementById('cohort-name').value = '';
            document.getElementById('alert_add_user').style.top = '0';
            setTimeout(() => {
              document.getElementById('alert_add_user').style.top = '-36px';
            }, 3000);
          },
          error: () => {
            console.log('Error submitting ticket to api/users via POST');
          }
        });
      },
      errorPlacement: function(error, element) {} // Do not show error messages
    });   
  };

  return (
    <form className="add_user_form">
      <div className="form-group row">
        <div className="col-xs-12"><h2>Add a user</h2></div>
      </div>
      <div className="form-group row">
        <div className="col-xs-4">
          <label htmlFor="first-name">First Name</label>
          <input className="form-control" id="first-name" name="firstName" placeholder="First Name" />
        </div>
        <div className="col-xs-4">
          <label htmlFor="last-name">Last Name</label>
          <input className="form-control" id="last-name" name="lastName" placeholder="Last Name" />
        </div>
        <div className="col-xs-4">
          <label htmlFor="user-name">Username</label>
          <input className="form-control" id="user-name" name="username" placeholder="Username" />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <label htmlFor="cohort-name">Cohort</label>
          <input className="form-control" id="cohort-name" name="cohortName" placeholder="Cohort Name" />
        </div>
        <div className="col-xs-4">
          <label htmlFor="role-dropdown">Role</label>
          <select className="form-control" id="role-dropdown" name="role">
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="col-xs-4">
          <label>&nbsp;</label>
          <br />
          <button onClick={addNewUser} type="submit" id="add-user-button" className="btn btn-primary">Add User</button>
        </div>
      </div>
    </form>
  );
};

export default AddUser;
