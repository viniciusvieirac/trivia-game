import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';
import { screen } from '@testing-library/react';
import mockLocalStorage from './helpers/mockLocalStorage';
import userEvent from '@testing-library/user-event';

describe('Renderize a tela Ranking e ...', () => {
  it('Verifique se vai para home ao apertar o botão "ir para home"', () => {
    const initialState = {
      player: {},
    };

    localStorage.setItem('rankingTrivia', JSON.stringify(mockLocalStorage));
  const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');

  const btnGoHomeEl = screen.getByRole('button', { name: /ir para home/i });
    expect(btnGoHomeEl).toBeDefined();

  userEvent.click(btnGoHomeEl);

  const route = history.location.pathname;
  expect(route).toBe('/');
  })
});