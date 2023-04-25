import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeTimer } from '../redux/actions/changeTimer';

const MIL = 1000;

class Timer extends Component {
  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  startTimer = () => {
    const { disabledButton, buttonDisabler } = this.props;
    const timerId = setInterval(() => {
      const { time, dispatch } = this.props;
      if (time > 0) {
        dispatch(changeTimer(time - 1));
      } else {
        buttonDisabler();
        disabledButton();
        clearInterval(timerId);
      }
    }, MIL);
    this.setState((prevState) => ({ ...prevState, timerId }));
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
  buttonDisabler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Timer);
