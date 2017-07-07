import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './rating.jsx'
import Comments from './comments.jsx'

class Feedback extends React.Component {
  constructor (props) {  
    super(props);
    this.state = {
      rating: null,
      comments: null
    }
  }

  changeRatingState (value) {
    this.setState({
      rating: value
    })
  }

  changeCommentState (value) {
    this.setState({
      comments: value 
    })

  }

  submitRatingCommentsValue () {
    console.log('comments VAlue?', this.state.rating);
    this.props.submitFeedbackForm(this.state.rating, this.state.comments); 
  }

  render() {
    return (
      <form className="feedback_submission_form">
        <div className="modal fade" tabIndex="-1" id="myModal" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 className="modal-title" id="myModalLabel">Help Reactor Feedback</h3>
              </div>
              <div className="modal-body">
                <Rating changeRatingState = { this.changeRatingState.bind(this) } /> 
                <Comments changeCommentState = {this.changeCommentState.bind(this)} />
              </div>
              <div className="modal-footer" id="feedback-footer">
                <button onClick={this.submitRatingCommentsValue.bind(this)} type="button" className="btn btn-primary" data-dismiss="modal">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
// const Feedback = ({submitFeedbackForm}) => ( 
  
// );

export default Feedback;

//onClick={}