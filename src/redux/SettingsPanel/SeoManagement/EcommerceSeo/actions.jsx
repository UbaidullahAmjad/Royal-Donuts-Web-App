/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    ECCOM_SEO_GET_DATA,
    ECCOM_SEO_SAVE_DATA,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const EcommerceSeoGetDataAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/eccom_seo`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--ECCOM_SEO_GET_DATA Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: ECCOM_SEO_GET_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--ECCOM_SEO_GET_DATA Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ECCOM_SEO_GET_DATA,
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

export const EcommerceSeoSaveDataAction = (formData) => {
    // console.log("--ECCOM_SEO_SAVE_DATA:", formData)
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/home_page_seo`,
            data: formData,
        }).then((response) => {
            // console.log("--ECCOM_SEO_SAVE_DATA Action response:", response)
            if (response.data.success == true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: ECCOM_SEO_SAVE_DATA,
                    payload: {
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            } else {
                toast.error("failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }).catch((error) => {
            // console.log("--ECCOM_SEO_SAVE_DATA Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });

            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ECCOM_SEO_SAVE_DATA,
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
