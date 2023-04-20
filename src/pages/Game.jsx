import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveQuestions } from '../redux/actions/saveQuestions';
import Header from '../components/Header';
import '../App.css';

const ZERO_PONTO_CINCO = 0.5;
const MIL = 1000;

class Game extends React.Component {
  state = {
    timeRemaining: 30,
    timerId: null,
    answerSelected: null,
    index: 0,
  };

  async componentDidMount() {
    const tokenFromLocalStorage = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenFromLocalStorage}`);
    const data = await response.json();
    this.verifyToken(data);
    this.startTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  handleClass = () => {
    this.setState({ answerSelected: true });
  };

  startTimer = () => {
    const timerId = setInterval(() => {
      const { timeRemaining } = this.state;
      if (timeRemaining > 0) {
        this.setState({ timeRemaining: timeRemaining - 1 });
      } else {
        this.clearTimer();
      }
    }, MIL);
    this.setState({ timerId });
  };

  clearTimer = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState({ timerId: null });
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

  renderQuestion = ({ incorrect_answers: incorrect, correct_answer: correct }) => {
    const { timeRemaining } = this.state;
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
            disabled={ !timeRemaining }
            className={ className }
            onClick={ this.handleClass }
          >
            { answer }
          </button>
        );
      })
    );
  };

  nextQuestion = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      answerSelected: null,
    });
  };

  render() {
    const { allQuestions } = this.props;
    const { timeRemaining, answerSelected, index } = this.state;
    return (
      <div>
        <Header />
        <h1>Game</h1>
        <p>
          Tempo restante:
          {' '}
          {timeRemaining}
        </p>
        {
          !allQuestions.length
            ? <span>Carregando...</span>
            : (
              <section>
                <p data-testid="question-category">{ allQuestions[index].category }</p>
                <p data-testid="question-text">{ allQuestions[index].question }</p>
                <div data-testid="answer-options">
                  {
                    this.renderQuestion(allQuestions[index])
                  }
                </div>
              </section>
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

const mapStateToProps = ({ questionsSaved }) => ({
  allQuestions: questionsSaved.allQuestions,
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
};

export default connect(mapStateToProps)(Game);
