import * as actionTypes from "../types";

const initialState = {
  store_list: [],
  isSkeleton: true,
};

const getStoreListData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORELIST: {
      console.log("PAYLOADDDD STORELIST", action.data);
      if (action.data) {
        return {
          ...state,
          store_list: action.data.stores,
          isSkeleton: false,
        };
      }
      else if (action.error) {
        return {
          ...state,
          error: action.error,
          isSkeleton: false,
        }
      }
    }
    default:
      return state;
  }
};

export default getStoreListData;
