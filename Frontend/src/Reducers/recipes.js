import { GET_RECIPE } from "../Constants/ActionTypes";

const initialState = {
  recipes: []
};

export default function getRecipe(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE:
      return { ...state, recipes: action.payload };
    default:
      return state;
  }
}
