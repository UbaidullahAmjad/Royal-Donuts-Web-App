/* eslint-disable no-unused-vars */
import {
    PAGES_LIST,
    PAGE_IS_ACTIVE,
    PAGE_FOOTER_ACTIVE,
    PAGE_DELETE,
    PAGE_CREATE,
    PAGE_EDIT,
} from "../../../actionTypes";

const initialState = {
    pagesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const PagesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case PAGES_LIST: {
            // console.log("--PAGES_LIST REDUCER", payload);
            let allPages = [];
            if (payload.response != null) {
                allPages = payload.response.pages;
                allPages.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allPages.length;
            }
            return {
                ...state,
                pagesList: allPages,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case PAGE_IS_ACTIVE: {
            // console.log("--PAGE_IS_ACTIVE REDUCER", payload);
            // console.log("--PAGE_IS_ACTIVE categories", state.pagesList);
            if (payload.prodId) {
                if (state.pagesList.length > 0 && payload.isError == false) {
                    state.pagesList.filter((item) => item.id == payload.prodId && (item.status == "0" ? item.status = "1" : item.status = "0"))
                }
            }
            return {
                ...state,
                pagesList: state.pagesList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PAGE_FOOTER_ACTIVE: {
            // console.log("--PAGE_FOOTER_ACTIVE REDUCER", payload);
            // console.log("--PAGE_FOOTER_ACTIVE categories", state.pagesList);
            if (payload.prodId) {
                if (state.pagesList.length > 0 && payload.isError == false) {
                    state.pagesList.filter((item) => item.id == payload.prodId && (item.is_footer == 0 ? item.is_footer = 1 : item.is_footer = 0))
                }
            }
            return {
                ...state,
                pagesList: state.pagesList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PAGE_DELETE: {
            // console.log("--PAGE_DELETE REDUCER", payload);
            // console.log("-- PAGE_DELETE categories", state.pagesList);
            let deleted_category = state.pagesList
            if (payload.prodId) {
                if (state.pagesList.length > 0 && payload.isError == false) {
                    deleted_category = state.pagesList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                pagesList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PAGE_CREATE: {
            // console.log("--PAGE_CREATE REDUCER", payload);
            // console.log("--PAGE_CREATE categories", state.pagesList);
            let newTempArrLength = state.pagesList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                pagesList: state.pagesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PAGE_EDIT: {
            // console.log("--PAGE_EDIT REDUCER", payload);
            // console.log("--PAGE_EDIT products", state.pagesList);
            let newTempArrLength = state.pagesList.length;
            if (state.pagesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                pagesList: state.pagesList,
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

export default PagesReducer;