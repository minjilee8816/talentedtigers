import React from 'react';

class MentorEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  sendMentorId() {
    this.props.getFeedback(this.props.mentor.id);
  }

  render() {
    return (
      <div className="form-group row">
        <table className="mentor_names">
          <tbody>
            <tr>
              <td className="mentor_name"><h3 htmlFor="ticket-statuss" id = "">{this.props.mentor.firstName} {this.props.mentor.lastName}</h3></td>
              <td className="mentor_name_button"><button onClick={this.sendMentorId.bind(this)} id="feedbacks-button" className="btn btn-primary">Show Feedbacks</button></td>  
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MentorEntry;
