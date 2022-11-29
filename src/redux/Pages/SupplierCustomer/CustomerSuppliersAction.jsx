/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../env"

export const SupplierDetailAction = async (supplier_id) => {
    // console.log("-------- SupplierDetailsAction - Action -------", supplier_id)
    let supplierDetailResponse = null;

    try {
        supplierDetailResponse = await axios
            .get(
                `${URL}/supplierdetails/${supplier_id}/${atob(localStorage.getItem("user_id"))}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token123"),
                    },
                }
            );
    }
    catch (error) {
        supplierDetailResponse = error.response;
    }

    // console.log("-------- SupplierDetailsAction - Action supplierDetailResponse -------", supplierDetailResponse)

    return supplierDetailResponse;
};

