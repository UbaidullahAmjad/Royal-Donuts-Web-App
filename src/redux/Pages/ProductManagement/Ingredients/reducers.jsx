/* eslint-disable no-unused-vars */
import {
    INGREDIENTS_LIST,
    INGREDIENT_IS_ACTIVE,
    INGREDIENT_DELETE,
    INGREDIENTS_BULK_DELETE,
    INGREDIENTS_CREATE,
    INGREDIENTS_EDIT,
} from "../../../actionTypes";


const initialState = {
    ingredientsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const IngredientsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case INGREDIENTS_LIST: {
            // console.log("--INGREDIENTS_LIST REDUCER", payload);
            let allIngredients = [];
            if (payload.response != null) {
                allIngredients = payload.response.products;
                allIngredients.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allIngredients.length;
            }
            return {
                ...state,
                ingredientsList: allIngredients,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case INGREDIENT_IS_ACTIVE: {
            // console.log("--INGREDIENT_IS_ACTIVE REDUCER", payload);
            // console.log("--INGREDIENT_IS_ACTIVE ingredients", state.ingredientsList);
            if (payload.prodId) {
                if (state.ingredientsList.length > 0 && payload.isError == false) {
                    state.ingredientsList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                ingredientsList: state.ingredientsList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENT_DELETE: {
            // console.log("--INGREDIENT_DELETE REDUCER", payload);
            // console.log("--INGREDIENT_DELETE ingredients", state.ingredientsList);
            let deleted_category = state.ingredientsList
            if (payload.prodId) {
                if (state.ingredientsList.length > 0 && payload.isError == false) {
                    deleted_category = state.ingredientsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                ingredientsList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENTS_BULK_DELETE: {
            // console.log("--INGREDIENTS_BULK_DELETE REDUCER", payload);
            // console.log("--INGREDIENTS_BULK_DELETE ingredients", state.ingredientsList);
            let bulk_deleted_items = state.ingredientsList
            if (payload.bulkIds) {
                if (state.ingredientsList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.ingredientsList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                ingredientsList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENTS_CREATE: {
            // console.log("--INGREDIENTS_CREATE REDUCER", payload);
            // console.log("--INGREDIENTS_CREATE ingredients", state.ingredientsList);
            let newTempArrLength = state.ingredientsList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                ingredientsList: state.ingredientsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENTS_EDIT: {
            // console.log("--INGREDIENTS_EDIT REDUCER", payload);
            // console.log("--INGREDIENTS_EDIT ingredients", state.ingredientsList);
            let newTempArrLength = state.ingredientsList.length;
            if (state.ingredientsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                ingredientsList: state.ingredientsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default: {
            return state;
        }
    }
}

export default IngredientsReducer