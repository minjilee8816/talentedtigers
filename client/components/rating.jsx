import React from 'react';
import ReactDOM from 'react-dom';


class Rating extends React.Component {

  constructor (props) {
    super(props); 
    this.state = {
      rating: props.changeRatingState
    }
    this.ratingValue = this.ratingValue.bind(this);
  }

  ratingValue (e) {
    var value = e.target.innerText;
    this.props.changeRatingState(value);  
  }

  render () {
    return (
      <div className = "feedback">
        <h4 className="feedback-subtitle">
        Rate your experience
        </h4>
        <div className="btn-group" data-toggle="buttons">
          <label onClick ={this.ratingValue} className="btn btn-primary" >
            <input  className="rating-radio" type="radio" name="options" id="option1" autoComplete="off"/> 1
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary" >
            <input  className="rating-radio" type="radio"  name="options" id="option2" autoComplete="off"/> 2
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option3" autoComplete="off"/> 3
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option4" autoComplete="off"/> 4
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option5" autoComplete="off"/> 5
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option6" autoComplete="off"/> 6
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option7" autoComplete="off"/> 7
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option8" autoComplete="off"/> 8
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option9" autoComplete="off"/> 9
          </label>
          <label onClick ={this.ratingValue} className="btn btn-primary" >
            <input className="rating-radio" type="radio" name="options" id="option10" autoComplete="off"/> 10
          </label>
        </div>
      </div>
    )
  }
}


export default Rating;



