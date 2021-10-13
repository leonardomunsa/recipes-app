import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import fetchMock from '../../cypress/my_mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const FAVORITE_DRINK_ROUTE = '/bebidas/178319';
const FAVORITE_DRINK_NAME = 'Aquamarine';

describe('Testa tela de detalhes de uma receita', () => {
  beforeAll(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('deve mostrar detalhes de uma receita ao visitar o seu link', async () => {
    renderWithRouterAndStore(<App />, { route: FAVORITE_DRINK_ROUTE });

    const recipeTitle = await screen.findByTestId('recipe-title');

    expect(recipeTitle).toHaveTextContent(FAVORITE_DRINK_NAME);
  });

  it('deve ser possível favoritar uma receita a partir da tela de detales', async () => {
    const { history } = renderWithRouterAndStore(<App />, {
      route: FAVORITE_DRINK_ROUTE,
    });

    const favoriteButton = await screen.findByTestId('favorite-btn');

    userEvent.click(favoriteButton);

    history.push('/receitas-favoritas');

    const favoriteRecipeName = await screen.findByTestId('0-horizontal-name');

    expect(favoriteRecipeName).toHaveTextContent(FAVORITE_DRINK_NAME);
  });

  it('deve ser possível remover uma receita favorita', async () => {
    const { history } = renderWithRouterAndStore(<App />, {
      route: FAVORITE_DRINK_ROUTE,
    });

    const favoriteButton = await screen.findByTestId('favorite-btn');

    expect(favoriteButton.src).toMatch(/blackHeart/);

    userEvent.click(favoriteButton);

    expect(favoriteButton.src).toMatch(/whiteHeart/);

    history.push('/receitas-favoritas');

    const notFavorite = screen.queryByAltText(FAVORITE_DRINK_NAME);

    expect(notFavorite).not.toBeInTheDocument();
  });

  it('deve ser possível iniciar uma receita', async () => {
    const { history } = renderWithRouterAndStore(<App />, {
      route: FAVORITE_DRINK_ROUTE,
    });

    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    userEvent.click(startRecipeButton);

    const { pathname } = history.location;

    await waitForElement(() => screen.getByTestId('recipe-title'));

    expect(pathname).toBe('/bebidas/178319/in-progress');
  });
});
