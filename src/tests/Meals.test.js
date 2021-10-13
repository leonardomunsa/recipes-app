import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const RECIPES_LENGTH = 12;
const FILTERS_LENGTH = 6;
const FIRST_CARD_NAME = '0-card-name';

describe('Testando elementos da tela de comidas', () => {
  beforeAll(() => {
    global.fetch = jest.fn(mockFetch);
  });

  it('deve mostrar 12 cards de receitas', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/comidas');

    const allRecipes = await screen.findAllByTestId('recipe-card');

    expect(allRecipes.length).toBe(RECIPES_LENGTH);
  });

  it('deve mostrar nome, imagem e link de mais detalhes em cada card', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/comidas');

    const firstRecipeName = await screen.findByTestId(FIRST_CARD_NAME);
    const firstRecipeImage = await screen.findByTestId('0-card-img');
    const firstRecipeLink = await screen.findByTestId('0-recipe-card');

    expect(firstRecipeName).toHaveTextContent('Corba');
    expect(firstRecipeImage.src).toBe(
      'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    );
    expect(firstRecipeLink).toHaveTextContent('Mais detalhes');
  });

  it('ao clicar em Mais detalhes, deve redirecionar para a rota correta', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/comidas');

    const firstRecipeLink = await screen.findByTestId('0-recipe-card');

    userEvent.click(firstRecipeLink);

    const recipeTitle = await waitForElement(() => (
      screen.getByTestId('recipe-title')
    ));

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas/52977');
    expect(recipeTitle).toHaveTextContent('Corba');
  });

  it('deve mostrar 6 botões de filtro', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/comidas');

    const categoryFiltersContainer = await screen.findByTestId(
      'category-filters',
    );
    const categoryFilters = categoryFiltersContainer.children;

    expect(categoryFilters.length).toBe(FILTERS_LENGTH);
    expect(categoryFilters[0]).toHaveTextContent('All');
    expect(categoryFilters[5]).toHaveTextContent('Goat');
  });

  it('deve mostrar as receitas filtradas ao clicar nos botões de filtros', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/comidas');

    const beefFilter = await screen.findByTestId('Beef-category-filter');

    userEvent.click(beefFilter);

    const firstRecipeName = await waitForElement(() => (
      screen.getByTestId(FIRST_CARD_NAME)
    ));

    expect(firstRecipeName).toHaveTextContent('Beef and Mustard Pie');
  });
});
