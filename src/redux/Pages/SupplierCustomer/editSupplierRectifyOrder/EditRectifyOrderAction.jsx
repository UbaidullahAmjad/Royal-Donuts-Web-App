/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const RectifyAddAction = async (formData, supplier_name) => {
    // console.log("-------- RectifyAddAction - Action -------", supplier_id)
    let rectifyAddResponse = null;

    try {
        rectifyAddResponse = await axios
            .post(
                URL + `/rectify/add/${supplier_name}`,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token123"),
                    },
                }
            );
    }
    catch (error) {
        rectifyAddResponse = error.response;
    }

    // console.log("-------- RectifyAddAction - Action rectifyAddResponse -------", rectifyAddResponse)

    return rectifyAddResponse;
};

