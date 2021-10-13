import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import fetchMock from '../../cypress/my_mocks/fetch';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const IN_PROGRESS_MEAL_ROUTE = '/comidas/52771/in-progress';
const IN_PROGRESS_MEAL_NAME = 'Spicy Arrabiata Penne';
const IN_PROGRESS_INGREDIENT_LENGTH = 8;

describe('Testa tela de receita em progresso', () => {
  beforeAll(() => {
    global.fetch = jest.fn(fetchMock);
  });

  it('deve possuir 7 checkboxes', async () => {
    renderWithRouterAndStore(<App />, { route: IN_PROGRESS_MEAL_ROUTE });

    const ingredientCheckboxes = await screen.findAllByRole('checkbox');

    expect(ingredientCheckboxes.length).toBe(IN_PROGRESS_INGREDIENT_LENGTH);
  });

  it('deve ser possível marcar as checkboxes e finalizar a receita', async () => {
    renderWithRouterAndStore(<App />, { route: IN_PROGRESS_MEAL_ROUTE });

    const ingredientCheckboxes = await screen.findAllByRole('checkbox');

    // marcando e desmarcando
    userEvent.click(ingredientCheckboxes[0]);
    userEvent.click(ingredientCheckboxes[0]);

    ingredientCheckboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    const markedIngredients = screen.getAllByRole('checkbox', {
      checked: true,
    });

    expect(markedIngredients.length).toBe(IN_PROGRESS_INGREDIENT_LENGTH);

    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');

    userEvent.click(finishRecipeButton);

    const finishedRecipeName = await waitForElement(() => (
      screen.getByTestId('0-horizontal-name')
    ));

    expect(finishedRecipeName).toHaveTextContent(IN_PROGRESS_MEAL_NAME);
  });
});
