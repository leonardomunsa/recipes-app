import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import Footer from '../components/Footer';

import renderWithRouter from './renderWithRouter';

describe('Testa elementos do footer', () => {
  it('deve possuir os ícones corretos', () => {
    renderWithRouter(<Footer />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const exploreIcon = screen.getByTestId('explore-bottom-btn');
    const mealIcon = screen.getByTestId('food-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('o ícone de bebidas deve redirecionar para a rota /bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/bebidas');
  });

  it('o ícone de explorar deve redirecionar para a rota /explorar', () => {
    const { history } = renderWithRouter(<Footer />);

    const exploreIcon = screen.getByTestId('explore-bottom-btn');

    userEvent.click(exploreIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/explorar');
  });

  it('o ícone de comidas deve redirecionar para a rota /comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealIcon = screen.getByTestId('food-bottom-btn');

    userEvent.click(mealIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
