/* eslint-disable no-unused-vars */
import {
    GENERAL_SETTINGS_GET_DATA,
    GENERAL_SETTINGS_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    generalSettings: null,
    generalSettingsLength: 1,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const GeneralSettingsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GENERAL_SETTINGS_GET_DATA: {
            // console.log("--GENERAL_SETTINGS_GET_DATA REDUCER", payload);
            let generalSettingsData = "";
            if (payload.response != null) {
                generalSettingsData = payload.response.setting;
                state.tempArrLength = 1;
            }
            // console.log("--GENERAL_SETTINGS_GET_DATA generalSettings:", generalSettingsData);
            return {
                ...state,
                generalSettings: generalSettingsData,
                generalSettingsLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case GENERAL_SETTINGS_SAVE_DATA: {
            // console.log("--GENERAL_SETTINGS_SAVE_DATA REDUCER", payload);
            // console.log("--GENERAL_SETTINGS_SAVE_DATA generalSettings", state.generalSettings);
            let newTempArrLength = state.generalSettingsLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                generalSettings: state.generalSettings,
                generalSettingsLength: 1,
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

export default GeneralSettingsReducer;