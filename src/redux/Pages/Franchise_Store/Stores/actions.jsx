/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    STORES_LIST,
    STORE_DELETE,
    STORE_CREATE,
    STORE_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const StoresListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/stores`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--STORES_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: STORES_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STORES_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STORES_LIST,
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

export const DeleteStoreAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/stores/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--STORE_DELETE Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: STORE_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STORE_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STORE_DELETE,
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

export const StoreCreateAction = (formData) => {
    // console.log("--STORE_CREATE Action formData:", formData)
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
            url: `${URL}/stores`,
            data: formData,
        }).then((response) => {
            // console.log("--STORE_CREATE Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: STORE_CREATE,
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
            // console.log("--STORE_CREATE Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "url_field") {
                // setError(
                //     "url_field",
                //     {
                //       type: "string",
                //       message: trans("Url_Taken"),
                //     },
                //     {
                //       shouldFocus: true,
                //     }
                //   );
                //   toast.error(trans("Url_Taken"), {
                //     position: toast.POSITION.TOP_RIGHT,
                //   });
                toast.error("The url_field has already been taken", {
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
                type: STORE_CREATE,
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

export const StoreEditAction = (formData, id) => {
    // console.log("--STORE_EDIT:", formData)
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
            url: `${URL}/stores/${id}`,
            data: formData,
        }).then((response) => {
            // console.log("--STORE_EDIT Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: STORE_EDIT,
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
            // console.log("--STORE_EDIT Action-error:", error)
            const error_message = error.response.data.message;
            if (response.data.type == "url_field") {
                // setError(
                //     "url_field",
                //     {
                //         type: "string",
                //         message: trans("Url_Taken"),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
                // );
                // toast.error(trans("Url_Taken"), {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
                toast.error("The url_field has already been taken", {
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
                type: STORE_EDIT,
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

