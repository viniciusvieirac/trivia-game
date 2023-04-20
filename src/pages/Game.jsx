import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveQuestions } from '../redux/actions/saveQuestions';
import Header from '../components/Header';
import '../App.css';
import Timer from '../components/Timer';

const ZERO_PONTO_CINCO = 0.5;

class Game extends React.Component {
  state = {
    answerSelected: null,
    buttonDisabled: false,
  };

  async componentDidMount() {
    const tokenFromLocalStorage = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenFromLocalStorage}`);
    const data = await response.json();
    this.verifyToken(data);
  }

  handleClass = () => {
    this.setState({ answerSelected: true });
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
            onClick={ this.handleClass }
          >
            { answer }
          </button>
        );
      })
    );
  };

  disabledButton = () => { this.setState(() => ({ buttonDisabled: true })); };

  render() {
    const { allQuestions } = this.props;
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
                  <p data-testid="question-category">{ allQuestions[0].category }</p>
                  <p data-testid="question-text">{ allQuestions[0].question }</p>
                  <div data-testid="answer-options">
                    {
                      this.renderQuestion(allQuestions[0])
                    }
                  </div>
                </section>
              </>
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
