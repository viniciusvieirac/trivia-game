import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveQuestions } from '../redux/actions/saveQuestions';
import Header from '../components/Header';
import '../App.css';
import Timer from '../components/Timer';
import { updateScore } from '../redux/actions/updateScore';

const ZERO_PONTO_CINCO = 0.5;
const TRES = 3;
const DEZ = 10;

class Game extends React.Component {
  state = {
    answerSelected: null,
    buttonDisabled: false,
    index: 0,
  };

  async componentDidMount() {
    const tokenFromLocalStorage = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenFromLocalStorage}`);
    const data = await response.json();
    this.verifyToken(data);
  }

  rightAnswer = (difficulty) => {
    const { time, playerScore, dispatch } = this.props;
    let dificuldade = 1;
    if (difficulty === 'hard') {
      dificuldade = TRES;
    } else if (difficulty === 'medium') {
      dificuldade = 2;
    }
    const questionScore = DEZ + (time * dificuldade);
    const newScore = playerScore + questionScore;
    dispatch(updateScore(newScore));
    this.chooseAnswer();
  };

  chooseAnswer = () => { this.setState({ answerSelected: true }); };

  wrongAnswer = () => {
    this.chooseAnswer();
  };

  verifyToken = ({ response_code: responseCode, results }) => {
    if (responseCode) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    const { dispatch } = this.props;
    dispatch(saveQuestions(results));
  };

  saveOnRanking = () => {
    const { playerName, playerEmail, playerScore } = this.props;
    const rankingUsers = JSON.parse(localStorage.getItem('rankingTrivia'));
    localStorage.setItem('rankingTrivia', JSON.stringify(
      [...rankingUsers,
        { playerName, playerEmail, playerScore }],
    ));
  };

  renderQuestion = (questions) => {
    const { incorrect_answers: incorrect,
      correct_answer: correct,
      difficulty,
    } = questions;
    const { buttonDisabled } = this.state;
    const allAnswers = [...incorrect, correct]
      .sort(() => Math.random() - ZERO_PONTO_CINCO);
    const { answerSelected } = this.state;
    return (
      allAnswers.map((answer, index) => {
        const isAnswerSelected = answerSelected;
        const isCorrectAnswer = correct === answer;
        let className = '';
        if (isAnswerSelected) {
          className = isCorrectAnswer ? 'green' : 'red';
        }
        return (
          <button
            key={ index }
            data-testid={
              correct === answer ? 'correct-answer' : `wrong-answer-${index}`
            }
            disabled={ buttonDisabled }
            className={ className }
            onClick={
              correct === answer ? () => this.rightAnswer(difficulty) : this.wrongAnswer
            }
          >
            { answer }
          </button>
        );
      })
    );
  };

  disabledButton = () => { this.setState(() => ({ buttonDisabled: true })); };

  nextQuestion = () => {
    const FOUR = 4;
    const { history } = this.props;
    const { index } = this.state;
    if (index === FOUR) {
      this.saveOnRanking();
      return history.push('/feedback');
    }
    this.setState({
      index: index + 1,
      answerSelected: null,
    });
  };

  render() {
    const { allQuestions } = this.props;
    const { answerSelected, index } = this.state;
    return (
      <div>
        <Header />
        <h1>Game</h1>
        {
          !allQuestions.length
            ? <span>Carregando...</span>
            : (
              <>
                <Timer disabledButton={ this.disabledButton } />
                <section>
                  <p data-testid="question-category">{ allQuestions[index].category }</p>
                  <p data-testid="question-text">{ allQuestions[index].question }</p>
                  <div data-testid="answer-options">
                    {
                      this.renderQuestion(allQuestions[index])
                    }
                  </div>
                </section>
              </>
            )
        }
        {
          answerSelected && (
            <button
              data-testid="btn-next"
              onClick={ () => this.nextQuestion() }
            >
              Next

            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ questionsSaved, timer, player }) => ({
  allQuestions: questionsSaved.allQuestions,
  time: timer.time,
  playerScore: player.score,
  playerName: player.name,
  playerEmail: player.gravatarEmail,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  allQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  })).isRequired,
  time: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
