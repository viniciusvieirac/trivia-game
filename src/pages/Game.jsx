import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveQuestions } from '../redux/actions/saveQuestions';
import Header from '../components/Header';

const ZERO_PONTO_CINCO = 0.5;

class Game extends React.Component {
  async componentDidMount() {
    const tokenFromLocalStorage = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenFromLocalStorage}`);
    const data = await response.json();
    this.verifyToken(data);
  }

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
    const allAnswers = [...incorrect, correct]
      .sort(() => Math.random() - ZERO_PONTO_CINCO);

    return (
      allAnswers.map((answer, index) => (
        <button
          key={ index }
          data-testid={ correct === answer ? 'correct-answer' : `wrong-answer-${index}` }
        >
          { answer }
        </button>
      ))
    );
  };

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
              <section>
                <p data-testid="question-category">{ allQuestions[0].category }</p>
                <p data-testid="question-text">{ allQuestions[0].question }</p>
                <div data-testid="answer-options">
                  {
                    this.renderQuestion(allQuestions[0])
                  }
                </div>
              </section>
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
