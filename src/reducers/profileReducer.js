import {
  LOAD_PARCELS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  LOADING,
  CANCEL_PARCEL,
} from "../actions/types";

const initialState = {
  parcels: [],
  loading: false,
  errorMsg: "",
  cancelMsg: "",
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

    case CANCEL_PARCEL:
      return {
        ...state,
        cancelMsg: action.payload,
      };

    default:
      return state;
  }
};
