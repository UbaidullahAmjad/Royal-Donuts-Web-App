/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../../env"

export const CustomerCartOrderAction = async () => {
    // console.log("-------- CustomerCartOrderAction - Action -------")
    let cartOrderResponse = null;

    try {
        cartOrderResponse = await axios.get(URL + "/myorders", {
            params: { user_id: atob(localStorage.getItem("user_id")) },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        });
    }
    catch (error) {
        cartOrderResponse = error.response;
    }

    // console.log("-------- CustomerCartOrderAction - Action cartOrderResponse -------", cartOrderResponse)

    return cartOrderResponse;
};

