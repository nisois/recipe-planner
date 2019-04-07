import {
  COMMENT_CHANGE,
  TAGS_CHANGE,
  TYPE_CHANGE,
  TITLE_CHANGE,
  URL_CHANGE,
  ADD_RECIPE_INITIAL,
  TAG_CHANGE
} from "../Constants/ActionTypes";

const initialState = {
  title: "",
  url: "",
  comment: "",
  tags: [],
  tag: "",
  type: ""
};

export default function addRecipe(state = initialState, action) {
  switch (action.type) {
    case COMMENT_CHANGE:
      return { ...state, comment: action.payload };
    case TITLE_CHANGE:
      return { ...state, title: action.payload };
    case TYPE_CHANGE:
      return { ...state, type: action.payload };
    case URL_CHANGE:
      return { ...state, url: action.payload };
    case TAGS_CHANGE:
      return { ...state, tags: [...state.tags, action.payload] };
    case TAG_CHANGE:
      return { ...state, tag: action.payload };
    case ADD_RECIPE_INITIAL:
      return initialState;
    default:
      return state;
  }
}
