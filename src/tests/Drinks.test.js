import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import mockFetch from './mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const RECIPES_LENGTH = 12;
const FILTERS_LENGTH = 6;
const FIRST_CARD_NAME = '0-card-name';

describe('Testando elementos da tela de bebidas', () => {
  beforeAll(() => {
    global.fetch = jest.fn(mockFetch);
  });

  it('deve mostrar 12 cards de receitas', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/bebidas');

    const allRecipes = await screen.findAllByTestId('recipe-card');

    expect(allRecipes.length).toBe(RECIPES_LENGTH);
  });

  it('deve mostrar nome, imagem e link de mais detalhes em cada card', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/bebidas');

    const firstRecipeName = await screen.findByTestId('0-card-name');
    const firstRecipeImage = await screen.findByTestId('0-card-img');
    const firstRecipeLink = await screen.findByTestId('0-recipe-card');

    expect(firstRecipeName).toHaveTextContent('GG');
    expect(firstRecipeImage.src).toBe(
      'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    );
    expect(firstRecipeLink).toHaveTextContent('Mais detalhes');
  });

  it('ao clicar em Mais detalhes, deve redirecionar para a rota correta', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/bebidas');

    const firstRecipeLink = await screen.findByTestId('0-recipe-card');

    userEvent.click(firstRecipeLink);

    const recipeTitle = await waitForElement(() => screen.getByTestId('recipe-title'));

    const { pathname } = history.location;

    expect(pathname).toBe('/bebidas/15997');
    expect(recipeTitle).toHaveTextContent('GG');
  });

  it('deve mostrar 6 botões de filtro', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/bebidas');

    const categoryFiltersContainer = await screen.findByTestId(
      'category-filters',
    );
    const categoryFilters = categoryFiltersContainer.children;

    expect(categoryFilters.length).toBe(FILTERS_LENGTH);
    expect(categoryFilters[0]).toHaveTextContent('All');
    expect(categoryFilters[5]).toHaveTextContent('Cocoa');
  });

  it('deve mostrar as receitas filtradas ao clicar nos botões de filtros', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/bebidas');

    const ordinaryDrinkFilter = await screen.findByTestId(
      'Ordinary Drink-category-filter',
    );

    userEvent.click(ordinaryDrinkFilter);

    const firstRecipeName = await waitForElement(() => (
      screen.getByTestId(FIRST_CARD_NAME)
    ));

    expect(firstRecipeName).toHaveTextContent('3-Mile Long Island Iced Tea');
  });
});
