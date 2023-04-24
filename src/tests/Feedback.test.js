import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de Feedback', () => {
  const initialState = {
    player: {
      gravatarEmail: '',
      name: '',
      score: 0,
      assertions: 0,
    },
  };

  it('Testa todos os componentes da tela de Feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const img = screen.getByRole('img');
    const name = screen.getByTestId('header-player-name');
    const text = screen.getByText(/could be better\.\.\./i);
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    const score = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');

    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa o botão do ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
