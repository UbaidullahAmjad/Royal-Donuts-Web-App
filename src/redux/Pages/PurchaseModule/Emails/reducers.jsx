/* eslint-disable no-unused-vars */
import {
    EMAILS_LIST,
} from "../../../actionTypes";

const initialState = {
    emailsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const EmailsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case EMAILS_LIST: {
            console.log("--EMAILS_LIST REDUCER", payload);
            let allEmails = [];
            if (payload.response != null) {
                allEmails = payload.response.emails;
                allEmails.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allEmails.length;
            }
            console.log("--EMAILS_LIST allEmails", allEmails);
            return {
                ...state,
                emailsList: allEmails,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        default: {
            return state;
        }
    }
}

export default EmailsReducer;