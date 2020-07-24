import {
  LOAD_PARCELS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  LOADING,
} from "../actions/types";

const initialState = {
  parcels: [],
  loading: false,
  errorMsg: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PARCELS:
      return {
        ...state,
        parcels: action.payload,
        loading: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
