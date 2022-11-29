/* eslint-disable no-unused-vars */
import {
    INSTAGRAM_GET_DATA,
    INSTAGRAM_SAVE_DATA,
} from "../../../../actionTypes";

const initialState = {
    instagramToken: null,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const instagramTokenReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case INSTAGRAM_GET_DATA: {
            console.log("--INSTAGRAM_GET_DATA REDUCER", payload);
            let instagramContent = "";
            if (payload.response != null) {
                instagramContent = payload.response.data[0].token;
                state.tempArrLength = 1;
            }
            console.log("--INSTAGRAM_GET_DATA instagramContent:", instagramContent);
            return {
                ...state,
                instagramToken: instagramContent,
                instagramTokenLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case INSTAGRAM_SAVE_DATA: {
            // console.log("--INSTAGRAM_SAVE_DATA REDUCER", payload);
            // console.log("--INSTAGRAM_SAVE_DATA products", state.instagramToken);
            let newTempArrLength = state.instagramToken.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                instagramToken: state.instagramToken,
                instagramTokenLength: 1,
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

export default instagramTokenReducer;