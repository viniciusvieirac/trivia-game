import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MAGIC_NUMBER = 140;

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        {
          score <= MAGIC_NUMBER
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <div className="feedback-container">
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  email: player.gravatarEmail,
  score: player.score,
  assertions: player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
