
import * as Constants from "../Constants/action-types";

const values = [];

  const rootReducer = (state = values, action) => {
    switch (action.type) {
      case Constants.ADD_VALUE:
        return [ ...state, action.payload ];
      case Constants.REMOVE_VALUE:
        return state.filter(value => value.id !== action.payload);
      case Constants.EDIT_VALUE:
        return [...state.filter(value => value.id !== action.payload.id),
                Object.assign({}, action.payload)];
      default:
        return state;
    }
  };

  export default rootReducer;