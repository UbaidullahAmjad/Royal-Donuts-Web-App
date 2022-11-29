/* eslint-disable no-unused-vars */
import { STRIPE_GO_TO_INVOICE, STRIPE_INVOICE_DATA_CLEAR } from "../../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from "../../../../env"

export const StripePaymentInvoiceAction = (allData, cardData) => {
    return async (dispatch) => {
        var stripeInvoiceData = null;
        var stripeAllData = null;
        var isZeltyInvoice = false;
        var zelty_res_data = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            url: `${URL}/placeorder`,
            data: allData,
        }).then((response) => {
            // console.log("------- STRIPE_GO_TO_INVOICE Action-response -------", response);
            const stripeResponse = response.data;
            if (response.data.zelti_status == 1) {
                let zeltyToken = response.data.zelti_token;
                console.log("zelty token", zeltyToken);
                if (response.data.order !== null) {
                    const zeltyData = {
                        id_restaurant: parseInt(response.data.store.zelty),
                        mode: response.data.order.delivery_method,
                        source: "web",
                        address: {
                            name: response.data.user.address,
                            street: response.data.user.address,
                            zip_code: response.data.user.zip_code,
                            city: response.data.user.city,
                        },
                        display_id: response.data.order.order_no,
                        due_date: response.data.order.delivery_date,
                        customer: {
                            name: response.data.user.name,
                            mail: response.data.user.email,
                        },
                        items: [
                            {
                                type: "dish",
                                id: parseInt(response.data.prod_zelty_array[0]),
                                comment: "Cramel cool flash",
                            },
                        ],
                    };

                    const order_id = response.data.order.id;
                    // console.log("zelty data", zeltyData);
                    StripePayment_ZeltyInvoiceAction(allData, cardData, zeltyData, zeltyToken, order_id, stripeResponse);
                } else {
                    toast.error("Zelty Error", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    isError = true;
                    errorMessage = "zelty error";
                    dispatch({
                        type: STRIPE_GO_TO_INVOICE,
                        payload: {
                            stripeInvoiceData,
                            stripeAllData,
                            isZeltyInvoice: true,
                            zelty_res_data: true,
                            loading,
                            isError,
                            errorMessage
                        }
                    });
                }
            } else if (response.data.zelti_status == 0) {
                // console.log("GOT DATAAAAAAAAAAAAAAAAAAAAAAaa");

                dispatch({
                    type: STRIPE_GO_TO_INVOICE,
                    payload: {
                        stripeInvoiceData: stripeResponse,
                        stripeAllData: allData,
                        isZeltyInvoice,
                        zelty_res_data: true,
                        loading,
                        isError,
                        errorMessage
                    }
                });
            }
        }).catch((error) => {
            console.log("------- STRIPE_GO_TO_INVOICE Action-response-error -------", error.response);
            // setLoading(false);
            // props.LoadingInvoice(false);

            if (error?.response?.data?.error) {
                toast.error(error?.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STRIPE_GO_TO_INVOICE,
                payload: {
                    stripeInvoiceData,
                    stripeAllData,
                    isZeltyInvoice,
                    loading,
                    isError,
                    errorMessage
                }
            });
        });
    };
};

const StripePayment_ZeltyInvoiceAction = (allData, cardData, zeltyData, zeltyToken, order_id, stripeResponse) => {
    return async (dispatch) => {
        var stripeInvoiceData = null;
        var stripeAllData = null;
        var isZeltyInvoice = false;
        var zelty_res_data = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        axios({
            method: "post",
            url: `https://cors-anywhere.herokuapp.com/https://api.zelty.fr/2.7/orders`,
            headers: {
                Authorization: "Bearer " + zeltyToken,
            },
            data: zeltyData,
        }).then((response) => {
            // console.log("StripePayment_ZeltyInvoiceAction-response zelty -------", response);
            const zeltyData = response.data;
            dispatch({
                type: STRIPE_GO_TO_INVOICE,
                payload: {
                    stripeInvoiceData: stripeResponse,
                    stripeAllData: allData,
                    isZeltyInvoice: true,
                    zelty_res_data: zeltyData,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            // console.log("StripePayment_ZeltyInvoiceAction-response zelty -------", error.response.data);
            toast.error(error.response.data.errmsg);
            toast.error(error.response.data.message);
            let error_message = error.response.data.errmsg
                ? error.response.data.errmsg
                : error.response.data.message;
            // orderDelete(response.data.order.id, error_message);
            orderDelete(order_id, error_message);

            isError = true;
            errorMessage = error.response;
            dispatch({
                type: STRIPE_GO_TO_INVOICE,
                payload: {
                    stripeInvoiceData: stripeResponse,
                    stripeAllData,
                    isZeltyInvoice,
                    zelty_res_data,
                    loading,
                    isError,
                    errorMessage
                }
            });
        });
    }
}

const orderDelete = (id, error_message) => {
    return async (dispatch) => {
        axios.post(`${URL}/eccom_order_delete?id=${id}`)
            .then((response) => {
                toast.error("Error " + error_message);
                // props.LoadingInvoice(false);
            })
            .catch((error) => {
                console.log("error delete", error);
                // toast.error('Error',error);

                // props.LoadingInvoice(false);
            });
    }
};

export const ClearStripePaymentInvoiceAction = () => {
    return (dispatch) => {
        dispatch({ type: STRIPE_INVOICE_DATA_CLEAR, });
    };
};


