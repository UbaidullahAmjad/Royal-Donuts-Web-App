/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../../env";
import {
    STORE_DESCRIPTION_GET_DATA,
    STORE_DESCRIPTION_SAVE_DATA,
} from "../../../../actionTypes";
import SweetAlert from "sweetalert2";

export const StoreDescriptionGetDataAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/find-store-section`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            console.log("--STORE_DESCRIPTION_GET_DATA Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: STORE_DESCRIPTION_GET_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STORE_DESCRIPTION_GET_DATA Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STORE_DESCRIPTION_GET_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const StoreDescriptionSaveDataAction = (formData) => {
    // console.log("--STORE_DESCRIPTION_SAVE_DATA:", formData)
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/find-store-section-update`,
            data: formData,
        }).then((response) => {
            // console.log("--STORE_DESCRIPTION_SAVE_DATA Action response:", response)
            toast.success("successfull", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: STORE_DESCRIPTION_SAVE_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STORE_DESCRIPTION_SAVE_DATA Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });

            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STORE_DESCRIPTION_SAVE_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};
