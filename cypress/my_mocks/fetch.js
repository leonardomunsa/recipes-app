const meals = require('./meals');
const oneMeal = require('./oneMeal');
const beefMeals = require('./beefMeals');
const emptyMeals = require('./emptyMeals');
const mealCategories = require('./mealCategories');
const mealIngredients = require('./mealIngredients');
const mealsByIngredient = require('./mealsByIngredient');
const drinks = require('./drinks');
const oneDrink = require('./oneDrink');
const ordinaryDrinks = require('./ordinaryDrinks');
const emptyDrinks = require('./emptyDrinks');
const drinkCategories = require('./drinkCategories');
const drinkIngredients = require('./drinkIngredients');
const drinksByIngredient = require('./drinksByIngredient');
const areas = require('./areas');
const japaneseMeals = require('./japaneseMeals');
const firstDrink = require('./firstDrink');
const firstMeal = require('./firstMeal');

const urlTable = {
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': () =>
    Promise.resolve(mealCategories),
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': () =>
    Promise.resolve(drinkCategories),
  'https://www.themealdb.com/api/json/v1/1/list.php?i=list': () =>
    Promise.resolve(mealIngredients),
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken': () =>
    Promise.resolve(mealsByIngredient),
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list': () =>
    Promise.resolve(drinkIngredients),
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lightrum': () =>
    Promise.resolve(drinksByIngredient),
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list': () =>
    Promise.resolve(areas),
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese': () =>
    Promise.resolve(japaneseMeals),
  'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata': () =>
    Promise.resolve(oneMeal),
  'https://www.themealdb.com/api/json/v1/1/random.php': () =>
    Promise.resolve(oneMeal),
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771': () =>
    Promise.resolve(oneMeal),
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine': () =>
    Promise.resolve(oneDrink),
  'https://www.thecocktaildb.com/api/json/v1/1/random.php': () =>
    Promise.resolve(oneDrink),
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319': () =>
    Promise.resolve(oneDrink),
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': () =>
    Promise.resolve(beefMeals),
  'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau': () =>
    Promise.resolve(emptyMeals),
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau': () =>
    Promise.resolve(emptyMeals),
  'https://www.themealdb.com/api/json/v1/1/search.php?f=ç': () =>
    Promise.resolve(emptyMeals),
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=OrdinaryDrink':
    () => Promise.resolve(ordinaryDrinks),
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau': () =>
    Promise.resolve(emptyDrinks),
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=xablau': () =>
    Promise.resolve(emptyDrinks),
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=ç': () =>
    Promise.resolve(emptyDrinks),
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997': () =>
    Promise.resolve(firstDrink),
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g': () =>
    Promise.resolve(firstDrink),
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977': () =>
    Promise.resolve(firstMeal),
  'https://www.themealdb.com/api/json/v1/1/search.php?f=c': () =>
    Promise.resolve(firstMeal),
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': () =>
    Promise.resolve(drinks),
};

const fetch = (url) =>
  Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      const urlFunction =
        urlTable[url.replace(' ', '')] ||
        function () {
          return Promise.resolve(meals);
        };
      return urlFunction();
    },
  });

module.exports = fetch;
