/* eslint-disable no-unused-vars */
import axios from "axios";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    LEAD_FORMS_LIST,
    LEAD_FORM_DELETE,
    LEAD_FORM_CREATE,
    LEAD_FORM_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const LeadFormsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/formss`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--LEAD_FORMS_LIST Action:", response)
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: LEAD_FORMS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--LEAD_FORMS_LIST Action-error:", error)
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: LEAD_FORMS_LIST,
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

export const DeleteLeadFormAction = (id) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/formss/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            // console.log("--LEAD_FORM_DELETE Action:", response)
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
                type: LEAD_FORM_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--LEAD_FORM_DELETE Action-error:", error)
            toast.error("failed", {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: LEAD_FORM_DELETE,
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

export const LeadFormCreateAction = (formData) => {
    // console.log("--LEAD_FORM_CREATE Action formData:", formData)
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
            url: `${URL}/formss`,
            data: formData,
        }).then((response) => {
            // console.log("--LEAD_FORM_CREATE Action response:", response)
            if (response.data.success === true) {
                toast.success("successfull", {
                    position: toast.POSITION.TOP_RIGHT,
                });
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
                type: LEAD_FORM_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            // console.log("--LEAD_FORM_CREATE Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "email") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //     "email",
                //     {
                //         type: "string",
                //         message: trans("Email_Taken"),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
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
                type: LEAD_FORM_CREATE,
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

export const LeadFormEditAction = (formData, id) => {
    // console.log("--LEAD_FORM_EDIT:", formData)
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/formss/${id}`,
            data: formData,
        }).then((response) => {
            console.log("--LEAD_FORM_EDIT Action response:", response)
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
            }
            loading = false;
            response = response.data
            dispatch({
                type: LEAD_FORM_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            console.log("--LEAD_FORM_EDIT Action-error:", error)
            if (Object.keys(error.response.data.errors)[0] == "email") {
                const value = Object.keys(error.response.data.errors)[0];
                // setError(
                //     "email",
                //     {
                //         type: "string",
                //         message: trans("Email_Taken"),
                //     },
                //     {
                //         shouldFocus: true,
                //     }
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
                type: LEAD_FORM_EDIT,
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
