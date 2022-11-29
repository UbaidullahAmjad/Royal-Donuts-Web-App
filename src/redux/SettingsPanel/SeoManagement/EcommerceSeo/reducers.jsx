/* eslint-disable no-unused-vars */
import {
    ECCOM_SEO_GET_DATA,
    ECCOM_SEO_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    ecommerceSeo: null,
    ecommerceSeoLength: 1,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const EcommerceSeoReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ECCOM_SEO_GET_DATA: {
            // console.log("--ECCOM_SEO_GET_DATA REDUCER", payload);
            let ecommerceSeoData = "";
            if (payload.response != null) {
                ecommerceSeoData = payload.response.data;
                state.tempArrLength = 1;
            }
            console.log("--ECCOM_SEO_GET_DATA ecommerceSeoData:", ecommerceSeoData);
            return {
                ...state,
                ecommerceSeo: ecommerceSeoData,
                ecommerceSeoLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case ECCOM_SEO_SAVE_DATA: {
            // console.log("--ECCOM_SEO_SAVE_DATA REDUCER", payload);
            // console.log("--ECCOM_SEO_SAVE_DATA ecommerceSeo", state.ecommerceSeo);
            let newTempArrLength = state.ecommerceSeoLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                ecommerceSeo: state.ecommerceSeo,
                ecommerceSeoLength: 1,
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

export default EcommerceSeoReducer;