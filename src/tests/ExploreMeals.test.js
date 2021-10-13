import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import fetchMock from '../../cypress/my_mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const EXPLORE_MEALS_ROUTE = '/explorar/comidas';
const EXPLORE_MEAL_INGREDIENTS_ROUTE = '/explorar/comidas/ingredientes';
const FIRST_INGREDIENT_NAME = 'Chicken';
const FIRST_MEAL_NAME = 'Brown Stew Chicken';
const FIRST_JAPANESE_MEAL_NAME = 'Chicken Karaage';
const CARD_NAME_TESTID = '0-card-name';
const TOTALLY_RANDOM_RECIPE_NAME = 'Spicy Arrabiata Penne';

describe('Testa a tela de explorar comidas', () => {
  beforeAll(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('deve ser possível explorar por ingredientes', async () => {
    const { history } = renderWithRouterAndStore(<App />, {
      route: EXPLORE_MEALS_ROUTE,
    });

    const exploreIngredientButton = await screen.findByTestId(
      'explore-by-ingredient',
    );

    userEvent.click(exploreIngredientButton);

    const firstIngredientName = await waitForElement(() => (
      screen.getByTestId(CARD_NAME_TESTID)
    ));

    let currentPathname = history.location.pathname;

    expect(currentPathname).toBe(EXPLORE_MEAL_INGREDIENTS_ROUTE);
    expect(firstIngredientName).toHaveTextContent(FIRST_INGREDIENT_NAME);

    userEvent.click(firstIngredientName);

    const firstRecipeName = await waitForElement(() => (
      screen.getByTestId(CARD_NAME_TESTID)
    ));

    currentPathname = history.location.pathname;

    expect(currentPathname).toBe('/comidas');
    expect(firstRecipeName).toHaveTextContent(FIRST_MEAL_NAME);
  });

  it('deve ser possível explorar por área', async () => {
    renderWithRouterAndStore(<App />, {
      route: EXPLORE_MEALS_ROUTE,
    });

    const exploreAreaButton = await screen.findByTestId('explore-by-area');

    userEvent.click(exploreAreaButton);

    const areaSelect = await waitForElement(() => (
      screen.getByTestId('explore-by-area-dropdown')
    ));

    userEvent.selectOptions(areaSelect, 'Japanese');

    expect(areaSelect.options[13].selected).toBeTruthy();

    await waitForElement(() => screen.getByTestId(CARD_NAME_TESTID));
    const firstJapaneseMeal = await screen.findByTestId(CARD_NAME_TESTID);

    expect(firstJapaneseMeal).toHaveTextContent(FIRST_JAPANESE_MEAL_NAME);
  });

  it('deve ser possível SER SURPREENDIDO', async () => {
    renderWithRouterAndStore(<App />, {
      route: EXPLORE_MEALS_ROUTE,
    });

    const exploreRandomButton = await screen.findByTestId('explore-surprise');

    userEvent.click(exploreRandomButton);

    const totallyRandomRecipeName = await waitForElement(() => (
      screen.getByTestId('recipe-title')
    ));

    expect(totallyRandomRecipeName).toHaveTextContent(TOTALLY_RANDOM_RECIPE_NAME);
  });
});
