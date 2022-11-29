/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../../env"

export const SupplierCustomerDeliveryDatesAction = async (store_id, suppliers_id) => {
    console.log("-------- SupplierCustomerDeliveryDatesAction - Action -------")
    let deliveryDatesResponse = null;

    try {
        deliveryDatesResponse = await axios
            .post(
                URL + "/supplier_customer_delivery_dates",
                {
                    store_id: store_id,
                    suppliers_id: suppliers_id,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token123"),
                    },
                }
            );
    }
    catch (error) {
        deliveryDatesResponse = error.response;
    }

    // console.log("-------- SupplierCustomerDeliveryDatesAction - Action deliveryDatesResponse -------", deliveryDatesResponse)

    return deliveryDatesResponse;
};