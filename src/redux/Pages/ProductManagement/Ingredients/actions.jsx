/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    INGREDIENTS_LIST,
    INGREDIENT_IS_ACTIVE,
    INGREDIENT_DELETE,
    INGREDIENTS_BULK_DELETE,
    INGREDIENTS_CREATE,
    INGREDIENTS_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";


export const IngredientsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/supplier_product`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            console.log("--INGREDIENTS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: INGREDIENTS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--INGREDIENTS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: INGREDIENTS_LIST,
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

export const HandleIngredientsIsActiveAction = (prodId, message) => {
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
            url: `${URL}/supplier_product/status/${prodId}`,
            // data: "",
        }).then((response) => {
            // console.log("--INGREDIENT_IS_ACTIVE Action:", response)
            if (response.data.success === true) {
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: INGREDIENT_IS_ACTIVE,
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
            // console.log("--INGREDIENT_IS_ACTIVE Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: INGREDIENT_IS_ACTIVE,
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

export const DeleteIngredientAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/supplier_product/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--INGREDIENT_DELETE Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: INGREDIENT_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--INGREDIENT_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: INGREDIENT_DELETE,
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

export const IngredientsBulkDeleteAction = (bulkIds) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "POST",
            url: `${URL}/sup_product_bulk_delete`,
            data: { ids: JSON.stringify(bulkIds) },
        }).then((response) => {
            // console.log("--INGREDIENTS_BULK_DELETE Action:", response)
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
                type: INGREDIENTS_BULK_DELETE,
                payload: {
                    bulkIds,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--INGREDIENTS_BULK_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: INGREDIENTS_BULK_DELETE,
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

export const IngredientCreateAction = (formData) => {
    // console.log("--INGREDIENTS_CREATE Action formData:", formData)
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
            url: `${URL}/supplier_product`,
            data: formData,
        }).then((response) => {
            // console.log("--INGREDIENTS_CREATE Action response:", response)
            if (response.data.success == true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: INGREDIENTS_CREATE,
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
            // console.log("--INGREDIENTS_CREATE Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "name") {
                // setError(
                //     "name",
                //     { type: "string", message: trans("Name_Taken") },
                //     { shouldFocus: true }
                // );
                toast.error("The name of the product has already been taken", {
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
                type: INGREDIENTS_CREATE,
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

export const IngredientEditAction = (formData, id) => {
    // console.log("--INGREDIENTS_EDIT:", formData)
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
            url: `${URL}/supplier_product/${id}`,
            data: formData,
        }).then((response) => {
            // console.log("--INGREDIENTS_EDIT Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: INGREDIENTS_EDIT,
                    payload: {
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            } else {
                if (response.data.type == "name") {
                    // setError(
                    //     "name",
                    //     {
                    //         type: "string",
                    //         message: trans("Name_Taken"),
                    //     },
                    //     {
                    //         shouldFocus: true,
                    //     }
                    // );
                    toast.error("The name of the product has already been taken", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error("failed", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        }).catch((error) => {
            // console.log("--INGREDIENTS_EDIT Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: INGREDIENTS_EDIT,
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