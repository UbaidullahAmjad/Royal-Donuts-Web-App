/* eslint-disable no-unused-vars */
import {
    SHIPPING_COMPANIES_LIST,
    SHIPPING_COMPANY_DELETE,
    SHIPPING_COMPANY_CREATE,
    SHIPPING_COMPANY_EDIT,
} from "../../../actionTypes";

const initialState = {
    companiesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const ShippingCompaniesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SHIPPING_COMPANIES_LIST: {
            // console.log("--SHIPPING_COMPANIES_LIST REDUCER", payload);
            let allCompanies = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allCompanies = payload.response.companies;
                    allCompanies.map((item, index) => (item["index"] = index + 1));
                } else {
                    allCompanies = state.companiesList;
                }
                state.tempArrLength = allCompanies.length;
            }
            return {
                ...state,
                companiesList: allCompanies,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SHIPPING_COMPANY_DELETE: {
            // console.log("--SHIPPING_COMPANY_DELETE REDUCER", payload);
            // console.log("--SHIPPING_COMPANY_DELETE companiesList", state.companiesList);
            let deleted_category = state.companiesList
            if (payload.prodId) {
                if (state.companiesList.length > 0 && payload.isError == false) {
                    deleted_category = state.companiesList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                companiesList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SHIPPING_COMPANY_CREATE: {
            // console.log("--SHIPPING_COMPANY_CREATE REDUCER", payload);
            // console.log("--SHIPPING_COMPANY_CREATE categories", state.companiesList);
            let newTempArrLength = state.companiesList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                companiesList: state.companiesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SHIPPING_COMPANY_EDIT: {
            // console.log("--SHIPPING_COMPANY_EDIT REDUCER", payload);
            // console.log("--SHIPPING_COMPANY_EDIT products", state.companiesList);
            let newTempArrLength = state.companiesList.length;
            if (state.companiesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                companiesList: state.companiesList,
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

export default ShippingCompaniesReducer;