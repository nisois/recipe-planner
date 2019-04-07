import { GET_MEALS } from "../Constants/ActionTypes";
import { GET_SIDES } from "../Constants/ActionTypes";

const initialState = {
  meals: [],
  sides: []
};

export default function getRecipe(state = initialState, action) {
  switch (action.type) {
    case GET_MEALS:
      return { ...state, meals: action.payload };
    case GET_SIDES:
      return { ...state, sides: action.payload };
    default:
      return state;
  }
}
