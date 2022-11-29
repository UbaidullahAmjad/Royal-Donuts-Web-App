/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    PRODUCT_CATEGORIES_LIST,
    PRODUCT_CATEGORIES_IS_ACTIVE,
    PRODUCT_CATEGORIES_DELETE,
    PRODUCT_CATEGORIES_BULK_DELETE,
    PRODUCT_CATEGORIES_CREATE,
    PRODUCT_CATEGORIES_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const CategoriesListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/category`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--PRODUCT_CATEGORIES_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: PRODUCT_CATEGORIES_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--PRODUCT_CATEGORIES_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCT_CATEGORIES_LIST,
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

export const HandleCategoryIsActiveAction = (prodId, message) => {
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
            url: `${URL}/category/status/${prodId}`,
            // data: "",
        }).then((response) => {
            // console.log("--PRODUCT_CATEGORIES_IS_ACTIVE Action:", response)
            if (response.data.success === true) {
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: PRODUCT_CATEGORIES_IS_ACTIVE,
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
            // console.log("--PRODUCT_CATEGORIES_IS_ACTIVE Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCT_CATEGORIES_IS_ACTIVE,
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

export const DeleteCategoryAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/category/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--PRODUCT_CATEGORIES_DELETE Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: PRODUCT_CATEGORIES_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--PRODUCT_CATEGORIES_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCT_CATEGORIES_DELETE,
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

export const CategoriesBulkDeleteAction = (bulkIds) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "POST",
            url: `${URL}/category_bulk_delete`,
            data: { ids: JSON.stringify(bulkIds) },
        }).then((response) => {
            // console.log("--PRODUCT_CATEGORIES_BULK_DELETE Action:", response)
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
                type: PRODUCT_CATEGORIES_BULK_DELETE,
                payload: {
                    bulkIds,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--PRODUCT_CATEGORIES_BULK_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCT_CATEGORIES_BULK_DELETE,
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

export const CategoryCreateAction = (formData) => {
    // console.log("--PRODUCT_CATEGORIES_CREATE Action formData:", formData)
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
            url: `${URL}/category`,
            data: formData,
        }).then((response) => {
            // console.log("--PRODUCT_CATEGORIES_CREATE Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: PRODUCT_CATEGORIES_CREATE,
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
            // console.log("--PRODUCT_CATEGORIES_CREATE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCT_CATEGORIES_CREATE,
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

export const CategoryEditAction = (formData, id) => {
    // console.log("--PRODUCT_CATEGORIES_EDIT:", formData)
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
            url: `${URL}/category/${id}`,
            data: formData,
        }).then((response) => {
            // console.log("--PRODUCT_CATEGORIES_EDIT Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: PRODUCT_CATEGORIES_EDIT,
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
            // console.log("--PRODUCT_CATEGORIES_EDIT Action-error:", error)
            const error_message = error.response.data.message;
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PRODUCT_CATEGORIES_EDIT,
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
