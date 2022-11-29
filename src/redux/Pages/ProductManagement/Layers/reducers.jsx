/* eslint-disable no-unused-vars */
import {
    LAYERS_LIST,
    LAYER_IS_ACTIVE,
    LAYER_DELETE,
    LAYERS_BULK_DELETE,
    LAYER_CREATE,
    LAYER_EDIT,
} from "../../../actionTypes";


const initialState = {
    layersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const LayersReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case LAYERS_LIST: {
            // console.log("--LAYERS_LIST REDUCER", payload);
            let allLayers = [];
            if (payload.response != null) {
                allLayers = payload.response.layerFlavor;
                allLayers.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allLayers.length;
            }
            return {
                ...state,
                layersList: allLayers,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case LAYER_IS_ACTIVE: {
            // console.log("--LAYER_IS_ACTIVE REDUCER", payload);
            // console.log("--LAYER_IS_ACTIVE ingredients", state.layersList);
            if (payload.prodId) {
                if (state.layersList.length > 0 && payload.isError == false) {
                    state.layersList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                layersList: state.layersList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LAYER_DELETE: {
            // console.log("--LAYER_DELETE REDUCER", payload);
            // console.log("--LAYER_DELETE ingredients", state.layersList);
            let deleted_category = state.layersList
            if (payload.prodId) {
                if (state.layersList.length > 0 && payload.isError == false) {
                    deleted_category = state.layersList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                layersList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LAYERS_BULK_DELETE: {
            // console.log("--LAYERS_BULK_DELETE REDUCER", payload);
            // console.log("--LAYERS_BULK_DELETE ingredients", state.layersList);
            let bulk_deleted_items = state.layersList
            if (payload.bulkIds) {
                if (state.layersList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.layersList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                layersList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LAYER_CREATE: {
            // console.log("--LAYER_CREATE REDUCER", payload);
            // console.log("--LAYER_CREATE ingredients", state.layersList);
            let newTempArrLength = state.layersList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                layersList: state.layersList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LAYER_EDIT: {
            // console.log("--LAYER_EDIT REDUCER", payload);
            // console.log("--LAYER_EDIT ingredients", state.layersList);
            let newTempArrLength = state.layersList.length;
            if (state.layersList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                layersList: state.layersList,
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

export default LayersReducer