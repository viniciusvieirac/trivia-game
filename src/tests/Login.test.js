import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const playerTestId = "input-player-name";
const emailTestId = "input-gravatar-email";

describe("Testa a página de Login", () => {
  it("Verifica se os inputs de Login aparecem na tela", () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputName = screen.getByTestId(playerTestId);
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });

  it("Verifica se os inputs de Login são preenchidos", () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputName = screen.getByTestId(playerTestId);
    const email = 'teste@betrybe.com';
    const name = 'Luanderson';
    userEvent.type(inputEmail, email);
    userEvent.type(inputName, name);

    expect(inputEmail.value).toBe(email);
    expect(inputName.value).toBe(name);
  });

  it("Verifica a página settings", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('link', {  name: /settings/i})

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(history.location.pathname).toBe('/settings')
  });

  it("Verifica se quando preencher os inputs e clicar no botão, é redirecionado para outra página", async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailTestId);
    const inputName = screen.getByTestId(playerTestId);
    const button = screen.getByRole('button', {  name: /play/i})

    const email = 'teste@betrybe.com';
    const name = 'Luanderson';

    userEvent.type(inputEmail, email);
    userEvent.type(inputName, name);
    userEvent.click(button)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    })
  });
});