import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './rating.jsx'
import Comments from './comments.jsx'

const Feedback = () => ( 
    <div className="modal fade" tabIndex="-1" id="myModal" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h3 className="modal-title" id="myModalLabel">Help Reactor Feedback</h3>
          </div>
          <div className="modal-body">
              <Rating /> 
              <Comments />
          </div>
          <div className="modal-footer" id="feedback-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
  </div>
);

export default Feedback;

