/* eslint-disable no-unused-vars */
import {
    TESTIMONIALS_LIST,
    TESTIMONIAL_DELETE,
    TESTIMONIAL_CREATE,
    TESTIMONIAL_EDIT,
} from "../../../../actionTypes";

const initialState = {
    testimonialsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const TestimonialsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TESTIMONIALS_LIST: {
            // console.log("--TESTIMONIALS_LIST REDUCER", payload);
            let allTestimonials = [];
            if (payload.response != null) {
                allTestimonials = payload.response.testimonials;
                allTestimonials.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allTestimonials.length;
            }
            // console.log("--TESTIMONIALS_LIST REDUCER testimonialsList", allTestimonials);
            return {
                ...state,
                testimonialsList: allTestimonials,
                tempArrLength: state.tempArrLength,
                createdLength: state.tempArrLength,
                editedLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case TESTIMONIAL_DELETE: {
            // console.log("--TESTIMONIAL_DELETE REDUCER", payload);
            // console.log("--TESTIMONIAL_DELETE testimonialsList", state.testimonialsList);
            let deleted_category = state.testimonialsList
            if (payload.prodId) {
                if (state.testimonialsList.length > 0 && payload.isError == false) {
                    deleted_category = state.testimonialsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                testimonialsList: deleted_category,
                tempArrLength: state.tempArrLength,
                createdLength: state.createdLength,
                editedLength: state.editedLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case TESTIMONIAL_CREATE: {
            // console.log("--TESTIMONIAL_CREATE REDUCER", payload);
            // console.log("--TESTIMONIAL_CREATE testimonialsList", state.testimonialsList);
            let newTempArrLength = state.testimonialsList.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
                state.createdLength = state.createdLength + 1;

                // let testimonialCreated = payload.response.testimonial;
                // let oldArray = [...state.testimonialsList];
                // oldArray.push(testimonialCreated);
                // setTestimonials([...oldArray]);
            }
            return {
                ...state,
                testimonialsList: state.testimonialsList,
                tempArrLength: newTempArrLength,
                createdLength: state.createdLength,
                editedLength: state.editedLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case TESTIMONIAL_EDIT: {
            // console.log("--TESTIMONIAL_EDIT REDUCER", payload);
            // console.log("--TESTIMONIAL_EDIT testimonialsList", state.testimonialsList);
            let newTempArrLength = state.testimonialsList.length;
            if (state.testimonialsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
                state.editedLength = state.editedLength + 1;
            }
            return {
                ...state,
                testimonialsList: state.testimonialsList,
                tempArrLength: newTempArrLength,
                createdLength: state.createdLength,
                editedLength: state.editedLength,
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

export default TestimonialsReducer;