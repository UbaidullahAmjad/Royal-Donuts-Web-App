/* eslint-disable no-unused-vars */
import {
    PRODUCT_CATEGORIES_LIST,
    PRODUCT_CATEGORIES_IS_ACTIVE,
    PRODUCT_CATEGORIES_DELETE,
    PRODUCT_CATEGORIES_BULK_DELETE,
    PRODUCT_CATEGORIES_CREATE,
    PRODUCT_CATEGORIES_EDIT,
} from "../../../actionTypes";

const initialState = {
    categoriesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const CategoriesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case PRODUCT_CATEGORIES_LIST: {
            // console.log("--PRODUCT_CATEGORIES_LIST REDUCER", payload);
            let allCategories = [];
            if (payload.response != null) {
                allCategories = payload.response.categories;
                allCategories.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allCategories.length;
            }
            return {
                ...state,
                categoriesList: allCategories,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case PRODUCT_CATEGORIES_IS_ACTIVE: {
            // console.log("--PRODUCT_CATEGORIES_IS_ACTIVE REDUCER", payload);
            // console.log("--PRODUCT_CATEGORIES_IS_ACTIVE categories", state.categoriesList);
            if (payload.prodId) {
                if (state.categoriesList.length > 0 && payload.isError == false) {
                    state.categoriesList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                categoriesList: state.categoriesList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_DELETE: {
            // console.log("--PRODUCT_CATEGORIES_DELETE REDUCER", payload);
            // console.log("--PRODUCT_CATEGORIES_DELETE categories", state.categoriesList);
            let deleted_category = state.categoriesList
            if (payload.prodId) {
                if (state.categoriesList.length > 0 && payload.isError == false) {
                    deleted_category = state.categoriesList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                categoriesList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_BULK_DELETE: {
            // console.log("--PRODUCT_CATEGORIES_BULK_DELETE REDUCER", payload);
            // console.log("--PRODUCT_CATEGORIES_BULK_DELETE categories", state.categoriesList);
            let bulk_deleted_items = state.categoriesList
            if (payload.bulkIds) {
                if (state.categoriesList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.categoriesList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                categoriesList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_CREATE: {
            // console.log("--PRODUCT_CATEGORIES_CREATE REDUCER", payload);
            // console.log("--PRODUCT_CATEGORIES_CREATE categories", state.categoriesList);
            let newTempArrLength = state.categoriesList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                categoriesList: state.categoriesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_EDIT: {
            // console.log("--PRODUCT_CATEGORIES_EDIT REDUCER", payload);
            // console.log("--PRODUCT_CATEGORIES_EDIT products", state.categoriesList);
            let newTempArrLength = state.categoriesList.length;
            if (state.categoriesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                categoriesList: state.categoriesList,
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

export default CategoriesReducer;