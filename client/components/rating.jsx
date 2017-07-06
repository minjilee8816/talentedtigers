import React from 'react';
import ReactDOM from 'react-dom';

const Rating = () => (
  <div className = "feedback">
    <h4 className="feedback-subtitle">
    Rate your experience
    </h4>
    <div className="btn-group" data-toggle="buttons">
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option1" autoComplete="off"/> 1
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option2" autoComplete="off"/> 2
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option3" autoComplete="off"/> 3
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option1" autoComplete="off"/> 4
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option2" autoComplete="off"/> 5
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option3" autoComplete="off"/> 6
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option1" autoComplete="off"/> 7
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option2" autoComplete="off"/> 8
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option3" autoComplete="off"/> 9
      </label>
      <label className="btn btn-primary">
        <input type="radio" name="options" id="option3" autoComplete="off"/> 10
      </label>
    </div>
  </div>
);

export default Rating;



