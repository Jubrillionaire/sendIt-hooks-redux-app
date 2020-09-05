import {
   LOGIN,
   REGISTER
  } from "../actions/types";
  
  const initialState = {
    loginMsg: "",
    registerMsg: ""
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          loginMsg: action.payload,
        };
        case REGISTER:
            return {
              ...state,
              registerMsg: action.payload,
            };
  
      default:
        return state;
    }
  };
  