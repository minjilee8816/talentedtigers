import React from 'react';
import ReactDOM from 'react-dom';


class Comments extends React.Component {

  constructor (props) {
    super(props); 
  }

  commentsInputValue(e) {
    var value = e.target.value; 
    this.props.changeCommentState(value);  
  }


  render () {
    return (
    <div className = "feedback">
      <h4 className="feedback-subtitle">
        Additional comments
      </h4>
      <textarea onChange = {this.commentsInputValue.bind(this)}  id="feedback_submission_form_feedback"  className="form-control" name="description" placeholder="Type additional feedback"></textarea>
    </div>
    )
  }
};

export default Comments;


