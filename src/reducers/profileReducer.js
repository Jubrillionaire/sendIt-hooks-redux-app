import {
  LOAD_PARCELS,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  LOADING,
  EDIT_PARCEL
} from "../actions/types";

const initialState = {
  parcels: [],
  loading: false,
  errorMsg: "",
  editMsg: "",
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
      case EDIT_PARCEL:
        return {
          ...state,
          editMsg: action.payload
        };

    default:
      return state;
  }
};
