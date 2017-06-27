import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

class WaitTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  render() {
    const socket = io(process.env.URL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'user_id': this.props.user.id,
            'user_role': this.props.user.role
          }
        }
      },
      reconnection: false
    });
    // socket.emit('connected', () => {
    //
    // });

    return (
      <div id="wait_time" className="col-md-4">
        Est. wait time {this.state.time}
      </div>
    );
  }
}

export default WaitTime;
