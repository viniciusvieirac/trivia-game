import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export default Login;
