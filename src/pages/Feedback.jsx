import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MAGIC_NUMBER = 140;

class Feedback extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        <Header />
        {score <= MAGIC_NUMBER ? (
          <p data-testid="feedback-text">Could be better...</p>)
          : (<p data-testid="feedback-text">Well Done!</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Feedback);
