import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import ShareButton from '../../components/ShareButton';

const FinishedRecipes = () => {
  const { doneRecipes } = useSelector((state) => state);

  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (filter === '') {
      setFilteredRecipes(doneRecipes);
    } else {
      setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type === filter));
    }
  }, [filter, doneRecipes]);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        onClick={ () => setFilter('') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => setFilter('comida') }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ () => setFilter('bebida') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              style={ { width: '11em' } }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'comida'
              ? `${recipe.area} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <ShareButton
            type={ `${recipe.type}s` }
            id={ recipe.id }
            testId={ `${index}-horizontal-share-btn` }
          />
          {recipe.tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FinishedRecipes;
