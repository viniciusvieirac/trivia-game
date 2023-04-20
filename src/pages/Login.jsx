import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getToken from '../services/api';
import { addEmail, addName } from '../redux/action';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabledButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateLogin);
  };

  validateLogin = () => {
    const ONE = 1;
    const { email, name } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (emailRegex.test(email) && name.length >= ONE) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    getToken()
      .then((data) => {
        localStorage.setItem('token', data.token);
        history.push('/game');
      });
    dispatch(addName(name));
    dispatch(addEmail(email));
  };

  render() {
    const { name, email, disabledButton } = this.state;
    return (
      <div>
        <input
          value={ name }
          name="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleChange }
        />
        <input
          value={ email }
          name="email"
          data-testid="input-gravatar-email"
          type="email"
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ disabledButton }
          onClick={ this.handleClick }
        >
          Play

        </button>

        <Link
          to="/settings"
          data-testid="btn-settings"
        >
          Settings

        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
