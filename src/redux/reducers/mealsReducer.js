import MEALS_ACTIONS from '../actions/mealsActions';

const INITIAL_STATE = {
  mealList: [],
  filteredMeals: [],
  categories: [],
  filterType: '',
  isFetching: false,
  error: '',
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEALS_ACTIONS.SET_MEALS:
    return {
      ...state,
      isFetching: false,
      error: '',
      mealList: action.payload,
    };
  case MEALS_ACTIONS.SET_FILTERED_MEALS:
    return {
      ...state,
      isFetching: false,
      error: '',
      filteredMeals: action.payload.meals,
      filterType: action.payload.filterType,
    };
  case MEALS_ACTIONS.SET_MEAL_CATEGORIES:
    return {
      ...state,
      isFetching: false,
      error: '',
      categories: action.payload,
    };
  case MEALS_ACTIONS.REQUEST_MEALS_API:
    return { ...state, isFetching: true };
  case MEALS_ACTIONS.FAILED_MEALS_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  default:
    return state;
  }
};

export default mealsReducer;
