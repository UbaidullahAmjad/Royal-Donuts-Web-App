/* eslint-disable no-unused-vars */
import {
    FOOTER_SIGNATURE_GET_DATA,
    FOOTER_SIGNATURE_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    supplierFooter: null,
    method: "create",
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SupplierEmailFooterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FOOTER_SIGNATURE_GET_DATA: {
            console.log("--FOOTER_SIGNATURE_GET_DATA REDUCER", payload);
            let footerContent = "";
            if (payload.response != null) {
                footerContent = payload.response.setting;
                state.tempArrLength = 1;
            }
            // console.log("--FOOTER_SIGNATURE_GET_DATA footerContent:", footerContent);
            return {
                ...state,
                supplierFooter: footerContent,
                supplierFooterLength: 1,
                method: payload.method,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case FOOTER_SIGNATURE_SAVE_DATA: {
            // console.log("--FOOTER_SIGNATURE_SAVE_DATA REDUCER", payload);
            // console.log("--FOOTER_SIGNATURE_SAVE_DATA products", state.supplierFooter);
            let newTempArrLength = state.supplierFooter.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                supplierFooter: state.supplierFooter,
                supplierFooterLength: 1,
                method: state.method,
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

export default SupplierEmailFooterReducer;