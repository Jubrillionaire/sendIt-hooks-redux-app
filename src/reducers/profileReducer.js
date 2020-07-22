import { LOAD_PARCELS } from "../actions/types";

const initialState = {
    parcels: [],
  };

  export default function (state = initialState, action){
    switch(action.type){
        case LOAD_PARCELS:
            return{
                ...state,
                parcels: action.payload
            };
       
            default: return state;
    }
  }
  