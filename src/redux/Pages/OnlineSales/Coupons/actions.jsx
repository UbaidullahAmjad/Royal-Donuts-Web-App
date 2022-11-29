/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    COUPONS_LIST,
    COUPON_IS_ACTIVE,
    COUPON_DELETE,
    COUPONS_BULK_DELETE,
    COUPON_CREATE,
    COUPON_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const CouponsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/coupon`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--COUPONS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPONS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--COUPONS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: COUPONS_LIST,
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

export const HandleCouponIsActiveAction = (prodId, message) => {
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
            // console.log("--COUPON_IS_ACTIVE Action:", response)
            if (response.data.success === true) {
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: COUPON_IS_ACTIVE,
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
            // console.log("--COUPON_IS_ACTIVE Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: COUPON_IS_ACTIVE,
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

export const DeleteCouponAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/coupon/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--COUPON_DELETE Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPON_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--COUPON_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: COUPON_DELETE,
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

export const CouponsBulkDeleteAction = (bulkIds) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "POST",
            url: `${URL}/coupon_bulk_delete`,
            data: { ids: JSON.stringify(bulkIds) },
        }).then((response) => {
            // console.log("--COUPONS_BULK_DELETE Action:", response)
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
                type: COUPONS_BULK_DELETE,
                payload: {
                    bulkIds,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--COUPONS_BULK_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: COUPONS_BULK_DELETE,
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

export const CouponCreateAction = (formData) => {
    // console.log("--COUPON_CREATE Action formData:", formData)
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
            url: `${URL}/coupon`,
            data: formData,
        }).then((response) => {
            // console.log("--COUPON_CREATE Action response:", response)
            toast.success("successfull", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPON_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--COUPON_CREATE Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "code") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //     "code",
                //     {
                //         type: "string",
                //         message: trans("Code_Taken"),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
                // );
                toast.error("The coupon code has already been taken", {
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
                type: COUPON_CREATE,
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

export const CouponEditAction = (formData, id) => {
    // console.log("--COUPON_EDIT:", formData)
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
            url: `${URL}/coupon/${id}`,
            data: formData,
        }).then((response) => {
            // console.log("--COUPON_EDIT Action response:", response)
            toast.success("successfull", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPON_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--COUPON_EDIT Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "code") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //     "code",
                //     {
                //         type: "string",
                //         message: trans("Code_Taken"),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
                // );
                toast.error("The coupon code has already been taken", {
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
                type: COUPON_EDIT,
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
