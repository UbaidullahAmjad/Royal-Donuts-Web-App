/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    ALLERGENS_LIST,
    ALLERGEN_IS_ACTIVE,
    ALLERGEN_DELETE,
    ALLERGENS_BULK_DELETE,
    ALLERGEN_CREATE,
    ALLERGEN_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";


export const AllergensListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/allergen`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            console.log("--ALLERGENS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: ALLERGENS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--ALLERGENS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGENS_LIST,
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

export const HandleAllergenIsActiveAction = (prodId, message) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        axios({
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/allergen/status/${prodId}`,
            // data: "",
        }).then((response) => {
            // console.log("--ALLERGEN_IS_ACTIVE Action:", response)
            if (response.data.success === true) {
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: ALLERGEN_IS_ACTIVE,
                    payload: {
                        prodId,
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }
        }).catch((error) => {
            // console.log("--ALLERGEN_IS_ACTIVE Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGEN_IS_ACTIVE,
                payload: {
                    prodId,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const DeleteAllergenAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/allergen/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--ALLERGEN_DELETE Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: ALLERGEN_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--ALLERGEN_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGEN_DELETE,
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

export const AllergensBulkDeleteAction = (bulkIds) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "POST",
            url: `${URL}/allergen_bulk_delete`,
            data: { ids: JSON.stringify(bulkIds) },
        }).then((response) => {
            // console.log("--ALLERGENS_BULK_DELETE Action:", response)
            SweetAlert.fire({
                icon: "success",
                title: "Deleted",
                text: "Your selected items has been deleted",
                confirmButtonText: "OK",
            });

            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: ALLERGENS_BULK_DELETE,
                payload: {
                    bulkIds,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--ALLERGENS_BULK_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGENS_BULK_DELETE,
                payload: {
                    bulkIds,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const AllergenCreateAction = (formData) => {
    // console.log("--ALLERGENS_CREATE Action formData:", formData)
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
            url: `${URL}/allergen`,
            data: formData,
        }).then((response) => {
            // console.log("--ALLERGEN_CREATE Action response:", response)
            if (response.data.success == true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: ALLERGEN_CREATE,
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
            // console.log("--ALLERGEN_CREATE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGEN_CREATE,
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

export const AllergenEditAction = (formData, id) => {
    // console.log("--ALLERGEN_EDIT:", formData)
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
            url: `${URL}/allergen/${id}`,
            data: formData,
        }).then((response) => {
            // console.log("--ALLERGEN_EDIT Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: ALLERGEN_EDIT,
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
            // console.log("--ALLERGEN_EDIT Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGEN_EDIT,
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


