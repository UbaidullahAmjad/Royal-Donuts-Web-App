/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    STAGE_FORMS_LIST,
    STAGE_FORM_DELETE,
    STAGE_FORM_CREATE,
    STAGE_FORM_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const StageFormsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/lead_status`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--STAGE_FORMS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: STAGE_FORMS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STAGE_FORMS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STAGE_FORMS_LIST,
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

export const DeleteStageFormAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/lead_status/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--STAGE_FORM_DELETE Action:", response)
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
                type: STAGE_FORM_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STAGE_FORM_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STAGE_FORM_DELETE,
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

export const StageFormCreateAction = (formData) => {
    // console.log("--STAGE_FORM_CREATE Action formData:", formData)
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
            url: `${URL}/lead_status`,
            data: formData,
        }).then((response) => {
            // console.log("--STAGE_FORM_CREATE Action response:", response)
            if (response.data.success === true) {
                toast.success(
                    `${"Lead"} ${"created"} ${"successfully"}`,
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
                isError = false;
            } else {
                if (response.data.message) {
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
                type: STAGE_FORM_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--STAGE_FORM_CREATE Action-error:", error)
            const err_msg = "" + error.response.data.message;
            if (err_msg) {
                toast.error(err_msg, {
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
                type: STAGE_FORM_CREATE,
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

export const StageFormEditAction = (formData, id) => {
    // console.log("--STAGE_FORM_EDIT:", formData)
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
            url: `${URL}/lead_status/${id}`,
            data: formData,
        }).then((response) => {
            console.log("--STAGE_FORM_EDIT Action response:", response)
            if (response.data.success == true) {
                toast.success(
                    `${"Lead"} ${"updated"} ${"successfully"}`,
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
                isError = false;
            } else {
                if (response.data.message) {
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
                type: STAGE_FORM_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--STAGE_FORM_EDIT Action-error:", error)
            const err_msg = "" + error.response.data.message;
            if (err_msg) {
                toast.error(err_msg, {
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
                type: STAGE_FORM_EDIT,
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
