import { EXECUTION_FAILURE, EXECUTION_SUCCESS, START_EXECUTION } from "./Actions";
import { initialState } from "./store";

  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case START_EXECUTION:
        return {
          ...state,
          loading: true,
          error: null
        };
      case EXECUTION_SUCCESS:
        return {
          ...state,
          loading: false,
          date: action.payload,
          error: null
        };
      case EXECUTION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  