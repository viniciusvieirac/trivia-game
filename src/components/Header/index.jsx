import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const hashGerada = md5(email).toString();
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hashGerada}` } alt="" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
