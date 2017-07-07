import React from 'react';
import ReactDOM from 'react-dom';
// import $ from "jquery";


class Rating extends React.Component {

  constructor (props) {
    super(props); 
    this.state = {
      ratingChecked : null
    }
    this.ratingValue();
  }

  ratingValue (e) {
    console.log('checking', e)
    // $.('input[rating-radio]:checked').val();
    // console.log('******', $.('input[rating-radio]:checked').val());
    // this.setState({
    //   ratingChecked : e.target.value
    // })
    // var value = null; 
    // var rates = document.getElementsByClassName('rating-radio').value;
    // if( document.getElementsByClassName('rating-radio').checked ) {
    //   value = document.getElementsByClassName('rating-radio').value
    // }
    // console.log("RATING***", value ); 
  }


  render () {
    return (
      <div className = "feedback">
        <h4 className="feedback-subtitle">
        Rate your experience
        </h4>
        <div onClick ={this.ratingValue.bind()} className="btn-group" data-toggle="buttons">
          <label className="btn btn-primary">
            <input onClick ={this.ratingValue.bind()} className="rating-radio" type="radio" name="options" id="option1" value="1" autoComplete="off"/> 1
          </label>
          <label className="btn btn-primary">
            <input  onClick ={this.ratingValue.bind()} className="rating-radio" type="radio" name="options" id="option2" value="2" autoComplete="off"/> 2
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option3" value="3" autoComplete="off"/> 3
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option4" value="4" autoComplete="off"/> 4
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option5" value="5" autoComplete="off"/> 5
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option6" value="6" autoComplete="off"/> 6
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option7" value="7" autoComplete="off"/> 7
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option8" value="8" autoComplete="off"/> 8
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option9" value="9" autoComplete="off"/> 9
          </label>
          <label className="btn btn-primary">
            <input className="rating-radio" type="radio" name="options" id="option10"value="10" autoComplete="off"/> 10
          </label>
        </div>
      </div>
    )
  }
}


export default Rating;



