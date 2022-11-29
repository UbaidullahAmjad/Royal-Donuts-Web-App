import * as actionTypes from "../../types";

const initialState = {
    specific_store: {},
    store_days: [],
    lat: null,
    lang: null
  };

  const specificStoreData = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_SPECIFIC_STORE: {
        console.log("PAYLOADDDD SPECIFIC_STORE", action.data);

        return {
          ...state,
          specific_store: action.data.store,
          store_days: action.data.store_days,
          lat: parseFloat(action.data.store.latitude),
          lang: parseFloat(action.data.store.longitude)
      }
      }
      default:
        return state;
    }
  };
  
  export default specificStoreData;
  