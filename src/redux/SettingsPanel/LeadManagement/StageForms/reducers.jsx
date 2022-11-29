/* eslint-disable no-unused-vars */
import {
    STAGE_FORMS_LIST,
    STAGE_FORM_DELETE,
    STAGE_FORM_CREATE,
    STAGE_FORM_EDIT,
} from "../../../actionTypes";

const initialState = {
    stageFormsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const StageFormsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case STAGE_FORMS_LIST: {
            // console.log("--STAGE_FORMS_LIST REDUCER", payload);
            let allStageForms = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allStageForms = payload.response.status;
                    allStageForms.map((item, index) => (item["index"] = index + 1));
                } else {
                    allStageForms = state.stageFormsList;
                }
                state.tempArrLength = allStageForms.length;
            }
            return {
                ...state,
                stageFormsList: allStageForms,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case STAGE_FORM_DELETE: {
            // console.log("--STAGE_FORM_DELETE REDUCER", payload);
            // console.log("--STAGE_FORM_DELETE stageFormsList", state.stageFormsList);
            let deleted_category = state.stageFormsList
            if (payload.prodId) {
                if (state.stageFormsList.length > 0 && payload.isError == false) {
                    deleted_category = state.stageFormsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                stageFormsList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case STAGE_FORM_CREATE: {
            // console.log("--STAGE_FORM_CREATE REDUCER", payload);
            // console.log("--STAGE_FORM_CREATE categories", state.stageFormsList);
            let newTempArrLength = state.stageFormsList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                stageFormsList: state.stageFormsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case STAGE_FORM_EDIT: {
            // console.log("--STAGE_FORM_EDIT REDUCER", payload);
            // console.log("--STAGE_FORM_EDIT products", state.stageFormsList);
            let newTempArrLength = state.stageFormsList.length;
            if (state.stageFormsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                stageFormsList: state.stageFormsList,
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

export default StageFormsReducer;