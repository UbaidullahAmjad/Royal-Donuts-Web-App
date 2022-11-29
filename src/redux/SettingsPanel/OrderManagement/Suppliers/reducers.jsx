/* eslint-disable no-unused-vars */
import {
    SUPPLIERS_LIST,
    SUPPLIER_DELETE,
    SUPPLIER_CREATE,
    SUPPLIER_EDIT,
} from "../../../actionTypes";

const initialState = {
    suppliersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SuppliersReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SUPPLIERS_LIST: {
            // console.log("--SUPPLIERS_LIST REDUCER", payload);
            let allSuppliers = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allSuppliers = payload.response.suppliers;
                    allSuppliers.map((item, index) => (item["index"] = index + 1));
                } else {
                    allSuppliers = state.suppliersList;
                }
                state.tempArrLength = allSuppliers.length;
            }
            return {
                ...state,
                suppliersList: allSuppliers,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SUPPLIER_DELETE: {
            // console.log("--SUPPLIER_DELETE REDUCER", payload);
            // console.log("--SUPPLIER_DELETE suppliersList", state.suppliersList);
            let deleted_category = state.suppliersList
            if (payload.prodId) {
                if (state.suppliersList.length > 0 && payload.isError == false) {
                    deleted_category = state.suppliersList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                suppliersList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SUPPLIER_CREATE: {
            // console.log("--SUPPLIER_CREATE REDUCER", payload);
            // console.log("--SUPPLIER_CREATE categories", state.suppliersList);
            let newTempArrLength = state.suppliersList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                suppliersList: state.suppliersList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SUPPLIER_EDIT: {
            // console.log("--SUPPLIER_EDIT REDUCER", payload);
            // console.log("--SUPPLIER_EDIT products", state.suppliersList);
            let newTempArrLength = state.suppliersList.length;
            if (state.suppliersList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                suppliersList: state.suppliersList,
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

export default SuppliersReducer;