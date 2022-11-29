/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SUPPLIERS_ORDERS_LIST,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SuppliersOrdersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/supplier_all_orders`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SUPPLIERS_ORDERS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SUPPLIERS_ORDERS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SUPPLIERS_ORDERS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SUPPLIERS_ORDERS_LIST,
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


