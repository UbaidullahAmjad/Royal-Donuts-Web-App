/* eslint-disable no-unused-vars */
import {
    ALLERGENS_LIST,
    ALLERGEN_IS_ACTIVE,
    ALLERGEN_DELETE,
    ALLERGENS_BULK_DELETE,
    ALLERGEN_CREATE,
    ALLERGEN_EDIT,
} from "../../../actionTypes";


const initialState = {
    allergensList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const AllergensReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ALLERGENS_LIST: {
            // console.log("--ALLERGENS_LIST REDUCER", payload);
            let allAllergens = [];
            if (payload.response != null) {
                allAllergens = payload.response.allergens;
                allAllergens.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allAllergens.length;
            }
            return {
                ...state,
                allergensList: allAllergens,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case ALLERGEN_IS_ACTIVE: {
            // console.log("--ALLERGEN_IS_ACTIVE REDUCER", payload);
            // console.log("--ALLERGEN_IS_ACTIVE ingredients", state.allergensList);
            if (payload.prodId) {
                if (state.allergensList.length > 0 && payload.isError == false) {
                    state.allergensList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                allergensList: state.allergensList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ALLERGEN_DELETE: {
            // console.log("--ALLERGEN_DELETE REDUCER", payload);
            // console.log("--ALLERGEN_DELETE ingredients", state.allergensList);
            let deleted_category = state.allergensList
            if (payload.prodId) {
                if (state.allergensList.length > 0 && payload.isError == false) {
                    deleted_category = state.allergensList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                allergensList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ALLERGENS_BULK_DELETE: {
            // console.log("--ALLERGENS_BULK_DELETE REDUCER", payload);
            // console.log("--ALLERGENS_BULK_DELETE ingredients", state.allergensList);
            let bulk_deleted_items = state.allergensList
            if (payload.bulkIds) {
                if (state.allergensList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.allergensList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                allergensList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ALLERGEN_CREATE: {
            // console.log("--ALLERGEN_CREATE REDUCER", payload);
            // console.log("--ALLERGEN_CREATE ingredients", state.allergensList);
            let newTempArrLength = state.allergensList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                allergensList: state.allergensList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ALLERGEN_EDIT: {
            // console.log("--ALLERGEN_EDIT REDUCER", payload);
            // console.log("--ALLERGEN_EDIT ingredients", state.allergensList);
            let newTempArrLength = state.allergensList.length;
            if (state.allergensList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                allergensList: state.allergensList,
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

export default AllergensReducer