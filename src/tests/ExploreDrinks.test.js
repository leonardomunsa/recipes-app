import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import fetchMock from '../../cypress/my_mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const EXPLORE_DRINKS_ROUTE = '/explorar/bebidas';
const EXPLORE_DRINK_INGREDIENTS_ROUTE = '/explorar/bebidas/ingredientes';
const FIRST_INGREDIENT_NAME = 'Light rum';
const FIRST_DRINK_NAME = '151 Florida Bushwacker';
const CARD_NAME_TESTID = '0-card-name';
const TOTALLY_RANDOM_RECIPE_NAME = 'Aquamarine';

describe('Testa a tela de explorar bebidas', () => {
  beforeAll(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('deve ser possível explorar por ingredientes', async () => {
    const { history } = renderWithRouterAndStore(<App />, {
      route: EXPLORE_DRINKS_ROUTE,
    });

    const exploreIngredientButton = await screen.findByTestId(
      'explore-by-ingredient',
    );

    userEvent.click(exploreIngredientButton);

    const firstIngredientName = await waitForElement(() => (
      screen.getByTestId(CARD_NAME_TESTID)
    ));

    let currentPathname = history.location.pathname;

    expect(currentPathname).toBe(EXPLORE_DRINK_INGREDIENTS_ROUTE);
    expect(firstIngredientName).toHaveTextContent(FIRST_INGREDIENT_NAME);

    userEvent.click(firstIngredientName);

    const firstRecipeName = await waitForElement(() => (
      screen.getByTestId(CARD_NAME_TESTID)
    ));

    currentPathname = history.location.pathname;

    expect(currentPathname).toBe('/bebidas');
    expect(firstRecipeName).toHaveTextContent(FIRST_DRINK_NAME);
  });

  it('deve ser possível SER SURPREENDIDO', async () => {
    renderWithRouterAndStore(<App />, {
      route: EXPLORE_DRINKS_ROUTE,
    });

    const exploreRandomButton = await screen.findByTestId('explore-surprise');

    userEvent.click(exploreRandomButton);

    const totallyRandomRecipeName = await waitForElement(() => (
      screen.getByTestId('recipe-title')
    ));

    expect(totallyRandomRecipeName).toHaveTextContent(TOTALLY_RANDOM_RECIPE_NAME);
  });
});
