import MEALS_ACTIONS from '../actions/mealsActions';

const INITIAL_STATE = {
  mealList: [],
  favoriteMeals: [],
  isFetching: false,
  error: '',
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEALS_ACTIONS.SET_MEALS:
    return { ...state, isFetching: false, error: '', mealList: action.payload };
  case MEALS_ACTIONS.REQUEST_API:
    return { ...state, isFetching: true };
  case MEALS_ACTIONS.FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  default:
    return state;
  }
};

export default mealsReducer;