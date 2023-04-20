import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeTimer } from '../redux/actions/changeTimer';

const MIL = 1000;

class Timer extends Component {
  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    const { disabledButton } = this.props;
    const intervaleTimer = setInterval(() => {
      const { time, dispatch } = this.props;
      if (time > 0) {
        dispatch(changeTimer(time - 1));
      } else {
        disabledButton();
        clearInterval(intervaleTimer);
      }
    }, MIL);
  };

  render() {
    const { time } = this.props;

    return <p>{ time }</p>;
  }
}

const mapStateToProps = ({ timer }) => ({
  time: timer.time,
});

Timer.propTypes = {
  disabledButton: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Timer);
