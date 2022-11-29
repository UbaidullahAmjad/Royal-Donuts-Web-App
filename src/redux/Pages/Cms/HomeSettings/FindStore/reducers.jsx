/* eslint-disable no-unused-vars */
import {
    STORE_DESCRIPTION_GET_DATA,
    STORE_DESCRIPTION_SAVE_DATA,
} from "../../../../actionTypes";

const initialState = {
    storeDescription: null,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const StoresDescriptionReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case STORE_DESCRIPTION_GET_DATA: {
            console.log("--STORE_DESCRIPTION_GET_DATA REDUCER", payload);
            let storeContent = "";
            if (payload.response != null) {
                storeContent = payload.response.findstore;
                state.tempArrLength = 1;
            }
            console.log("--STORE_DESCRIPTION_GET_DATA storeContent:", storeContent);
            return {
                ...state,
                storeDescription: storeContent,
                storeDescriptionLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case STORE_DESCRIPTION_SAVE_DATA: {
            // console.log("--STORE_DESCRIPTION_SAVE_DATA REDUCER", payload);
            // console.log("--STORE_DESCRIPTION_SAVE_DATA products", state.storeDescription);
            let newTempArrLength = state.storeDescription.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                storeDescription: state.storeDescription,
                storeDescriptionLength: 1,
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

export default StoresDescriptionReducer;