/* eslint-disable no-unused-vars */
import { GET_CATEGORIES } from "../types";

const initialState = {
  categoriesList: null,
  loading: true,
  isError: false,
  errorMessage: null,
};

const categoriesReducer = (state = initialState, { type, payload }) => {
  // console.log("categoriesReducer-payload", type)
  switch (type) {
    case GET_CATEGORIES:
      // console.log("CAT REDUCER --- payload", { type, payload });
      return {
        ...state,
        categoriesList: payload.categoriesList,
        loading: payload.loading,
        isError: payload.isError,
        errorMessage: payload.errorMessage,
      };
    default: {
      return state;
    }
  }
};

export default categoriesReducer;
