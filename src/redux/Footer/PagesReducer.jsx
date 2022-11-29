/* eslint-disable no-unused-vars */
import { Pages_GET_DATA } from '../types';

const initialState = {
    pagesList: [],
    loading: true,
    isError: false,
    errorMessage: null
}

const PagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Pages_GET_DATA:
            console.log("PAYLOADDD ----- Pages_GET_DATA ---- ",payload);
            return {
                ...state,
                pagesList: payload.pagesList?.pages ?? [],
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default PagesReducer
