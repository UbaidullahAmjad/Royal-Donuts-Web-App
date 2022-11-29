/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SHIPPING_COMPANIES_LIST,
    SHIPPING_COMPANY_DELETE,
    SHIPPING_COMPANY_CREATE,
    SHIPPING_COMPANY_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const ShippingCompaniesListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/deliverycompany`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SHIPPING_COMPANIES_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SHIPPING_COMPANIES_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SHIPPING_COMPANIES_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SHIPPING_COMPANIES_LIST,
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

export const DeleteShippingCompanyAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/deliverycompany/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SHIPPING_COMPANY_DELETE Action:", response)
            SweetAlert.fire({
                icon: "success",
                title: "Deleted",
                text: "Your item has been deleted.",
                confirmButtonText: "OK",
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SHIPPING_COMPANY_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SHIPPING_COMPANY_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SHIPPING_COMPANY_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const ShippingCompanyCreateAction = (formData) => {
    // console.log("--SHIPPING_COMPANY_CREATE Action formData:", formData)
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
            url: `${URL}/deliverycompany`,
            data: formData,
        }).then((response) => {
            // console.log("--SHIPPING_COMPANY_CREATE Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = false;
            } else {
                toast.error("failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = true;
                // errors.showMessages(); //from 'react-hook-form'
            }
            loading = false;
            response = response.data
            dispatch({
                type: SHIPPING_COMPANY_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SHIPPING_COMPANY_CREATE Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "name") {
                // setError(
                //     "name",
                //     {
                //         type: "string",
                //         message: trans(error.response.data.errors.name),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
                // );
                toast.error(error.response.data.errors.name, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SHIPPING_COMPANY_CREATE,
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

export const ShippingCompanyEditAction = (formData, id) => {
    // console.log("--SHIPPING_COMPANY_EDIT:", formData)
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
            url: `${URL}/deliverycompany/${id}`,
            data: formData,
        }).then((response) => {
            // console.log("--SHIPPING_COMPANY_EDIT Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = false;
            } else {
                if (response.data.type == "name") {
                    // setError(
                    //     "name",
                    //     {
                    //         type: "string",
                    //         message: trans(response.data.message),
                    //     },
                    //     {
                    //         shouldFocusError: true,
                    //     }
                    // );
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error("failed", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                isError = true;
            }
            loading = false;
            response = response.data
            dispatch({
                type: SHIPPING_COMPANY_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SHIPPING_COMPANY_EDIT Action-error:", error)
            const error_message = error.response.data.message;
            if (Object.keys(error.response.data.errors)[0] == "name") {
                // setError(
                //     "name",
                //     {
                //         type: "string",
                //         message: trans(error.response.data.errors.name),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
                // );
                toast.error(error.response.data.errors.name, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SHIPPING_COMPANY_EDIT,
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
