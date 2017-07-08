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
      <div className="alert alert-info">
        <table className="mentor_info">
          <tbody>
            <tr>
              <td className="mentor_name"><h3 id="mentor_full_name">{this.props.mentor.firstName} {this.props.mentor.lastName}</h3></td>
              <td className="mentor_name_button"><button onClick={this.sendMentorId.bind(this)} id="feedbacks-button" className="btn btn-primary">Show Feedbacks</button></td>  
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MentorEntry;
