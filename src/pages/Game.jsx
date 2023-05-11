import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../App.css';
import Timer from '../components/Timer';
import { updateScore } from '../redux/actions/updateScore';
import { resetTimer } from '../redux/actions/changeTimer';

const ZERO_PONTO_CINCO = 0.5;
const TRES = 3;
const DEZ = 10;

class Game extends React.Component {
  state = {
    answerSelected: null,
    buttonDisabled: false,
    index: 0,
    allQuestions: [],
    allAnswers: [],
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
  };

  chooseAnswer = (difficulty, answer, correct) => {
    if (answer === correct) {
      this.rightAnswer(difficulty);
    }
    this.buttonDisabler();
    const { allAnswers, index } = this.state;
    const colorizeBtns = allAnswers[index].map((btn) => {
      const { props } = btn;
      if (props.children === correct) {
        return {
          ...btn,
          props: {
            ...props,
            className: 'green',
          },
        };
      }
      return {
        ...btn,
        props: {
          ...props,
          className: 'red',
        },
      };
    });
    allAnswers.splice(index, 1, colorizeBtns);
  };

  buttonDisabler = () => {
    const { allAnswers, index } = this.state;
    const disabledButtons = allAnswers[index].map((btn) => {
      const { props } = btn;
      return {
        ...btn,
        props: {
          ...props,
          disabled: true,
        },
      };
    });
    allAnswers.splice(index, 1, disabledButtons);
    this.setState({ answerSelected: true });
  };

  verifyToken = ({ response_code: responseCode, results }) => {
    try {
      console.log(responseCode);
      console.log(results);
      this.setState((prevState) => ({ ...prevState, allQuestions: results }));
      this.renderQuestion(results);
    } catch (error) {
      if (responseCode) {
        const { history } = this.props;
        history.push('/');
        localStorage.removeItem('token');
      }
    }
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
    const { answerSelected } = this.state;
    const allBtns = questions.reduce((acc, question) => {
      const {
        incorrect_answers: incorrect,
        correct_answer: correct,
        difficulty,
      } = question;
      const allAnswers = [...incorrect, correct]
        .sort(() => Math.random() - ZERO_PONTO_CINCO);
      const btnsAnswer = allAnswers.map((answer, index) => {
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
            disabled={ answerSelected }
            className={ className }
            onClick={ () => { this.chooseAnswer(difficulty, answer, correct); } }
          >
            { answer }
          </button>
        );
      });
      return [...acc, btnsAnswer];
    }, []);
    this.setState((prevState) => ({ ...prevState, allAnswers: allBtns }));
  };

  disabledButton = () => { this.setState(() => ({ buttonDisabled: true })); };

  nextQuestion = () => {
    const FOUR = 4;
    const { history, dispatch } = this.props;
    const { index } = this.state;
    if (index === FOUR) {
      this.saveOnRanking();
      return history.push('/feedback');
    }
    dispatch(resetTimer());
    this.setState({
      index: index + 1,
      answerSelected: null,
    });
  };

  render() {
    const { allQuestions, allAnswers } = this.state;
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
                {
                  !answerSelected
                    && <Timer
                      disabledButton={ this.disabledButton }
                      buttonDisabler={ this.buttonDisabler }
                    />
                }

                <section>
                  <p data-testid="question-category">{ allQuestions[index].category }</p>
                  <p data-testid="question-text">{ allQuestions[index].question }</p>
                  <div data-testid="answer-options">
                    { allAnswers[index] }
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

const mapStateToProps = ({ timer, player }) => ({
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
  time: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
