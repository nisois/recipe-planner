import { combineReducers } from "redux";
import getRecipe from "./recipes";
import addRecipe from "./addrecipe";
import authentication from "./authentication";

const rootReducer = combineReducers({
  authentication,
  getRecipe,
  addRecipe
});

export default rootReducer;
