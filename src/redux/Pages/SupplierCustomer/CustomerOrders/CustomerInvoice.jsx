/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const InvoiceDataByIdAction = async (id) => {
    // console.log("-------- InvoiceDataByIdAction - Action -------")
    let invoiceDataByIdResponse = null;

    try {
        invoiceDataByIdResponse = await axios
            .get(`${URL}/new_order/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
    }
    catch (error) {
        invoiceDataByIdResponse = error.response;
    }

    // console.log("-------- InvoiceDataByIdAction - Action invoiceDataByIdResponse -------", invoiceDataByIdResponse)

    return invoiceDataByIdResponse;
};

