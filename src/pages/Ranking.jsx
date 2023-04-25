import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.setState((prev) => {
      const rankingFromLocalStorage = JSON.parse(localStorage.getItem('rankingTrivia'));
      return {
        ...prev,
        ranking: rankingFromLocalStorage,
      };
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {
            ranking
              .sort((p1, p2) => p2.playerScore - p1.playerScore)
              .map(({ playerName, playerScore, playerEmail }, ind) => {
                const hashGerada = md5(playerEmail).toString();
                return (
                  <li key={ ind }>
                    <img src={ `https://www.gravatar.com/avatar/${hashGerada}` } alt="" />
                    <p data-testid={ `player-name-${ind}` }>{playerName}</p>
                    <p data-testid={ `player-score-${ind}` }>{playerScore}</p>
                  </li>
                );
              })
          }
        </ul>
        <button
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Ir para Home

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
