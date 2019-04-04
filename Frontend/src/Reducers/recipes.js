import {
  GET_RECIPES_FAILURE,
  GET_RECIPES_SUCCESS
} from "../Constants/ActionTypes";

const initialState = {
  error: "",
  recipes: []
};

export default function getRecipe(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES_SUCCESS:
      return { ...state, recipes: action.recipes };
    case GET_RECIPES_FAILURE:
      return { ...state, error: "Couldn't get recipes" };
    default:
      return state;
  }
}
