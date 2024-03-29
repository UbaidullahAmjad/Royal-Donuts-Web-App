/* eslint-disable no-unused-vars */
import {
    HomeSlide_GET_DATA,
} from '../../types';

const initialState = {
    carouselList: [],
    loading: true,
    isError: false,
    errorMessage: null
}

const HomeCarouselReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case HomeSlide_GET_DATA:
            console.log("PAYLOADDD ----- PageContent_LOAD_DATA ---- ", payload);
            // console.log("PAYLOADxDD ----- HomeSlide_GET_DATA - dasboardData ---- ", allDasboardData);
            return {
                ...state,
                carouselList: payload.carouselList,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default HomeCarouselReducer
