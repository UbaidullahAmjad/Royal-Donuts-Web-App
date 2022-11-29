/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SUPPLIERS_LIST,
    SUPPLIER_DELETE,
    SUPPLIER_CREATE,
    SUPPLIER_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SuppliersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/supplier_supplier`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SUPPLIERS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SUPPLIERS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SUPPLIERS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SUPPLIERS_LIST,
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

export const DeleteSupplierAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/supplier_supplier/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--SUPPLIER_DELETE Action:", response)
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
                type: SUPPLIER_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SUPPLIER_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SUPPLIER_DELETE,
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

export const SupplierCreateAction = (formData) => {
    // console.log("--SUPPLIER_CREATE Action formData:", formData)
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
            url: `${URL}/supplier_supplier`,
            data: formData,
        }).then((response) => {
            // console.log("--SUPPLIER_CREATE Action response:", response)
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
                type: SUPPLIER_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--SUPPLIER_CREATE Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "abbrivation") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //   "abbrivation",
                //   {
                //     type: "string",
                //     message: trans("The abbrivation has already been taken"),
                //   },
                //   {
                //     shouldFocus: true,
                //   }
                // );
                // console.log(
                //   "GET VLAUE  ABB --- ",
                //   error.response.data.errors[value][0]
                // );
                toast.error("The abbrivation has already been taken", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (Object.keys(error.response.data.errors)[0] == "email") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //   "email",
                //   {
                //     type: "string",
                //     message: trans("Email_Taken"),
                //   },
                //   {
                //     shouldFocus: true,
                //   }
                // );
                toast.error("The email of the user has already been taken", {
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
                type: SUPPLIER_CREATE,
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

export const SupplierEditAction = (formData, id) => {
    // console.log("--SUPPLIER_EDIT:", formData)
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
            url: `${URL}/supplier_supplier/${id}`,
            data: formData,
        }).then((response) => {
            console.log("--SUPPLIER_EDIT Action response:", response)
            if (response.data.success == true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = false;
            } else {
                if (response.data.type == "email") {
                    // setError(
                    //   "email",
                    //   {
                    //     type: "string",
                    //     message: trans("Email_Taken"),
                    //   },
                    //   {
                    //     shouldFocus: true,
                    //   }
                    // );
                    toast.error("The email of the user has already been taken", {
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
                type: SUPPLIER_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--SUPPLIER_EDIT Action-error:", error)
            const error_message = error.response.data.message;
            if (Object.keys(error.response.data.errors)[0] == "abbrivation") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //   "abbrivation",
                //   {
                //     type: "string",
                //     message: trans("The abbrivation has already been taken"),
                //   },
                //   {
                //     shouldFocus: true,
                //   }
                // );
                // console.log(
                //   "GET VLAUE  ABB --- ",
                //   error.response.data.errors[value][0]
                // );
                toast.error("The abbrivation has already been taken", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (Object.keys(error.response.data.errors)[0] == "email") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //   "email",
                //   {
                //     type: "string",
                //     message: trans("Email_Taken"),
                //   },
                //   {
                //     shouldFocus: true,
                //   }
                // );
                toast.error("The email of the user has already been taken", {
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
                type: SUPPLIER_EDIT,
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
