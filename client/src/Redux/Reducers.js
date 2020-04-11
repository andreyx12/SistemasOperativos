
import * as Constants from "./Action-types";

const articles = [];

const rootReducer = (state = articles, action) => {
    switch (action.type) {
      case Constants.ADD_ARTICLE:
        return [ ...state, action.payload ];
      case Constants.REMOVE_ARTICLE:
        return state.filter(article => article.id !== action.payload);
      case Constants.EDIT_ARTICLE:
        return [...state.filter(article => article.id !== action.payload.id),
                Object.assign({}, action.payload)];
      default:
        return state;
    }
};



  export default rootReducer;