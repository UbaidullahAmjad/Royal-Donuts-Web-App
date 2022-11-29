/* eslint-disable no-unused-vars */
import { HomeImages_GET_DATA } from '../../types';

const initialState = {
    homeImagesToken: null,
    loading: true,
    isError: false,
    errorMessage: null
}

const HomeImagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case HomeImages_GET_DATA:
            // console.log("PAYLOADDD ----- HomeImages_GET_DATA ---- ",payload);
            return {
                ...state,
                homeImagesToken: payload.homeImagesToken,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default HomeImagesReducer
