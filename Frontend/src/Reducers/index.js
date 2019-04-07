import { combineReducers } from "redux";
import getRecipe from "./recipes";
import addRecipe from "./addrecipe";

const rootReducer = combineReducers({
  getRecipe,
  addRecipe
});

export default rootReducer;
