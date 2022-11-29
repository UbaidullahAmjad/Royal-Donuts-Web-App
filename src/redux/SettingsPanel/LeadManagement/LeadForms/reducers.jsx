/* eslint-disable no-unused-vars */
import {
    LEAD_FORMS_LIST,
    LEAD_FORM_DELETE,
    LEAD_FORM_CREATE,
    LEAD_FORM_EDIT,
} from "../../../actionTypes";

const initialState = {
    leadFormsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const LeadFormsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LEAD_FORMS_LIST: {
            // console.log("--LEAD_FORMS_LIST REDUCER", payload);
            let allLeadForms = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allLeadForms = payload.response.forms;
                    allLeadForms.map((item, index) => (item["index"] = index + 1));
                } else {
                    allLeadForms = state.leadFormsList;
                }
                state.tempArrLength = allLeadForms.length;
            }
            return {
                ...state,
                leadFormsList: allLeadForms,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case LEAD_FORM_DELETE: {
            // console.log("--LEAD_FORM_DELETE REDUCER", payload);
            // console.log("--LEAD_FORM_DELETE leadFormsList", state.leadFormsList);
            let deleted_category = state.leadFormsList
            if (payload.prodId) {
                if (state.leadFormsList.length > 0 && payload.isError == false) {
                    deleted_category = state.leadFormsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                leadFormsList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LEAD_FORM_CREATE: {
            // console.log("--LEAD_FORM_CREATE REDUCER", payload);
            // console.log("--LEAD_FORM_CREATE categories", state.leadFormsList);
            let newTempArrLength = state.leadFormsList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                leadFormsList: state.leadFormsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LEAD_FORM_EDIT: {
            // console.log("--LEAD_FORM_EDIT REDUCER", payload);
            // console.log("--LEAD_FORM_EDIT products", state.leadFormsList);
            let newTempArrLength = state.leadFormsList.length;
            if (state.leadFormsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                leadFormsList: state.leadFormsList,
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

export default LeadFormsReducer;