/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    PRODUCTS_LIST,
    PRODUCTS_IS_BOX,
    PRODUCTS_IS_SPECIAL,
    PRODUCTS_IS_ACTIVE,
    PRODUCT_CREATE,
    PRODUCT_EDIT
} from "../../../actionTypes";

export const ProductsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        axios.get(`${URL}/product`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            console.log("--PRODUCTS_LIST_Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: PRODUCTS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--PRODUCTS_LIST_Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCTS_LIST,
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

export const HandleIsProdBoxAction = (prodId, message) => {
    const type = PRODUCTS_IS_BOX;
    const apiName = "box";

    ProductsColumnFunctionalies(type, apiName, prodId, message);
};

export const HandleIsProdSpecialAction = (prodId, message) => {
    const type = PRODUCTS_IS_SPECIAL;
    const apiName = "special";

    ProductsColumnFunctionalies(type, apiName, prodId, message);
};

export const HandleIsProdActiveAction = (prodId, message) => {
    const type = PRODUCTS_IS_ACTIVE;
    const apiName = "status";

    ProductsColumnFunctionalies(PRODUCTS_IS_ACTIVE, apiName, prodId, message);
};


export const ProductsColumnFunctionalies = (type, apiName, prodId, message) => {
    return (dispatch) => {
        // var response = null;
        // var loading = true;
        // var isError = false;
        // var errorMessage = null
        // console.log("ProductsColumnFunctionalies-type", type)

        // axios({
        //     method: "get",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + localStorage.getItem("token123"),
        //     },
        //     url: `${URL}/product/${apiName}/${prodId}`,
        //     // data: "",
        // }).then((response) => {
        //     console.log(`--${type}_Action:`, response)
        //     if (response.data.success === true) {
        //         toast.success(message, {
        //             position: toast.POSITION.TOP_RIGHT,
        //         });
        //         loading = false;
        //         isError = false;
        //         response = response.data
        //         // dispatch({
        //         //     type:PRODUCTS_IS_ACTIVE,
        //         //     payload: {
        //         //         prodId,
        //         //         response,
        //         //         loading,
        //         //         isError,
        //         //         errorMessage
        //         //     }
        //         // })
        //     }
        // }).catch((error) => {
        //     console.log(`--${type}_Action-error:`, error)
        //     loading = false;
        //     isError = true;
        //     errorMessage = error.response;
        //     dispatch({
        //         type,
        //         payload: {
        //             prodId,
        //             response,
        //             loading,
        //             isError,
        //             errorMessage
        //         }
        //     })
        // })
    }
};