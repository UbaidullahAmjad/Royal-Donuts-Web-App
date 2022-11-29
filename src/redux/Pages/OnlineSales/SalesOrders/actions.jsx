/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SALES_ORDERS_LIST,
    SALES_ORDER_CHANGE_STATUS,
    SALES_ORDER_CHANGE_STATUS_CHECK,
    SALES_ORDER_CREATE,
    SALES_ORDER_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SalesOrdersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/eccom-all-orders`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SALES_ORDERS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SALES_ORDERS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SALES_ORDERS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SALES_ORDERS_LIST,
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

export const getChangeOrderStatus = (id, value) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/statuschange/${id}/${value}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SALES_ORDER_CHANGE_STATUS Action:", response)
            if (response.data.success == true) {
                SweetAlert.fire({
                    icon: "success",
                    title: "Order" + " " + "Status",
                    text:
                        "Order" +
                        " " +
                        "Status" +
                        " " +
                        "Changed" +
                        " " +
                        "Successfully" +
                        " !!",
                    confirmButtonText: "OK",
                });

                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: SALES_ORDER_CHANGE_STATUS,
                    payload: {
                        id,
                        value,
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
                loading = false;
                isError = true;
                errorMessage = response;
                dispatch({
                    type: SALES_ORDER_CHANGE_STATUS,
                    payload: {
                        id,
                        value,
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }
        }).catch((error) => {
            // console.log("--SALES_ORDER_CHANGE_STATUS Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SALES_ORDER_CHANGE_STATUS,
                payload: {
                    id,
                    value,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const StatusChangeCheckAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        dispatch({
            type: SALES_ORDER_CHANGE_STATUS_CHECK,
            payload: {
                response,
                loading,
                isError,
                errorMessage
            }
        })
    }
}
