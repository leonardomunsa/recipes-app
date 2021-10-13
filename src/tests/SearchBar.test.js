import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import Header from '../components/Header';

import fetchMock from '../../cypress/my_mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const SEARCH_INPUT_TESTID = 'search-input';
const SEARCH_BUTTON_TESTID = 'search-top-btn';
const EXEC_SEARCH_BUTTON_TESTID = 'exec-search-btn';
const RECIPE_TITLE_ID = 'recipe-title';

describe('Testa funcionalidades da searchbar', () => {
  beforeAll(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('quando clicado no botão de pesquisar, deve ser mostrada/escondida', async () => {
    renderWithRouterAndStore(<Header title="Comidas" hasSearchBar />);

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TESTID);
    let searchInput = screen.queryByTestId(SEARCH_INPUT_TESTID);

    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(searchButton);

    searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);

    expect(searchInput).toBeInTheDocument();
  });

  it('deve ser possível pesquisar comidas por ingredientes', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    const searchButton = await screen.findByTestId(SEARCH_BUTTON_TESTID);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TESTID);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchButton);

    const firstRecipeName = await waitForElement(() => screen.getByTestId('0-card-name'));

    expect(firstRecipeName).toHaveTextContent('Brown Stew Chicken');
  });

  it('deve ser possível pesquisar comidas pelo nome', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    const searchButton = await screen.findByTestId(SEARCH_BUTTON_TESTID);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameRadio = screen.getByTestId('name-search-radio');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TESTID);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(execSearchButton);

    const recipeName = await waitForElement(() => screen.getByTestId(RECIPE_TITLE_ID));

    expect(recipeName).toHaveTextContent('Spicy Arrabiata Penne');
  });

  it('deve ser possível pesquisar comidas pela primeira letra', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    const searchButton = await screen.findByTestId(SEARCH_BUTTON_TESTID);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TESTID);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'c');
    userEvent.click(execSearchButton);

    const recipeName = await waitForElement(() => screen.getByTestId(RECIPE_TITLE_ID));

    expect(recipeName).toHaveTextContent('Corba');
  });

  it('deve ser possível pesquisar bebidas por ingredientes', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    const searchButton = await screen.findByTestId(SEARCH_BUTTON_TESTID);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TESTID);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'Light rum');
    userEvent.click(execSearchButton);

    const firstRecipeName = await waitForElement(() => screen.getByTestId('0-card-name'));

    expect(firstRecipeName).toHaveTextContent('151 Florida Bushwacker');
  });

  it('deve ser possível pesquisar bebidas pelo nome', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    const searchButton = await screen.findByTestId(SEARCH_BUTTON_TESTID);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameRadio = screen.getByTestId('name-search-radio');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TESTID);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execSearchButton);

    const recipeName = await waitForElement(() => screen.getByTestId(RECIPE_TITLE_ID));

    expect(recipeName).toHaveTextContent('Aquamarine');
  });

  it('deve ser possível pesquisar bebidas pela primeira letra', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    const searchButton = await screen.findByTestId(SEARCH_BUTTON_TESTID);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchButton = screen.getByTestId(EXEC_SEARCH_BUTTON_TESTID);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'g');
    userEvent.click(execSearchButton);

    const recipeName = await waitForElement(() => screen.getByTestId('recipe-title'));

    expect(recipeName).toHaveTextContent('GG');
  });
});
