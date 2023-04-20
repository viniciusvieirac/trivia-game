import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MAGIC_NUMBER = 140;

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score } = this.props;
    return (
      <div>
        <Header />
        {score <= MAGIC_NUMBER ? (
          <p data-testid="feedback-text">Could be better...</p>)
          : (<p data-testid="feedback-text">Well Done!</p>)}

        <button
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again

        </button>
        <button
          data-testid="btn-ranking"
          onClick={ this.rankingPage }
        >
          Ranking

        </button>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
